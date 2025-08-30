import findCharCode from '@/client/js/functions/findCharCode';
import setCookies from '@/client/js/module/cookies/setCookies';
import getCookies from '@/client/js/module/cookies/getCookies';
import roomNameReturnCookie from '@/client/js/module/cookies/roomNameReturnCookie';
import { debug } from '@/client/js/module/debug';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { responseComn } from '@/client/js/network/responseComn';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import storageKeys from '@/client/js/functions/dataVerification/storageKeys';

import insertStorageDate from '@/client/js/functions/insertStorageDate';
import cardVerification from '@/client/js/views/game/indianPocker/fns/common/cardVerification';

const T = (() => ![] + [] ? !![] : ![])(); // true
const F = (() => ![] + [] ? ![] : !![])(); // false
export const encrypt = { keypair: '', code: '' };
export const connObj = { signalingServer: null, dataChannel: null, peerConnection: null };
export function setDisConnect () {
  // disconnect peerConnection
  if (
    connObj.peerConnection &&
    connObj.peerConnection.connectionState === 'connected'
  ) {
    connObj.peerConnection.close();
    connObj.peerConnection = null;
  };
  // disconnect dataChannel
  if (
    connObj.dataChannel &&
    connObj.dataChannel.readyState === 'open'
  ) {
    connObj.dataChannel.close();
    connObj.dataChannel = null;
  };
  // disconnect signalingServer
  if (connObj.signalingServer) {
    connObj.signalingServer.close();
    connObj.signalingServer = null;
  };
};
class RefreshTask {
  #serverRefresh; // private 필드
  constructor() {
    this.#serverRefresh = F;
  };
  get() { return this.#serverRefresh};
  set(_b) { this.#serverRefresh = _b; };
};
const R = new RefreshTask();
export function consRefresh() {
  // 값이 true라면 반환하기 전에 false로 바꿔줌
  console.log('평가 전 serverRefresh --------------- ', R.get());
  if (R.get()) {
    R.set(F);
    console.log('평가 후 serverRefresh ------------- ', R.get());
    return T;  // 조건문에서는 true로 평가됨
  }
  return F;
};

export default function webRTC(gameName) {
  return new Promise(async (resolve, reject) => {
    /** ==============================================================================================================
     * common variable
     */
    connObj.signalingServer = new WebSocket(`${process.env.SOCKET_HOST}:${process.env.RTC_PORT}`);
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

    const readyCheckObj = {
      iceConnected: F,
      dataChannelOpen: F
    };

    /** ==============================================================================================================
     * functions
     */
    function rejectComn() {
      // delCookies('gc_at');
      if (connObj.signalingServer) connObj.signalingServer.close();
      if (peers[remotePeer]) {
        peers[remotePeer].pc.close();
        peers[remotePeer].pc = null;
        peers[remotePeer].dataChannel.close();
        peers[remotePeer].dataChannel = null;
        delete peers[remotePeer];
      };
    };

    async function checkReady(roomName, pid, refresh) {
      if (readyCheckObj.iceConnected && readyCheckObj.dataChannelOpen) {
        connObj.peerConnection = peers[remotePeer].pc;
        connObj.dataChannel = peers[remotePeer].dataChannel;
        await responseComn(gameName);

        // if (!connObj.serverRefresh) {
        if (!R.get()) {
          const cookie = getCookies(gameName);
          if (cookie) {
            // 처음진입이라 cookie 없음
            reject({ errCase: 'errorComn', message: 'server refresh cookie error.' });
          } else {
            setCookies(roomName, gameName);
          };
          // await authCheck(gameName, roomName, pid);
          // await login(gameName, roomName, pid);
        };

        // 처음 진입했거나, 두 Peer가 연결된 상태에서 새로고침 한 경우
        if (encrypt.keypair === '') {
          encrypt.code = getCookies(gameName);
          encrypt.keypair = encrypt.code
            .replace(/\s+/g, '') // 띄어쓰기 제거
            .replace(/[^a-zA-Z0-9가-힣]/g, '') // 특수문자 제거
            .slice(-10); // 맨 뒤 10자리
        };

        // if (connObj.serverRefresh) {
        if (R.get()) {
          const decryptkey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
          const decryptVal = window.sessionStorage.getItem(decryptkey);

          if (!decryptVal) {
            rejectComn();
            reject({ errCase: 'errorComn', message: 'gameState sessionStorage not found' });
          };

          const encryptKeys = storageKeys({
            p1: findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]), // indianPocker,
            p2: findCharCode([88, 66, 65, 72, 90, 68, 86, 75, 85, 73]), // gameStateAllKeys
          });
          if (encryptKeys.includes(decryptVal)) {
            // 모든 gameState key 가 정상적으로 있음
          } else {
            rejectComn();
            reject({ errCase: 'errorComn', message: 'gameState value error' });
          };
        } else {
          // 처음 진입해서 gameState가 없으면 sessionStorage에 waitEnemy 주입
          const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
          if (!window.sessionStorage.getItem(encryptKey)) {
            const encryptVal = findCharCode([74, 75, 71, 90, 87, 79, 85, 69, 65, 88]); // waitEnemy
            storageMethod('s', 'SET_ITEM', encryptKey, encryptVal);
          };
        };

        // refresh : true      && R.get() : true  -> 새로고침 한 peer
        // refresh : true      && R.get() : false -> 새로고침 당한 peer
        // refresh : undefined && R.get() : false -> 처음 진입
        if (typeof refresh === 'boolean' && refresh && !R.get()) return; // 새로고침 당한 peer는 이미 data 보유 중

        // 각 게임에 필요한 data 요청
        if (gameName === 'indianPocker') {
          if (
            connObj.signalingServer &&
            connObj.signalingServer.readyState === WebSocket.OPEN
          ) {
            connObj.signalingServer.send(JSON.stringify({
              type: 'requestStorage',
              gameName: gameName,
              gameCode: encrypt.code
            }));
          }
        } else {
          resolve();
        };

      };
    };

    async function initOnopen() {
      const roomName = roomNameReturnCookie(gameName);
      if (
        connObj.signalingServer &&
        connObj.signalingServer.readyState === WebSocket.OPEN
      ) {
        connObj.signalingServer.send(JSON.stringify({
          type: 'entryOrder',
          gameName,
          roomName
        }));
      }
    };

    async function createPeerConnection(roomName, pid, refresh) {
      // 새로고침 당하는 Peer 는 여기를 탐
      if (peers[remotePeer] && peers[remotePeer].pc) {
        // 기존 peer RTCPeerConnection close 시켜야
        // oniceconnectionstatechange에서
        // iceConnectionState disconnected를 안탐
        const oldPc = peers[remotePeer].pc;
        oldPc.close();
        readyCheckObj.iceConnected = F;
        readyCheckObj.dataChannelOpen = F;
      };

      const pc = new RTCPeerConnection(servers);
      const dataChannel = pc.createDataChannel(`${gameName}-${roomName}-Channel`);
      peers[remotePeer] = { pc, dataChannel };

      // Data Channel opened -----------------------
      dataChannel.onopen = async () => {
        readyCheckObj.dataChannelOpen = T;
        await checkReady(roomName, pid, refresh);
      };

      dataChannel.onmessage = (event) => {};

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      if (
        connObj.signalingServer &&
        connObj.signalingServer.readyState === WebSocket.OPEN
      ) {
        connObj.signalingServer.send(JSON.stringify({
          type: 'offer',
          sdp: pc.localDescription
        }));
      };

      // ICE connected ---------------------------------
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          if (
            connObj.signalingServer &&
            connObj.signalingServer.readyState === WebSocket.OPEN
          ) {
            connObj.signalingServer.send(JSON.stringify({
              type: 'candidate',
              candidate: event.candidate
            }));
          };
        };
      };
      pc.oniceconnectionstatechange = async (event) => {
        if (event.target.iceConnectionState === 'disconnected') {
          if (connObj.signalingServer && connObj.signalingServer.readyState === WebSocket.OPEN) {
            connObj.signalingServer.send(JSON.stringify({
              type: 'connectEnd',
            }));
          };
          if (peers[remotePeer]) {
            // 상대 peer와 연결 끊김 후 새로고침 하면 새로운 peer와 재연결 시도
            // await logout();
            // delCookies('gc_at');
            console.log(`
              ${remotePeer} : ICE 연결 끊김으로 peers에서 제거
              readyState : ${connObj.signalingServer.readyState}
            `);
            delete peers[remotePeer];
          };
          if (connObj.signalingServer && connObj.signalingServer.readyState === WebSocket.OPEN) connObj.signalingServer.close();
          if (pc) pc.close();
          errorManagement({ errCase: 'webRTC', component: 'peerConnection', message: 'createPeerConnection' });
          storageMethod('s', 'REMOVE_ALL');
        };

        if (event.target.iceConnectionState === 'connected' || event.target.iceConnectionState === 'completed') {
          readyCheckObj.iceConnected = T;
          await checkReady(roomName, pid, refresh);
        };
      };
    };

    async function handleOffer(sdp, roomName, pid, refresh) {
      if (!peers[remotePeer]) {
        const pc = new RTCPeerConnection(servers);
        peers[remotePeer] = { pc, dataChannel: null };

        // Data Channel opened -----------------------
        pc.ondatachannel = (event) => {
          peers[remotePeer].dataChannel = event.channel;
          event.channel.onopen = async () => {
            readyCheckObj.dataChannelOpen = T;
            await checkReady(roomName, pid, refresh);
          };
          event.channel.onmessage = (event) => {};
        };

        await pc.setRemoteDescription(new RTCSessionDescription(sdp));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        if (
          connObj.signalingServer &&
          connObj.signalingServer.readyState === WebSocket.OPEN
        ) {
          connObj.signalingServer.send(JSON.stringify({
            type: 'answer',
            sdp: pc.localDescription
          }));
        };

        // ICE connected ---------------------------------
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            if (
              connObj.signalingServer &&
              connObj.signalingServer.readyState === WebSocket.OPEN
            ) {
              connObj.signalingServer.send(JSON.stringify({
                type: 'candidate',
                candidate: event.candidate
              }));
            };
          };
        };
        pc.oniceconnectionstatechange = async (event) => {
          if (event.target.iceConnectionState === 'disconnected') {
            if (connObj.signalingServer && connObj.signalingServer.readyState === WebSocket.OPEN) {
              connObj.signalingServer.send(JSON.stringify({
                type: 'connectEnd',
              }));
            };
            if (peers[remotePeer]) {
              // 상대 peer와 연결 끊김 후 새로고침 하면 새로운 peer와 재연결 시도
              // await logout();
              // delCookies('gc_at');
              console.log(`
                ${remotePeer} : ICE 연결 끊김으로 peers에서 제거
                readyState : ${connObj.signalingServer.readyState}
              `);
              delete peers[remotePeer];
            };
            if (connObj.signalingServer && connObj.signalingServer.readyState === WebSocket.OPEN) connObj.signalingServer.close();
            if (pc) pc.close();
            errorManagement({ errCase: 'webRTC', component: 'peerConnection', message: 'createPeerConnection' });
            storageMethod('s', 'REMOVE_ALL');
          };

          if (event.target.iceConnectionState === 'connected' || event.target.iceConnectionState === 'completed') {
            readyCheckObj.iceConnected = T;
            await checkReady(roomName, pid, refresh);
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

      const { type, sdp, candidate, roomName, setOffer, refresh, pid, storageData } = data;

      if (type === 'entryOrder') {
        console.log('entryOrder 받음');

        // 새로고침 후 재접속이면, webRTC 서버에서 refresh true로 받음
        // connObj.serverRefresh = false;
        R.set(F);
        if (refresh) {
          if (setOffer === T.toString()) {
            // 새로고침 당한 상대 peer - setOffer : 'true'
          } else {
            // 새로고침 한 peer - setOffer : undefined
            // connObj.serverRefresh = true;
            R.set(T);
          };
        };

        // if (setOffer === 'true') {
        if (setOffer === T.toString()) {
          console.log('encrypt ______________ ', encrypt);

          // 두번째 접속자 - offer 만들어서 보내야 됨
          await createPeerConnection(roomName, pid, refresh);
        } else {
          // 첫번째 접속자 - offer 받을 준비 해야됨
        };

      } else if (type === 'offer') {
        console.log('offer 받음');
        await handleOffer(sdp, roomName, pid, refresh);

      } else if (type === 'answer') {
        console.log('answer 받음');
        await handleAnswer(sdp);

      } else if (type === 'candidate') {
        console.log('candidate 받음');
        await handleCandidate(candidate);

      } else if (type === 'otherLeaves') {
        console.log('otherLeaves 받음');
        if (peers[remotePeer]) {
          delete peers[remotePeer];
        };
        if (connObj.signalingServer && connObj.signalingServer.readyState === WebSocket.OPEN) connObj.signalingServer.close();
        errorManagement({ errCase: 'webRTC', component: 'peerConnection', message: 'createPeerConnection' });
        storageMethod('s', 'REMOVE_ALL');
      };

      // indianPocker
      if (type === 'responseStorage') {
        console.log('data 받음 >>>>>>>>> ', storageData);
        await insertStorageDate(storageData);
        // if (connObj.serverRefresh) {
        if (R.get()) {
          await cardVerification();
        }
        resolve();
      };
    };

    /** ==============================================================================================================
     * execution
     */
    try {
      connObj.signalingServer.onopen = async () => {
        try {
          await initOnopen();
        } catch (error) {
          reject({ ...error, errCase: error.errCase || 'webRTC' });
        };
      };

      connObj.signalingServer.onmessage = async (event) => {
        try {
          await handleMessage(event);
        } catch (error) {
          rejectComn();
          reject({ ...error, errCase: 'webRTC' });
        };
      };

      connObj.signalingServer.onerror = (event) => {
        reject({ errCase: 'webRTC', component: 'signalingServer', event: 'onerror', message: 'Signaling socket error occurred', errorDetails: event });
      };

      connObj.signalingServer.onclose = (event) => {
        reject({ errCase: 'webRTC', component: 'signalingServer', event: 'onclose', message: 'Signaling socket connection closed', errorDetails: event });
      };
    } catch (error) {
      console.log('error rtcConn.js >>>>>>>>>>>> ', error);

      // otherLeavesComn();
      reject({ ...error, errCase: 'webRTC' });
    }
  });
}
