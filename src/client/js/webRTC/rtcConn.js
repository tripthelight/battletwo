import { debug } from '@/client/js/module/debug';
import storageMethod from '@/client/js/module/storage/storageMethod';
import addNickname from '@/client/js/functions/addNickname';
import { responseComn } from '@/client/js/network/responseComn';
import { errorManagement } from '@/client/js/module/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';
import addCharCode from '@/client/js/functions/addCharCode';

export let globalDataChannel = null;
export let signalingSocket = null;
export let peerConnection = null;

/*
 * 일반적으로 peerConnection.iceConnectionState === 'connected'가 먼저 실행되고,
 * 그 이후에 dataChannel.onopen이 실행됩니다.
 * 하지만 두 이벤트 간의 차이는 수 밀리초 내외일 수 있고,
 * 특수한 상황에서는 거의 동시에 발생하는 것으로 보일 수도 있습니다.
 */
export default function webRTC(gameName) {
  return new Promise(async (resolve, reject) => {
    /** ==============================================================================================================
     * common variable
     */
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

    const sentCandidates = new Set(); // 중복 후보 방지
    let isResolved = false; // resolve 중복 호출 방지
    let dataChannel = null;
    let isRemoteDescSet = false;
    const pendingCandidates = [];

    /** ==============================================================================================================
     * functions
     */
    function safeResolve() {
      if (!isResolved) {
        isResolved = true;
        resolve();
      };
    };

    function initOnopen() {
      try {
        signalingSocket.send(
          JSON.stringify({
            type: 'entryOrder',
            gameName: gameName,
            roomName: window.sessionStorage.getItem('roomName') ?? null,
          })
        );
      } catch (error) {
        reject({ errCase: 'webRTC', component: 'signalingSocket', event: 'send', message: 'Failed to send message', errorDetails: error });
      };
    };

    async function initConnect() {
      try {
        peerConnection = new RTCPeerConnection(servers);
        debug.log('peerConnection : ', peerConnection)
        window.rtcChannels.peerConnection = peerConnection;

        // throw 'ERROR!!!!!!!!!';
      } catch (error) {
        reject({ errCase: 'webRTC', component: 'initConnect', event: 'catch', message: 'Unexpected error in initConnect', errorDetails: error });
      };
    };

    async function candidateEvent() {
      const CANDIDATE_ERROR = {
        errCase: 'webRTC',
        component: 'candidateEvent',
        event: 'catch',
        message: 'Unexpected error in initConnect'
      };

      // ICE 후보를 다른 브라우저로 전송 (같은 방 안에서만 전송)
      function sendCandidate(candidate) {
        try {
          const key = candidate.candidate + candidate.sdpMid + candidate.sdpMLineIndex;
          if (sentCandidates.has(key)) return; // 중복 전송 방지
          sentCandidates.add(key);

          signalingSocket.send(
            JSON.stringify({
              type: 'candidate',
              data: JSON.stringify({ candidate }),
            })
          );

          debug.log('Candidate 보냄');
          console.log('Candidate 보냄');

          // throw 'ERROR !!!!!!!!! ';
        } catch (error) {
          reject({ ...CANDIDATE_ERROR, errorDetails: error });
        }
      };

      peerConnection.onicecandidate = (event) => {
        try {
          if (event.candidate) {
            sendCandidate(event.candidate);
          };
        } catch (error) {
          CANDIDATE_ERROR.component = 'peerConnection';
          CANDIDATE_ERROR.message = 'peerConnection onicecandidate error';
          reject({ ...CANDIDATE_ERROR, errorDetails: error });
        };
      };

      peerConnection.oniceconnectionstatechange = (event) => {
        try {
          const decryptVal = window.sessionStorage.getItem('gameState');
          const storageCheck = decryptVal && decryptVal !== 'gameOver'; // gameOver

          const REMOTE_PEER_LEFT =
            peerConnection &&
            (
              peerConnection.iceConnectionState === 'disconnected' ||
              peerConnection.iceConnectionState === 'failed'
            ) &&
            storageCheck;

          if (REMOTE_PEER_LEFT) {
            // throw { errCase: 'webRTC', component: 'peerConnection', event: 'oniceconnectionstatechange', message: 'ICE connection state is disconnected', errorDetails: event };
            throw 'error';
          };
        } catch (error) {
          CANDIDATE_ERROR.component = 'peerConnection';
          CANDIDATE_ERROR.message = 'ICE connection state is disconnected';
          reject({ ...CANDIDATE_ERROR, errorDetails: error });
        }
      };
    };

    async function createOffer() {
      try {
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        // Offer를 signaling 서버를 통해 첫 번째 사용자에게 전달
        signalingSocket.send(
          JSON.stringify({
            type: 'offer',
            data: JSON.stringify({ offer }),
          }),
        );

        debug.log('offer 보냄');
        console.log('offer 보냄');
      } catch (error) {
        reject({ errCase: 'webRTC', component: 'peerConnection', event: 'createOffer', message: 'Failed to create or set offer', errorDetails: error });
      };
    };

    function comnDatachannel() {
      dataChannel.onopen = () => {};
      dataChannel.onclose = () => {};
      dataChannel.onerror = (error) => {};

      dataChannel.onmessage = async (event) => {
        const message = JSON.parse(event.data);

        if (message.type === 'connectFirst' || message.type === 'connectSecond') {
          storageMethod('s', 'SET_ITEM', 'remotePlayer', addCharCode(message.nickname));
          addNickname('remotePlayer');

          if (message.type === 'connectFirst') {
            const sharedParams = {
              type: 'connectSecond',
              nickname: localStorage.getItem('localPlayer'),
            };

            dataChannel.send(JSON.stringify(sharedParams));

            // dataChannel message 전송
            await responseComn(gameName);

            // 두 peer가 연결이 되어야 resolve 시켜야 함
            safeResolve();
          }

          if (message.type === 'connectSecond') {
            // dataChannel message 전송
            await responseComn(gameName);

            // 두 peer가 연결이 되어야 resolve 시켜야 함
            // resolve();
            safeResolve();
          }
        };
      };
    };
    function localDatachannel() {
      comnDatachannel();
    };
    function remoteOndatachannel() {
      peerConnection.ondatachannel = (event) => {
        // PC가 첫번째 진입 Peer고 MOBILE이 두번째 진입 Peer면 여기를 안탐
        // onDataChannel은 상대방이 만든 채널을 내가 받은 것
        dataChannel = event.channel;
        debug.log('dataChannel ===== 2 : ', dataChannel);
        console.log('dataChannel ===== 2 : ', dataChannel);
        window.rtcChannels.dataChannel = dataChannel;
        globalDataChannel = dataChannel;

        comnDatachannel();

        // 내 nickName 상대방에게 전송
        if (dataChannel && dataChannel.readyState === 'open') {
          const sharedParams = {
            type: 'connectFirst',
            nickname: localStorage.getItem('localPlayer'),
          };
          dataChannel.send(JSON.stringify(sharedParams));
        };
      };
    }

    async function handleMessage(msgData) {
      const MESSAGE_ERROR = {
        errCase: 'webRTC',
        component: 'messageHandler',
        event: 'handleMessage',
        message: 'Error handling signaling message'
      };

      try {
        if (msgData.type === 'entryOrder') {
          const CHANNEL_NAME = `${gameName}-${msgData.roomName}-Channel`;
          storageMethod('s', 'SET_ITEM', 'roomName', msgData.roomName);
          initConnect();
          // candidateEvent();

          // 첫번째 접속자
          if (!msgData.setOffer) {
            dataChannel = peerConnection.createDataChannel(CHANNEL_NAME);
            debug.log('dataChannel ===== 1 : ', dataChannel);
            console.log('dataChannel ===== 1 : ', dataChannel);

            window.rtcChannels.dataChannel = dataChannel;
            globalDataChannel = dataChannel;

            // 첫번째 접속한 사람만 offer를 보내야함
            createOffer();
            localDatachannel();
            return;
          };

          // 두번째 접속자
          if (msgData.setOffer && msgData.setOffer === 'true') {
            debug.log('두번째 접속자');
            remoteOndatachannel();
            return;
          };

          MESSAGE_ERROR.message = 'entryOrder';
          throw 'ERROR entryOrder';
        };

        if (msgData.type === 'offer') {
          debug.log('offer 받음');
          console.log('offer 받음');

          const offer = JSON.parse(msgData.data).offer;
          if (!offer || (offer && (!offer.hasOwnProperty('sdp') || !offer.hasOwnProperty('type')))) {
            MESSAGE_ERROR.message = 'offer';
            throw 'ERROR offer - not offer';
          };

          await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await peerConnection.createAnswer();

          if (!answer || (answer && (!answer.hasOwnProperty('sdp') || !answer.hasOwnProperty('type')))) {
            MESSAGE_ERROR.message = 'offer';
            throw 'ERROR offer - not answer';
          };

          await peerConnection.setLocalDescription(answer);

          // Answer를 signaling 서버를 통해 첫 번째 사용자에게 전달
          signalingSocket.send(
            JSON.stringify({
              type: 'answer',
              data: JSON.stringify({ answer }),
            }),
          );

          debug.log('answer 보냄');
          console.log('answer 보냄');

          candidateEvent();
        };

        if (msgData.type === 'answer') {
          debug.log('answer 받음');
          console.log('answer 받음');

          const answer = JSON.parse(msgData.data).answer;
          if (!answer || (!answer.hasOwnProperty('sdp') || !answer.hasOwnProperty('type'))) {
            MESSAGE_ERROR.message = 'offer';
            throw 'ERROR answer - not answer';
          };

          await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
          isRemoteDescSet = true;

          /* while (pendingCandidates.length) {
            const c = pendingCandidates.shift();
            debug.log('while 타냐');
            await peerConnection.addIceCandidate(c).catch((err) => {
              console.error("Failed to add ICE candidate:", err);
            });
          }; */

          candidateEvent();
        };

        if (msgData.type === 'candidate') {
          debug.log('candidate 받음');
          console.log('candidate 받음');

          const candidate = JSON.parse(msgData.data).candidate;
          if (
            !candidate ||
            (candidate && (
              !candidate.hasOwnProperty('candidate') ||
              !candidate.hasOwnProperty('sdpMLineIndex') ||
              !candidate.hasOwnProperty('sdpMid') ||
              !candidate.hasOwnProperty('usernameFragment')
            ))
          ) {
            MESSAGE_ERROR.message = 'candidate';
            throw 'ERROR candidate - not candidate';
          }

          if (isRemoteDescSet) {
            await peerConnection.addIceCandidate(candidate).catch((err) => {
              console.error('Failed to add ICE:', err);
            });
          } else {
            pendingCandidates.push(candidate);
          };
        };

        if (msgData.type === 'otherLeaves') {
          console.log('otherLeaves 받음');
        };

        if (msgData.type === 'foul') {
          console.log('foul 받음');
        };

      } catch (error) {
        reject({ ...MESSAGE_ERROR, errorDetails: error });
      };
    };



    /** ==============================================================================================================
     * execution
     */
    try {
      signalingSocket = new WebSocket(`${process.env.SOCKET_HOST}:${process.env.RTC_PORT}`);

      signalingSocket.onopen = () => {
        initOnopen();
      };

      signalingSocket.onmessage = (message) => {
        try {
          const messageArr = ['entryOrder', 'offer', 'answer', 'candidate', 'otherLeaves', 'foul'];
          if (!message) throw 'ERROR';
          const msgData = JSON.parse(message.data);
          if (messageArr.indexOf(msgData) !== -1) {
            throw 'ERROR';
          };
          handleMessage(msgData);
        } catch (error) {
          reject({ errCase: 'webRTC', component: 'signalingSocket', event: 'onerror', message: 'signalingSocket onmessage error', errorDetails: event });
        };
      };

      signalingSocket.onerror = (event) => {
        // WebSocket 연결 오류
        // otherLeavesComn();
        reject({ errCase: 'webRTC', component: 'signalingSocket', event: 'onerror', message: 'Signaling socket error occurred', errorDetails: event });
      };

      signalingSocket.onclose = (event) => {
        // WebSocket 연결이 닫힘
        // otherLeavesComn();
        reject({ errCase: 'webRTC', component: 'signalingSocket', event: 'onclose', message: 'Signaling socket connection closed', errorDetails: event });
      };
    } catch (error) {
      // otherLeavesComn();
      reject({ ...error, errCase: 'webRTC' });
    }
  });
}
