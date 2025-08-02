import setCookies from '@/client/js/module/cookies/setCookies';
import getCookies from '@/client/js/module/cookies/getCookies';
import { debug } from '@/client/js/module/debug';
import storageMethod from '@/client/js/module/storage/storageMethod';
import addNickname from '@/client/js/functions/addNickname';
import { responseComn } from '@/client/js/network/responseComn';
import { errorManagement } from '@/client/js/module/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';
import addCharCode from '@/client/js/functions/addCharCode';
import logout from '@/client/js/auth/logout';
import authCheck from '@/client/js/auth/authCheck';
import searchRoom from '@/client/js/auth/searchRoom';

export const encrypt = { keypair: '' };

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

    let serverRefresh = false;
    let iceConnected = false;
    let dataChannelOpen = false;
    // let entryOrderTimeoutId = null;

    /** ==============================================================================================================
     * functions
     */
    async function checkReady(roomName, pid) {
      if (iceConnected && dataChannelOpen) {
        window.rtcChannels.peerConnection = peers[remotePeer].pc;
        window.rtcChannels.dataChannel = peers[remotePeer].dataChannel;
        await responseComn(gameName);
        if (!serverRefresh) {
          await authCheck(gameName, roomName, pid);
        };

        // 처음 진입했거나, 두 Peer가 연결된 상태에서 새로고침 한 경우
        if (encrypt.keypair === '') {
          if (getCookies({ cookieName: 'gc_at' })) {
            // keypair 생성 후 freeze
            const cookie = getCookies({ cookieName: 'gc_at' });
            encrypt.keypair = cookie.slice(-10);
            Object.freeze(encrypt);

            // const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
            // const encryptVal = findCharCode([74, 75, 71, 90, 87, 79, 85, 69, 65, 88]); // waitEnemy
            // storageMethod('s', 'SET_ITEM', encryptKey, encryptVal);
          } else {
            reject({ errCase: 'webRTC' });
          };
        };
        resolve();
      };
    };

    async function initOnopen() {
      // throw { component: 'signalingSocket', event: 'initOnopen', message: 'Failed to send initOnopen' };
      const roomName = await searchRoom();

      signalingServer.send(JSON.stringify({
        type: 'entryOrder',
        gameName,
        roomName
      }));

      // 5초 동안 응답 없으면 alert
      /* if (roomName) {
        entryOrderTimeoutId = setTimeout(() => {
          console.log('상대가 방 나감');
        }, 100 * 10);
      }; */
    };

    async function createPeerConnection(roomName, pid) {
      // 새로고침 당하는 Peer 는 여기를 탐
      if (peers[remotePeer] && peers[remotePeer].pc) {
        // 기존 peer RTCPeerConnection close 시켜야
        // oniceconnectionstatechange에서
        // iceConnectionState disconnected를 안탐
        const oldPc = peers[remotePeer].pc;
        oldPc.close();
        window.rtcChannels = {};
        iceConnected = false;
        dataChannelOpen = false;
      };

      const pc = new RTCPeerConnection(servers);
      const dataChannel = pc.createDataChannel(`${gameName}-${roomName}-Channel`);
      peers[remotePeer] = { pc, dataChannel };

      // Data Channel opened -----------------------
      dataChannel.onopen = () => {
        dataChannelOpen = true;
        checkReady(roomName, pid);
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
          checkReady(roomName, pid);
        };
      };
    };

    async function handleOffer(sdp, roomName, pid) {
      if (!peers[remotePeer]) {
        const pc = new RTCPeerConnection(servers);
        peers[remotePeer] = { pc, dataChannel: null };

        // Data Channel opened -----------------------
        pc.ondatachannel = (event) => {
          peers[remotePeer].dataChannel = event.channel;
          event.channel.onopen = () => {
            dataChannelOpen = true;
            checkReady(roomName, pid);
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
            checkReady(roomName, pid);
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

      const { type, sdp, candidate, roomName, setOffer, refresh, pid } = data;

      if (type === 'entryOrder') {
        console.log('entryOrder 받음');
        /* if (entryOrderTimeoutId) {
          clearTimeout(entryOrderTimeoutId);
          entryOrderTimeoutId = null;
        }; */

        // 새로고침 후 재접속이면, webRTC 서버에서 refresh true로 받음
        serverRefresh = false;
        if (refresh) {
          serverRefresh = true;
        };

        if (setOffer === 'true') {
          console.log('encrypt ______________ ', encrypt);

          // 두번째 접속자 - offer 만들어서 보내야 됨
          await createPeerConnection(roomName, pid);
        } else {
          // 첫번째 접속자 - offer 받을 준비 해야됨
        };

      } else if (type === 'offer') {
        console.log('offer 받음');
        await handleOffer(sdp, roomName, pid);

      } else if (type === 'answer') {
        console.log('answer 받음');
        await handleAnswer(sdp);

      } else if (type === 'candidate') {
        console.log('candidate 받음');
        await handleCandidate(candidate);

      } else if (type === 'otherLeaves') {
        console.log('otherLeaves 받음');
        throw { errCase: 'webRTC', component: 'peerConnection' };
      }
    };

    /** ==============================================================================================================
     * execution
     */
    try {
      signalingServer.onopen = async () => {
        try {
          await initOnopen();
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
