import { v4 as uuidV4 } from 'uuid';
import encryptionStore, { updateCompair, updateKeypair } from '@/client/store/encryptionStore';
import findCharCode from '@/client/js/functions/findCharCode';
import setCookies from '@/client/js/module/cookies/setCookies';
import getCookies from '@/client/js/module/cookies/getCookies';
import roomNameReturnCookie from '@/client/js/module/cookies/roomNameReturnCookie';
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
  if (R.get()) {
    R.set(F);
    return T;  // 조건문에서는 true로 평가됨
  }
  return F;
};

// 세션 컨텍스트 (glare/큐/타이브레이커 포함)
const session = {
  id: uuidV4(),
  polite: false, // 방 규칙으로 결정(예: 나중에 들어온 쪽이 polite)
  makingOffer: false,
  ignoreOffer: false,
  pendingCandidates: [],
  remoteId: null, // 처음 들어온 상대 세션 ID를 바인딩
  remotePid: null, // 상대의 지속 ID(pid)
  tieBreaker: (Math.random() * 2**53) | 0,  // 안전한 정수 범위 난수
  remoteTieBreaker: null,
};

// --- 공통 send (항상 sessionId 포함) ---
function send(type, payload = {}) {
  if (connObj.signalingServer?.readyState === WebSocket.OPEN) {
    connObj.signalingServer.send(JSON.stringify({
      type,
      sessionId: session.id,
      tieBreaker: session.tieBreaker,
      ...payload
    }));
  }
}

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

    function resetPeer() {
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
      if (peers[remotePeer]) {
        if (peers[remotePeer]?.pc && peers[remotePeer].pc?.connectionState === 'connected') {
          peers[remotePeer].pc.close();
          peers[remotePeer].pc = null;
        };
        if (peers[remotePeer]?.dataChannel && peers[remotePeer].dataChannel?.readyState === 'open') {
          peers[remotePeer].dataChannel.close();
          peers[remotePeer].dataChannel = null;
        };
        delete peers[remotePeer];
      };
    };

    async function checkReady(roomName, pid, refresh, setOffer) {
      // console.log('T1 -------- ', readyCheckObj.iceConnected);
      // console.log('T2 -------- ', readyCheckObj.dataChannelOpen);

      if (readyCheckObj.iceConnected && readyCheckObj.dataChannelOpen) {
        connObj.peerConnection = peers[remotePeer].pc;
        connObj.dataChannel = peers[remotePeer].dataChannel;
        await responseComn(gameName);

        // 새로고침 당한 peer
        /* if (
          setOffer === T.toString()
          && typeof refresh === 'boolean'
          && refresh
          && !R.get()
        ) {
          console.log('새고로침 당한 peer ===================');
          return resolve();

          const compair = encryptionStore.getState().encryptionState.compair;
          console.log('compair ~~~~~~~~~~ ', compair);
          if (Object.keys(compair).length > 0) return resolve();
          if (
            connObj.signalingServer &&
            connObj.signalingServer.readyState === WebSocket.OPEN
          ) {
            connObj.signalingServer.send(JSON.stringify({
              type: 'requestStorage',
              gameName: gameName,
              gameCode: encrypt.code
            }));
          };
        }; */

        // if (!connObj.serverRefresh) {
        if (!R.get() && !refresh) {
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

        const compair = encryptionStore.getState().encryptionState.compair;
        if (Object.keys(compair).length > 0) {
          R.set(F);
          return resolve();
        };

        // 각 게임에 필요한 data 요청
        if (gameName === 'indianPocker') {
          // if (
          //   connObj.signalingServer &&
          //   connObj.signalingServer.readyState === WebSocket.OPEN
          // ) {
          //   connObj.signalingServer.send(JSON.stringify({
          //     type: 'requestStorage',
          //     gameName: gameName,
          //     gameCode: encrypt.code
          //   }));
          // }
          send('requestStorage', { gameName: gameName, gameCode: encrypt.code });
        } else {
          resolve();
        };

      };
    };

    async function initOnopen() {
      const roomName = roomNameReturnCookie(gameName);
      // if (
      //   connObj.signalingServer &&
      //   connObj.signalingServer.readyState === WebSocket.OPEN
      // ) {
      //   connObj.signalingServer.send(JSON.stringify({
      //     type: 'entryOrder',
      //     gameName,
      //     roomName
      //   }));
      // }
      send('entryOrder', { gameName, roomName });
    };

    async function createPeerConnection(roomName, pid, refresh, setOffer) {
      // 새로고침 당하는 Peer 는 여기를 탐
      if (peers[remotePeer] && peers[remotePeer].pc) {
        // 기존 peer RTCPeerConnection close 시켜야
        // oniceconnectionstatechange에서
        // iceConnectionState disconnected를 안탐
        try { peers[remotePeer].pc.close(); } catch {}
        readyCheckObj.iceConnected = F;
        readyCheckObj.dataChannelOpen = F;
      };

      const pc = new RTCPeerConnection(servers);
      peers[remotePeer] = { pc, dataChannel: null };

      // offerer가 되면 이 쪽에서 DC 생성
      const dataChannel = pc.createDataChannel(`${gameName}-${roomName}-Channel`);
      peers[remotePeer].dataChannel = dataChannel;

      // Data Channel opened -----------------------
      dataChannel.onopen = async () => {
        // console.log('새로고침 당함 1 ---------- ');
        readyCheckObj.dataChannelOpen = T;
        await checkReady(roomName, pid, refresh, setOffer);
      };
      dataChannel.onmessage = (event) => {};

      // perfect negotiation: glare-safe
      pc.onnegotiationneeded = async () => {
        try {
          session.makingOffer = true;
          await pc.setLocalDescription(); // implicit createOffer
          send('sdp', { sdp: pc.localDescription });
        } catch (e) {
          // ignore
        } finally {
          session.makingOffer = false;
        }
      };

      // ICE connected ---------------------------------
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          send('candidate', { candidate: event.candidate });
        };
      };
      pc.oniceconnectionstatechange = async (event) => {
        await onIceStateChange(pc, roomName, pid, refresh);
      };
    };

    async function handleOffer(sdp, roomName, pid, refresh, setOffer) {
      if (!peers[remotePeer]) {
        const pc = new RTCPeerConnection(servers);
        peers[remotePeer] = { pc, dataChannel: null };
        // Data Channel opened -----------------------
        pc.ondatachannel = (event) => {
          const ch = event.channel;
          peers[remotePeer].dataChannel = ch;
          ch.onopen = async () => {
            readyCheckObj.dataChannelOpen = T;
            // console.log('새로고침 당함 3 ---------- ');
            await checkReady(roomName, pid, refresh, setOffer);
          };
          ch.onmessage = (event) => {};
        };
        // ICE connected ---------------------------------
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            send('candidate', { candidate: event.candidate });
          };
        };
        pc.oniceconnectionstatechange = async (event) => {
          await onIceStateChange(pc, roomName, pid, refresh);
        };
      };

      const pc = peers[remotePeer].pc;

      const offerCollision = (sdp.type === 'offer') &&
        (session.makingOffer || pc.signalingState !== 'stable');

      session.ignoreOffer = !session.polite && offerCollision;
      if (session.ignoreOffer) return; // impolite는 충돌 시 상대 offer 무시

      if (offerCollision) {
        await pc.setLocalDescription({ type: 'rollback' });
      }

      await pc.setRemoteDescription(new RTCSessionDescription(sdp));
      await flushPendingCandidates(pc);

      await pc.setLocalDescription(); // implicit createAnswer
      send('sdp', { sdp: pc.localDescription });
    };
    async function handleAnswer(sdp) {
      const pc = peers[remotePeer]?.pc;
      if (!pc) return;
      await pc.setRemoteDescription(new RTCSessionDescription(sdp));
      await flushPendingCandidates(pc);
    };
    async function handleCandidate(candidate) {
      const pc = peers[remotePeer]?.pc;
      if (!pc) return;

      if (!pc.remoteDescription) {
        session.pendingCandidates.push(candidate);
        return;
      }
      try { await pc.addIceCandidate(new RTCIceCandidate(candidate)); } catch {}
    };

    async function handleMessage(event) {
      const data = JSON.parse(event.data);
      const { type, sdp, candidate, roomName, setOffer, refresh, pid, storageData, msg, sessionId, tieBreaker: peerTB } = data;

      if (!acceptFromPeer({
        sessionId, peerTieBreaker: peerTB, peerPid: pid, refresh, type
      })) return;

      // console.log('session.id :::::: ', session.id);
      // console.log('sessionId ::::::: ', sessionId);
      // 🔐 스테일/엉뚱한 시그널 차단 (서버가 상대에게만 포워딩하는 구조에 적합)
      // if (!acceptFromPeer(sessionId)) return;

      if (type === 'entryOrder') {
        console.log('entryOrder 받음 setOffer : ', setOffer);

        // 새로고침 후 재접속이면, webRTC 서버에서 refresh true로 받음
        // connObj.serverRefresh = false;
        R.set(F);
        if (refresh) {
          // resetPeer();
          if (setOffer === T.toString()) {
            // 새로고침 당한 상대 peer - setOffer : 'true'
          } else {
            // 새로고침 한 peer - setOffer : undefined
            // connObj.serverRefresh = true;
            R.set(T);
          };
        };

        // 여기서 createPeerConnection을 만들어 두면,
        // onnegotiationneeded가 역할 충돌 없이 알아서 offer를 발생/흡수.
        await createPeerConnection(roomName, pid, refresh);
        return;
      } else if (type === 'offer' || (type === 'sdp' && sdp?.type === 'offer')) {
        await handleOffer(sdp, roomName, pid, refresh);
      } else if (type === 'answer' || (type === 'sdp' && sdp?.type === 'answer')) {
        await handleAnswer(sdp);
      } else if (type === 'candidate') {
        await handleCandidate(candidate);
      } else if (type === 'otherLeaves') {
        console.log('otherLeaves 받음 : ', msg);
        if (peers[remotePeer]) {
          delete peers[remotePeer];
        };
        if (connObj.signalingServer && connObj.signalingServer.readyState === WebSocket.OPEN) connObj.signalingServer.close();
        errorManagement({ errCase: 'webRTC', component: 'peerConnection', message: 'createPeerConnection' });
        storageMethod('s', 'REMOVE_ALL');
      };

      // indianPocker
      if (type === 'responseStorage') {
        // console.log('data 받음 >>>>>>>>> ', storageData);
        await insertStorageDate(storageData);
        // if (connObj.serverRefresh) {
        if (R.get()) {
          await cardVerification();
        }
        resolve();
      };
    };

    let discTimer = null;
    async function onIceStateChange(pc, roomName, pid, refresh) {
      const s = pc.iceConnectionState;
      if (s === 'connected') {
        console.warn('connected --------');
        readyCheckObj.iceConnected = T;
        clearTimeout(discTimer);
        await checkReady(roomName, pid, refresh);
      }

      if (s === 'disconnected') {
        console.warn('disconnected --------');
        // WS는 닫지 않는다(복구 경로 유지)
        clearTimeout(discTimer);
        discTimer = setTimeout(async () => {
          try {
            pc.restartIce();                 // 새로운 ufrag/pwd
            await pc.setLocalDescription();  // implicit createOffer
            send('sdp', { sdp: pc.localDescription });
          } catch {}
        }, 1500);
      }

      if (s === 'failed' || s === 'closed') {
        console.warn(`${s} --------`);
        clearTimeout(discTimer);
        try { peers[remotePeer]?.dataChannel?.close(); } catch {}
        try { pc.close(); } catch {}
        delete peers[remotePeer];
        errorManagement({ errCase: 'webRTC', component: 'peerConnection', message: 'ice failed/closed' });
        storageMethod('s', 'REMOVE_ALL');
        // 필요 시 여기서만 WS 종료 고려 (지금은 유지)
      }
    };

    async function flushPendingCandidates(pc) {
      while (session.pendingCandidates.length) {
        const c = session.pendingCandidates.shift();
        try { await pc.addIceCandidate(new RTCIceCandidate(c)); } catch {}
      };
    };

    // 상대 세션 바인딩 기반 필터
    function acceptFromPeer({ sessionId, peerTieBreaker, peerPid, refresh, type }) {
      // pid가 없으면(아주 초기 브로드캐스트 등) 일단 통과
      if (!peerPid && !sessionId) return true;

      // ① 아직 상대를 모르면: pid를 우선 바인딩
      if (!session.remotePid) {
        if (peerPid) session.remotePid = peerPid;
        if (sessionId) session.remoteId = sessionId;
        if (typeof peerTieBreaker === 'number' && session.remoteTieBreaker == null) {
          session.remoteTieBreaker = peerTieBreaker;
          session.polite = session.tieBreaker < session.remoteTieBreaker;
        }
        return true;
      }

      // ② 다른 pid에서 온 메시지는 모두 거절 (다른 소켓/스테일)
      if (peerPid && session.remotePid !== peerPid) return false;

      // ③ 동일 pid인데 sessionId가 바뀐 경우
      //    허용된 "재바인딩 트리거"에서만 remoteId를 업데이트
      const rebindAllowed = refresh === true || type === 'entryOrder';
      if (session.remoteId && sessionId && session.remoteId !== sessionId) {
        if (rebindAllowed) {
          session.remoteId = sessionId; // ✅ 재바인딩 허용
        } else {
          return false;                 // 🚫 비허용 타이밍의 세션 변경은 거절
        }
      } else if (!session.remoteId && sessionId) {
        session.remoteId = sessionId;   // 초기 바인딩
      }

      // ④ tieBreaker가 늦게 왔으면 지금 확정
      if (session.remoteTieBreaker == null && typeof peerTieBreaker === 'number') {
        session.remoteTieBreaker = peerTieBreaker;
        session.polite = session.tieBreaker < session.remoteTieBreaker;
      }

      return true;
    }

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
