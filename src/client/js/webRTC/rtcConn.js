import { debug } from '@/client/js/module/debug';
import storageMethod from '@/client/js/module/storage/storageMethod';
import addNickname from '@/client/js/functions/addNickname';
import { responseComn } from '@/client/js/communication/responseComn';
import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';
import compairStorage from '@/client/js/functions/compairStorage';
import findCharCode from '@/client/js/functions/findCharCode';
import addCharCode from '@/client/js/functions/addCharCode';
import reload from '@/client/js/module/reload';

export let globalDataChannel = null;

/*
 * 일반적으로 peerConnection.iceConnectionState === 'connected'가 먼저 실행되고,
 * 그 이후에 dataChannel.onopen이 실행됩니다.
 * 하지만 두 이벤트 간의 차이는 수 밀리초 내외일 수 있고,
 * 특수한 상황에서는 거의 동시에 발생하는 것으로 보일 수도 있습니다.
 */
export default function webRTC(gameName) {
  return new Promise(async (resolve, reject) => {
    /**
     * common variable
     */
    const servers = {
      iceServers: [
        {
          urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
      ],
    };

    let signalingSocket = null;
    let peerConnection = null;
    let dataChannel = null; //
    let isRemoteDescSet = false;
    const pendingCandidates = [];

    /**
     * functions
     */

    function otherLeavesComn() {
      // LOADING_EVENT.show(msg_str('left_user'));
      if (peerConnection) {
        peerConnection.close();
        peerConnection = null; // 연결 객체 제거
      }
      if (signalingSocket) {
        signalingSocket.close(); // WebSocket 연결 닫기
        signalingSocket = null; // 소켓 객체 제거
      }
      signalingSocket = null;
      peerConnection = null;
      dataChannel = null;
      isRemoteDescSet = false;
      pendingCandidates.length = 0;
      window.rtcChannels = {};
    }

    function initOnopen() {
      try {
        // sessionStorage gameName key 찾기
        const encryptKey1 = findCharCode([66, 86, 68, 73, 69, 65, 73, 66, 75, 69]);
        const encryptKey2 = findCharCode([74, 86, 88, 78, 80, 70, 85, 72, 87, 68]);
        signalingSocket.send(
          JSON.stringify({
            type: 'entryOrder',
            // gameName: sessionStorage.getItem('gameName'),
            gameName: sessionStorage.getItem(encryptKey1),
            // roomName: sessionStorage.getItem('roomName') ?? null,
            roomName: sessionStorage.getItem(encryptKey2) ?? null,
          }),
        );
      } catch (error) {
        // otherLeavesComn();
        reject({ component: 'signalingSocket', event: 'send', message: 'Failed to send message', errorDetails: error });
      }
    }

    async function candidateEvent() {
      try {
        // ICE 후보를 다른 브라우저로 전송 (같은 방 안에서만 전송)
        function sendCandidate(candidate) {
          debug.log('candidate 보냄 ::: ');
          console.log('candidate 보냄 ::: ', candidate);
          signalingSocket.send(
            JSON.stringify({
              type: 'candidate',
              data: JSON.stringify({ candidate }),
            }),
          );
        }

        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            const c = event.candidate.candidate;
            if (c.includes('typ relay')) {
              console.log('✅ TURN candidate 생성됨:', c);
            }
            sendCandidate(event.candidate);
          }
        };

        /**
         * oniceconnectionstatechange는 resolve() 이후 발생
         * 모든 게임에서 상대방이 방을 나갔는지, 새로고침 했는지는 여기서 체크
         * 상대방이 방을 나갔으면 'disconnected'
         * gameOver 상태일 경우 상대방이 방을 나갔는지 판단 할 필요 없음
         */
        peerConnection.oniceconnectionstatechange = (event) => {
          // debug.log('oniceconnectionstatechange :::');
          // debug.log(peerConnection.iceConnectionState);
          debug.log('oniceconnectionstatechange :::', peerConnection.iceConnectionState);
          console.log('oniceconnectionstatechange :::', peerConnection.iceConnectionState);
          // 이 이벤트에서 상대 peer가 방을 나갔을 경우 disconnected는 약 5초 뒤에 발생함

          // gameState: sessionStorage.getItem('gameState'),
          const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]);
          const decryptVal = window.sessionStorage.getItem(encryptKey);
          // gameOver 체크
          const storageCheck = decryptVal && decryptVal !== findCharCode([65, 70, 79, 73, 76, 85, 88, 87, 86, 75]);

          // const REMOTE_PEER_LEFT = peerConnection && (peerConnection.iceConnectionState === 'disconnected' || peerConnection.iceConnectionState === 'failed') && window.sessionStorage.getItem('gameState') && window.sessionStorage.getItem('gameState') !== 'gameOver';
          const REMOTE_PEER_LEFT = peerConnection && (peerConnection.iceConnectionState === 'disconnected' || peerConnection.iceConnectionState === 'failed') && storageCheck;
          if (REMOTE_PEER_LEFT) {
            errorManagement({ errCase: 'webRTC', component: 'peerConnection', event: 'oniceconnectionstatechange', message: 'ICE connection state is disconnected', errorDetails: event });
          }

          if (peerConnection.iceConnectionState === 'connected') {
            //
          }
        };
      } catch (error) {
        // otherLeavesComn();
        reject({ component: 'candidateEvent', event: 'catch', message: 'Unexpected error in initConnect', errorDetails: error });
      }
    }

    async function initConnect() {
      try {
        peerConnection = new RTCPeerConnection(servers);
      } catch (error) {
        // otherLeavesComn();
        reject({ component: 'initConnect', event: 'catch', message: 'Unexpected error in initConnect', errorDetails: error });
      }
    }

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

        debug.log('offer 보냄 :::');
        console.log('offer 보냄');
      } catch (error) {
        // otherLeavesComn();
        reject({ component: 'peerConnection', event: 'createOffer', message: 'Failed to create or set offer', errorDetails: error });
      }
    }

    function comnDatachannel() {
      dataChannel.onopen = () => {
        debug.log('dataChannel is onopen! -------------- ');
        console.log('dataChannel is onopen! --------------');
      };

      dataChannel.onmessage = async (event) => {
        const message = JSON.parse(event.data);

        if (message.type === 'connectFirst' || message.type === 'connectSecond') {
          // storageMethod('s', 'SET_ITEM', 'remotePlayer', message.nickname);
          // remotePlayer
          const encryptKey = findCharCode([74, 83, 78, 89, 67, 71, 87, 70, 82, 86]);
          storageMethod('s', 'SET_ITEM', encryptKey, findCharCode(addCharCode(message.nickname)));
          addNickname('remotePlayer');

          // 상대방이 새로고침 후 재연결이라면
          if (message.reload) {
            storageMethod('s', 'SET_ITEM', 'remoteReload', message.reload.toString());
          }

          if (message.type === 'connectFirst') {
            const sharedParams = {
              type: 'connectSecond',
              nickname: localStorage.getItem('localPlayer'),
            };
            if (reload) {
              sharedParams.reload = true;
            }

            dataChannel.send(JSON.stringify(sharedParams));

            // dataChannel message 전송
            await responseComn();

            // 두 peer가 연결이 되어야 resolve 시켜야 함
            resolve();
          }

          if (message.type === 'connectSecond') {
            // dataChannel message 전송
            await responseComn();

            // 두 peer가 연결이 되어야 resolve 시켜야 함
            resolve();
          }
        }
      };

      dataChannel.onclose = () => {
        console.log('dataChannel.onclose ::::::::: ');
        // reject({ component: 'dataChannel', event: 'onclose', message: 'DataChannel is closed' });
      };

      dataChannel.onerror = (error) => {
        console.log('dataChannel.onerror ::::::::: ');
        // reject({ component: 'dataChannel', event: 'onerror', message: 'DataChannel encountered an error', errorDetails: error });
      };
    }
    function localDatachannel() {
      comnDatachannel();
    }
    function remoteOndatachannel() {
      peerConnection.ondatachannel = (event) => {
        // onDataChannel은 상대방이 만든 채널을 내가 받은 것
        dataChannel = event.channel;
        window.rtcChannels.dataChannel = dataChannel;
        globalDataChannel = dataChannel;

        comnDatachannel();

        // 내 nickName 상대방에게 전송
        if (dataChannel && dataChannel.readyState === 'open') {
          const sharedParams = {
            type: 'connectFirst',
            nickname: localStorage.getItem('localPlayer'),
          };
          if (reload) {
            sharedParams.reload = true;
          }
          dataChannel.send(JSON.stringify(sharedParams));
        }
      };
    }

    async function handleMessage(msgData) {
      try {
        if (msgData.type === 'entryOrder') {
          const encryptKey = findCharCode([74, 86, 88, 78, 80, 70, 85, 72, 87, 68]);
          // 생성된 roomName 으로 channelName 생성
          const CHANNEL_NAME = `${gameName}-${msgData.roomName}-Channel`;
          // storageMethod('s', 'SET_ITEM', 'roomName', msgData.roomName);
          // storageMethod('s', 'SET_ITEM', encryptKey, findCharCode(Array.from(msgData.roomName).map((char) => char.charCodeAt(0))));
          storageMethod('s', 'SET_ITEM', encryptKey, msgData.roomName);
          initConnect();
          candidateEvent();

          // 첫번째 접속자
          if (!msgData.setOffer) {
            dataChannel = peerConnection.createDataChannel(CHANNEL_NAME);
            window.rtcChannels.dataChannel = dataChannel;
            globalDataChannel = dataChannel;

            // 첫번째 접속한 사람만 offer를 보내야함
            createOffer();
            localDatachannel();
          }

          // 두번째 접속자
          if (msgData.setOffer && msgData.setOffer === 'true') {
            debug.log('두번째 접속자');
            console.log('두번째 접속자');
            remoteOndatachannel();
          }
        }

        if (msgData.type === 'offer') {
          debug.log('offer 받음 :::');
          console.log('offer 받음 ::: ', JSON.parse(msgData.data).offer);

          const offer = JSON.parse(msgData.data).offer;
          await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await peerConnection.createAnswer();
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
        }

        if (msgData.type === 'answer') {
          debug.log('answer 받음 :::');
          console.log('answer 받음 ::: ', JSON.parse(msgData.data).answer);

          const answer = JSON.parse(msgData.data).answer;
          await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
          isRemoteDescSet = true;
          pendingCandidates.forEach((c) => peerConnection.addIceCandidate(c));
        }

        if (msgData.type === 'candidate') {
          debug.log('candidate 받음 :::');
          console.log('candidate 받음 ::: ', JSON.parse(msgData.data).candidate);
          const candidate = JSON.parse(msgData.data).candidate;
          // peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
          if (isRemoteDescSet) {
            peerConnection.addIceCandidate(candidate);
            // peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
          } else {
            pendingCandidates.push(candidate);
          }
        }

        if (msgData.type === 'otherLeaves') {
          // gameState: sessionStorage.getItem('gameState'),
          const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]);
          const decryptVal = window.sessionStorage.getItem(encryptKey);
          // if (window.sessionStorage.getItem('gameState')) {
          if (encryptKey) {
            // if (encryptKey === 'gameOver') {
            if (encryptKey === findCharCode([65, 70, 79, 73, 76, 85, 88, 87, 86, 75])) {
              resolve();
            } else {
              if (msgData.msg === 'r2') {
                // 게임 중 한 명이 나간 상태에서 나머지 한 명이 새로고침
                // debug.log('방나감 팝업 오픈 :::');
                errorManagement({ errCase: 'webRTC', component: 'peerConnection' });
                return;
              }
            }
          } else {
            errorManagement({ errCase: 'errorComn' });
            return;
          }
          return;
        }
      } catch (error) {
        // otherLeavesComn();
        reject({ component: 'messageHandler', event: 'handleMessage', message: 'Error handling signaling message', errorDetails: error });
      }
    }

    /**
     * execution
     */
    try {
      signalingSocket = new WebSocket(`${process.env.SOCKET_HOST}:${process.env.RTC_PORT}`);

      signalingSocket.onopen = () => {
        initOnopen();
      };

      signalingSocket.onmessage = (message) => {
        const msgData = JSON.parse(message.data);
        handleMessage(msgData);
      };

      signalingSocket.onerror = (event) => {
        // WebSocket 연결 오류
        // otherLeavesComn();
        reject({ component: 'signalingSocket', event: 'onerror', message: 'Signaling socket error occurred', errorDetails: event });
      };

      signalingSocket.onclose = (event) => {
        // WebSocket 연결이 닫힘
        // otherLeavesComn();
        reject({ component: 'signalingSocket', event: 'onclose', message: 'Signaling socket connection closed', errorDetails: event });
      };
    } catch (error) {
      // otherLeavesComn();
      reject({ ...error, errCase: 'webRTC' });
    }
  });
}
