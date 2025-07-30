import { debug } from '@/client/js/module/debug';
import storageMethod from '@/client/js/module/storage/storageMethod';
import addNickname from '@/client/js/functions/addNickname';
import { responseComn } from '@/client/js/network/responseComn';
import { errorManagement } from '@/client/js/module/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';
import addCharCode from '@/client/js/functions/addCharCode';

export let globalDataChannel = null;
export let peerConnection = null;
export let signalingSocket = null;

/** ==============================================================================================================
 * common variable
 */
const peers = {};
const remotePeer = 'RemotePeer';
const signalingServer = new WebSocket(`${process.env.SOCKET_HOST}:${process.env.RTC_PORT}`);
const servers = {
  iceServers: [
    {
      urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
    /*
    // TURN 서버가 필요하다면 아래 예시를 사용하세요
    {
      urls: 'turn:your.turn.server:3478',
      username: 'user',
      credential: 'pass'
    }
    */
  ],
};

export default function webRTC(gameName) {
  return new Promise(async (resolve, reject) => {
    let iceConnected = false;
    let dataChannelOpen = false;

    /** ==============================================================================================================
     * functions
     */
    function checkReady() {
      if (iceConnected && dataChannelOpen) {
        debug.log('ICE 연결과 DataChannel OPEN 모두 완료!');
        console.log('ICE 연결과 DataChannel OPEN 모두 완료!');
        resolve();
      };
    };

    function initOnopen() {
      // throw { component: 'signalingSocket', event: 'initOnopen', message: 'Failed to send initOnopen' };
      signalingServer.send(JSON.stringify({
        type: 'entryOrder',
        gameName: gameName,
        roomName: window.sessionStorage.getItem('roomName') ?? null
      }));
    };

    function createPeerConnection(roomName) {
      const pc = new RTCPeerConnection(servers);
      const dataChannel = pc.createDataChannel(`${gameName}-${roomName}-Channel`);
      peers[remotePeer] = { pc, dataChannel };

      // Data Channel opened -----------------------
      dataChannel.onopen = () => {
        debug.log(`Data Channel with ${remotePeer} opened.`);
        console.log(`Data Channel with ${remotePeer} opened.`);
        dataChannelOpen = true;
        checkReady();
      };

      dataChannel.onmessage = (event) => {
        debug.log(event.data);
        console.log(event.data);
      };

      pc.createOffer()
        .then(offer => pc.setLocalDescription(offer))
        .then(() => {
          signalingServer.send(JSON.stringify({
            type: 'offer',
            sdp: pc.localDescription
          }));
        });
      //

      // ICE connected ---------------------------------
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          signalingServer.send(JSON.stringify({
            type: 'candidate',
            candidate: event.candidate
          }));

          debug.log(`ICE candidate widt ${remotePeer} connected`);
          console.log(`ICE candidate widt ${remotePeer} connected`);
        };
      };
      pc.oniceconnectionstatechange = (event) => {
        if (event.target.iceConnectionState === 'disconnected') {
          if (peers[remotePeer]) {
            console.log(`${remotePeer} : ICE 연결 끊김으로 peers에서 제거`);
            delete peers[remotePeer];
          };
        };

        if (event.target.iceConnectionState === 'connected' || event.target.iceConnectionState === 'completed') {
          iceConnected = true;
          checkReady();
        };
      };
    };

    async function handleOffer(sdp) {
      if (!peers[remotePeer]) {
        const pc = new RTCPeerConnection(servers);
        peers[remotePeer] = { pc, dataChannel: null };

        // Data Channel opened -----------------------
        pc.ondatachannel = (event) => {
          peers[remotePeer].dataChannel = event.channel;
          event.channel.onopen = () => {
            debug.log(`Data Channel with ${remotePeer} opened.`);
            console.log(`Data Channel with ${remotePeer} opened.`);
            dataChannelOpen = true;
            checkReady();
          };
          event.channel.onmessage = (event) => {
            debug.log(event.data);
            console.log(event.data);
          };
        };

        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        signalingServer.send(JSON.stringify({
          type: 'answer',
          sdp: pc.localDescription
        }));

        // ICE connected ---------------------------------
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            signalingServer.send(JSON.stringify({
              type: 'candidate',
              candidate: event.candidate
            }));

            debug.log(`ICE candidate with ${remotePeer} connected`);
            console.log(`ICE candidate with ${remotePeer} connected`);
          };
        };
        pc.oniceconnectionstatechange = (event) => {
          if (event.target.iceConnectionState === 'disconnected') {
            if (peers[remotePeer]) {
              debug.log(`${remotePeer} : ICE 연결 끊김으로 peers에서 제거`);
              console.log(`${remotePeer} : ICE 연결 끊김으로 peers에서 제거`);
              delete peers[remotePeer];
            };
          };

          if (event.target.iceConnectionState === 'connected' || event.target.iceConnectionState === 'completed') {
            iceConnected = true;
            checkReady();
          };
        };
      };
    };
    async function handleAnswer(sdp) {
      const pc = peers[remotePeer].pc;
      await pc.setRemoteDescription(new RTCSessionDescription(sdp));
    };
    async function handleCandidate(candidate) {
      const pc = peers[remotePeer].pc;
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    };

    async function handleMessage(event) {
      const data = JSON.parse(event.data);

      const { type, sdp, candidate, roomName, setOffer } = data;

      if (type === 'entryOrder') {
        debug.log('entryOrder 받음');
        console.log('entryOrder 받음');
        storageMethod('s', 'SET_ITEM', 'roomName', roomName);
        if (setOffer === 'true') {
          // 두번째 접속자 - offer 만들어서 보내야 됨
          createPeerConnection(roomName);
        } else {
          // 첫번째 접속자 - offer 받을 준비 해야됨
        };
      } else if (type === 'offer') {
        debug.log('offer 받음');
        console.log('offer 받음');
        await handleOffer(sdp);
      } else if (type === 'answer') {
        debug.log('answer 받음');
        console.log('answer 받음');
        await handleAnswer(sdp);
      } else if (type === 'candidate') {
        debug.log('candidate 받음');
        console.log('candidate 받음');
        await handleCandidate(candidate);
      };
    };

    document.body.onclick = () => {
      Object.values(peers).forEach(peer => {
        if (peer.dataChannel && peer.dataChannel.readyState === 'open') {
          peer.dataChannel.send('click');
        };
      });
    };


    /** ==============================================================================================================
     * execution
     */
    try {
      signalingServer.onopen = () => {
        try {
          initOnopen();
          // throw { component: 'signalingServer', event: 'onopen', message: 'Failed to send onopen' };
        } catch (error) {
          reject({ ...error, errCase: 'webRTC' });
        };
      };

      signalingServer.onmessage = async (event) => {
        try {
          await handleMessage(event);
        } catch (error) {
          reject({ ...error, errCase: 'webRTC' });
        };
      };

      signalingServer.onerror = (event) => {
        reject({ errCase: 'webRTC', component: 'signalingServer', event: 'onerror', message: 'Signaling socket error occurred', errorDetails: event });
      };

      signalingServer.onclose = (event) => {
        reject({ errCase: 'webRTC', component: 'signalingServer', event: 'onclose', message: 'Signaling socket connection closed', errorDetails: event });
      };
    } catch (error) {
      console.log('error rtcConn.js >>>>>>>>>>>> ', error);

      // otherLeavesComn();
      reject({ ...error, errCase: 'webRTC' });
    }
  });
}
