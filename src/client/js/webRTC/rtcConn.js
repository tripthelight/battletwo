import { debug } from '@/client/js/module/debug';
import storageMethod from '@/client/js/module/storage/storageMethod';
import addNickname from '@/client/js/functions/addNickname';
import { responseComn } from '@/client/js/network/responseComn';
import { errorManagement } from '@/client/js/module/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';
import addCharCode from '@/client/js/functions/addCharCode';
import logout from '@/client/js/auth/logout';
import authCheck from '@/client/js/auth/authCheck';

export default function webRTC(gameName) {
  return new Promise(async (resolve, reject) => {
    /** ==============================================================================================================
     * common variable
     */
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
    const peers = {};
    const remotePeer = 'RemotePeer';

    let iceConnected = false;
    let dataChannelOpen = false;

    /** ==============================================================================================================
     * functions
     */
    async function checkReady() {
      if (iceConnected && dataChannelOpen) {
        window.rtcChannels.peerConnection = peers[remotePeer].pc;
        window.rtcChannels.dataChannel = peers[remotePeer].dataChannel;
        await responseComn(gameName);
        await authCheck();
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

    async function createPeerConnection(roomName) {
      const pc = new RTCPeerConnection(servers);
      const dataChannel = pc.createDataChannel(`${gameName}-${roomName}-Channel`);
      peers[remotePeer] = { pc, dataChannel };

      // Data Channel opened -----------------------
      dataChannel.onopen = () => {
        dataChannelOpen = true;
        checkReady();
      };

      dataChannel.onmessage = (event) => {};

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      signalingServer.send(JSON.stringify({
        type: 'offer',
        sdp: pc.localDescription
      }));

      // ICE connected ---------------------------------
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          signalingServer.send(JSON.stringify({
            type: 'candidate',
            candidate: event.candidate
          }));
        };
      };
      pc.oniceconnectionstatechange = async (event) => {
        if (event.target.iceConnectionState === 'disconnected') {
          if (peers[remotePeer]) {
            await logout();
            if (signalingServer) signalingServer.close();
            if (pc) pc.close();
            debug.log(`${remotePeer} : ICE 연결 끊김으로 peers에서 제거`);
            console.log(`${remotePeer} : ICE 연결 끊김으로 peers에서 제거`);
            delete peers[remotePeer];
            errorManagement({ errCase: 'webRTC', component: 'peerConnection' });
            storageMethod('s', 'REMOVE_ALL');
            window.rtcChannels = {};
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
            dataChannelOpen = true;
            checkReady();
          };
          event.channel.onmessage = (event) => {};
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
          };
        };
        pc.oniceconnectionstatechange = async (event) => {
          if (event.target.iceConnectionState === 'disconnected') {
            if (peers[remotePeer]) {
              await logout();
              if (signalingServer) signalingServer.close();
              if (pc) pc.close();
              debug.log(`${remotePeer} : ICE 연결 끊김으로 peers에서 제거`);
              console.log(`${remotePeer} : ICE 연결 끊김으로 peers에서 제거`);
              delete peers[remotePeer];
              errorManagement({ errCase: 'webRTC', component: 'peerConnection' });
              storageMethod('s', 'REMOVE_ALL');
              window.rtcChannels = {};
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
        console.log('entryOrder 받음');
        storageMethod('s', 'SET_ITEM', 'roomName', roomName);
        if (setOffer === 'true') {
          // 두번째 접속자 - offer 만들어서 보내야 됨
          await createPeerConnection(roomName);
        } else {
          // 첫번째 접속자 - offer 받을 준비 해야됨
        };

      } else if (type === 'offer') {
        console.log('offer 받음');
        await handleOffer(sdp);

      } else if (type === 'answer') {
        console.log('answer 받음');
        await handleAnswer(sdp);

      } else if (type === 'candidate') {
        console.log('candidate 받음');
        await handleCandidate(candidate);
      };
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
