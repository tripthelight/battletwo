import storageMethod from '@/client/js/module/storage/storageMethod';
import addNickname from '@/client/js/functions/addNickname';
import { response } from '@/client/js/communication/taptap/response';
import reload from '@/client/js/module/reload';

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
    let dataChannel = null;
    let onDataChannel = null;

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
    }

    function initOnopen() {
      try {
        signalingSocket.send(
          JSON.stringify({
            type: 'entryOrder',
            gameName: sessionStorage.getItem('gameName'),
            roomName: sessionStorage.getItem('roomName') ?? null,
          }),
        );
      } catch (error) {
        otherLeavesComn();
        reject({ component: 'signalingSocket', event: 'send', message: 'Failed to send message', errorDetails: error });
      }
    }

    function initConnect(channelName) {
      try {
        peerConnection = new RTCPeerConnection(servers);
        window.rtcChannels.peerConnection = peerConnection;
        peerConnection.ondatachannel = (event) => {
          onDataChannel = event.channel;
          window.rtcChannels.onDataChannel = onDataChannel;

          // 내 nickName 상대방에게 전송
          if (onDataChannel && onDataChannel.readyState === 'open') {
            const sharedParams = {
              type: 'sharedData',
              nickname: localStorage.getItem('localPlayer'),
            };
            if (reload) {
              sharedParams.reload = true;
            }
            onDataChannel.send(JSON.stringify(sharedParams));
          }
        };

        // ICE 후보를 다른 브라우저로 전송 (같은 방 안에서만 전송)
        function sendCandidate(candidate) {
          console.log('candidate 보냄');
          signalingSocket.send(
            JSON.stringify({
              type: 'candidate',
              data: JSON.stringify({ candidate }),
            }),
          );
        }

        peerConnection.onicecandidate = async (event) => {
          if (event.candidate) {
            sendCandidate(event.candidate);
          }
        };

        peerConnection.oniceconnectionstatechange = (event) => {
          if (peerConnection) {
            if (peerConnection.iceConnectionState === 'disconnected') {
              // LOADING_EVENT.show(msg_str('left_user'));
              reject({ component: 'peerConnection', event: 'oniceconnectionstatechange', message: 'ICE connection state is disconnected', errorDetails: event });
            }
          }
        };

        peerConnection.onconnectionstatechange = (event) => {
          if (peerConnection) {
            if (peerConnection.connectionState === 'disconnected' || peerConnection.connectionState === 'failed') {
              // LOADING_EVENT.show(msg_str('left_user'));
              reject({ component: 'peerConnection', event: 'onconnectionstatechange', message: `Peer connection state is ${peerConnection.connectionState}`, errorDetails: event });
            }
          }
        };

        // dataChannel = peerConnection.createDataChannel('sendChannel');
        dataChannel = peerConnection.createDataChannel(channelName);
        window.rtcChannels.dataChannel = dataChannel;

        dataChannel.onopen = () => {
          // console.log("dataChannel is onopen!");
        };

        dataChannel.onmessage = (event) => {
          const message = JSON.parse(event.data);
          if (message.type === 'sharedData') {
            storageMethod('s', 'SET_ITEM', 'remotePlayer', message.nickname);
            addNickname('remotePlayer');

            // 상대방이 새로고침 후 재연결이라면
            if (message.reload) {
              storageMethod('s', 'SET_ITEM', 'remoteReload', message.reload.toString());
            }

            // dataChannel message 전송
            response();

            // 두 peer가 연결이 되어야 resolve 시켜야 함
            // resolve({ peerConnection, onDataChannel, dataChannel });
            resolve();
          }
        };

        dataChannel.onclose = () => {
          // console.log("dataChannel is closed!");
          reject({ component: 'dataChannel', event: 'onclose', message: 'DataChannel is closed' });
        };

        dataChannel.onerror = (error) => {
          // console.log("DataChannel error: ", error);
          reject({ component: 'dataChannel', event: 'onerror', message: 'DataChannel encountered an error', errorDetails: error });
        };
      } catch (error) {
        otherLeavesComn();
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

        console.log('offer 보냄');
      } catch (error) {
        otherLeavesComn();
        reject({ component: 'peerConnection', event: 'createOffer', message: 'Failed to create or set offer', errorDetails: error });
      }
    }

    async function handleMessage(msgData) {
      try {
        if (msgData.type === 'entryOrder') {
          // 나와 매칭된 user를 sessionStorage에 저장
          if (msgData.roomName) {
            storageMethod('s', 'SET_ITEM', 'roomName', msgData.roomName);
            // 생성된 roomName 으로 channelName 생성
            initConnect(`${gameName}-${msgData.roomName}-Channel`);
          }
          if (msgData.setOffer && msgData.setOffer === 'true') {
            // 두번째 접속한 사람만 offer를 보내야함
            // throw new Error('catch test error');
            await createOffer();
          }
        }

        if (msgData.type === 'offer') {
          console.log('offer 받음 ::: ', JSON.parse(msgData.data).offer);
          const offer = JSON.parse(msgData.data).offer;
          // 새로고침 시 여기서 에러남
          console.log('peerConnection >>>>> ', peerConnection);
          if (!peerConnection) {
            initConnect(`${gameName}-${window.sessionStorage.getItem('roomName')}-Channel`);
          }
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

          console.log('answer 보냄');
        }

        if (msgData.type === 'answer') {
          console.log('answer 받음 ::: ', JSON.parse(msgData.data).answer);
          const answer = JSON.parse(msgData.data).answer;
          await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        }

        if (msgData.type === 'candidate') {
          console.log('candidate 받음 ::: ', JSON.parse(msgData.data).candidate);
          const candidate = JSON.parse(msgData.data).candidate;
          peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
      } catch (error) {
        otherLeavesComn();
        reject({ component: 'messageHandler', event: 'handleMessage', message: 'Error handling signaling message', errorDetails: error });
      }
    }

    /**
     * execution
     */
    try {
      signalingSocket = new WebSocket(`${process.env.SOCKET_HOST}:${process.env.RTC_PORT}`);

      signalingSocket.onopen = async () => {
        initOnopen();
      };

      signalingSocket.onmessage = async (message) => {
        const msgData = JSON.parse(message.data);
        await handleMessage(msgData);
      };

      signalingSocket.onerror = (event) => {
        // WebSocket 연결 오류
        otherLeavesComn();
        reject({ component: 'signalingSocket', event: 'onerror', message: 'Signaling socket error occurred', errorDetails: event });
      };

      signalingSocket.onclose = (event) => {
        // WebSocket 연결이 닫힘
        otherLeavesComn();
        reject({ component: 'signalingSocket', event: 'onclose', message: 'Signaling socket connection closed', errorDetails: event });
      };
    } catch (error) {
      otherLeavesComn();
      reject({ ...error, errCase: 'webRTC' });
    }
  });
}
