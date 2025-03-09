import storageMethod from '@/client/js/module/storage/storageMethod';
import addNickname from '@/client/js/functions/addNickname';

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
        reject(error);
      }
    }

    function initConnect(channelName) {
      try {
        peerConnection = new RTCPeerConnection(servers);
        peerConnection.ondatachannel = (event) => {
          onDataChannel = event.channel;

          // 내 nickName 상대방에게 전송
          if (onDataChannel && onDataChannel.readyState === 'open') {
            onDataChannel.send(
              JSON.stringify({
                type: 'sharedData',
                nickname: localStorage.getItem('localPlayer'),
              }),
            );
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
            }
          }
        };

        peerConnection.onconnectionstatechange = (event) => {
          if (peerConnection) {
            if (peerConnection.connectionState === 'disconnected' || peerConnection.connectionState === 'failed') {
              // LOADING_EVENT.show(msg_str('left_user'));
            }
          }
        };

        // dataChannel = peerConnection.createDataChannel('sendChannel');
        dataChannel = peerConnection.createDataChannel(channelName);

        dataChannel.onopen = () => {
          // console.log("dataChannel is onopen!");
        };

        dataChannel.onmessage = (event) => {
          const message = JSON.parse(event.data);
          if (message.type === 'sharedData') {
            storageMethod('s', 'SET_ITEM', 'remotePlayer', message.nickname);
            addNickname('remotePlayer');

            console.log('dataChannel.label : ', dataChannel.label);

            // 두 peer가 연결이 되어야 resolve 시켜야 함
            resolve({ onDataChannel, dataChannel });
          }
        };

        dataChannel.onclose = () => {
          // console.log("dataChannel is closed!");
        };

        dataChannel.onerror = (error) => {
          // console.log("DataChannel error: ", error);
        };
      } catch (error) {
        otherLeavesComn();
        reject(error);
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
        reject(error);
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
        reject(error);
      }
    }

    /**
     * execution
     */
    try {
      storageMethod('s', 'SET_ITEM', 'gameName', gameName);

      signalingSocket = new WebSocket(`${process.env.SOCKET_HOST}:${process.env.RTC_PORT}`);

      // throw new Error('error catch test');

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
        reject(new Error('WebSocket 연결 오류'));
      };

      signalingSocket.onclose = (event) => {
        // WebSocket 연결이 닫힘
        otherLeavesComn();
        reject(new Error('WebSocket 연결이 닫힘'));
      };
    } catch (error) {
      otherLeavesComn();
      reject(error);
    }
  });
}
