import { getDeviceType } from '@/client/js/module/isPC';
import storageMethod from '@/client/js/module/storage/storageMethod';
import insertStorageDate from '@/client/js/functions/insertStorageDate';
import encryptionStore from '@/client/store/encryptionStore';

/**
 * ———————————————————————————————————————————————————————————————————
 * COMMON VARIABLE
 */
const ICE_SERVERS = [
  // 공개 STUN 예시(실서비스는 TURN 필요)
  { urls: 'stun:stun.l.google.com:19302' },
];
const REJOIN_GRACE_MS = 3000; // 3초 유예: 새로고침 감지 윈도우
const T = (() => ![] + [] ? !![] : ![])(); // true 난독화
const F = (() => ![] + [] ? ![] : !![])(); // false 난독화

/**
 * ———————————————————————————————————————————————————————————————————
 * RELOAD LOCAL BROWSER
 */
class ReloadTask {
  #reload; // private 필드
  constructor() {
    this.#reload = F;
  };
  get() { return this.#reload};
  set(_) { this.#reload = _; };
};
const R = new ReloadTask();
export function getRL() {
  // 값이 true라면 반환하기 전에 false로 바꿔줌
  if (R.get()) {
    R.set(F);
    return T;  // 조건문에서는 true로 평가됨
  }
  return F;
};
R.set(Boolean(storageMethod("s", "GET_ITEM", "reload")));
storageMethod("s", "REMOVE_ITEM", "reload");

/**
 * ———————————————————————————————————————————————————————————————————
 * COMMON FUNCTION
 */
function log(...args) {
  console.log('[CLIENT]', ...args);
}
function gameId() {
  return (crypto.randomUUID && crypto.randomUUID()) || Math.random().toString(36).slice(2) + Date.now().toString(36);
}
const createChars = (startChar) => {
  const startCode = startChar.charCodeAt(0);
  return Array.from({ length: 13 }, (_, i) => String.fromCharCode(startCode + i * 2));
};

export const KEY = {
  puk: null,
  prk: null,
};

const FNS = {
  deliverToGame: null,
  handleEnvelope: null,
  startGame: null,
  gameName: null,
};

const STATE = {
  ws: null,
  roomId: null,
  peerId: null,
  role: null,
  initRole: null,
  partnerId: null,
  pc: null,
  dc: null,
  reloadTimer: null,
  paired: F,
  makingOffer: F,
  ignoreOffer: F,
  isSettingRemoteAnswerPending: F,
};
function safeWsSend(obj) {
  if (STATE.ws && STATE.ws.readyState === WebSocket.OPEN) {
    STATE.ws.send(JSON.stringify(obj));
  }
}
function sendSignal(toPeerId, data) {
  if (!STATE.ws || STATE.ws.readyState !== WebSocket.OPEN) return;
  STATE.ws.send(JSON.stringify({ type: 'signal', to: toPeerId, data }));
}
function isPolite() {
  return STATE.role === 'polite';
}

const READY = {
  myHelloSent: F,
  peerHelloSeen: F,
  connectedAt: 0,
  waiter: null, // Promise resolver
};
export function setReady() {
  READY.peerHelloSeen = T;
}
function isBrowserConnected() {
  return STATE.pc && STATE.pc.connectionState === 'connected';
}
function isDcOpen() {
  return STATE.dc && STATE.dc.readyState === 'open';
}
// 연결 완료를 기다리는 Promise (타임아웃 포함)
function waitConnected(timeoutMs = 5000) {
  // 이미 만족했으면 즉시 resolve
  if (isBrowserConnected() && isDcOpen() && READY.myHelloSent && READY.peerHelloSeen) {
    return Promise.resolve(T);
  }
  return new Promise((resolve) => {
    READY.waiter = resolve;
    // 타임아웃 안전장치
    setTimeout(() => {
      if (READY.waiter) {
        READY.waiter = null;
        resolve(F);
      }
    }, timeoutMs);
  });
}
export function maybeResolveReady() {
  if (!READY.waiter) return;
  if (isBrowserConnected() && isDcOpen() && READY.myHelloSent && READY.peerHelloSeen) {
    READY.connectedAt = Date.now();
    const r = READY.waiter;
    READY.waiter = null;
    r(T);
    log('✅ Peer READY: both HELLO exchanged & DC open.');
  }
}

/**
 * ———————————————————————————————————————————————————————————————————
 * WEBSOCKET RETRY
 */
let WS_RETRY = { tries: 0, timer: null };
const WS_RETRY_MAX = 6;
const WS_RETRY_BASE = 200;

function scheduleWsReconnect() {
  if (WS_RETRY.timer) return;
  const t = Math.min(WS_RETRY_MAX, WS_RETRY.tries++);
  const delay = WS_RETRY_BASE * Math.pow(2, t);
  WS_RETRY.timer = setTimeout(() => {
    WS_RETRY.timer = null;
    connectSignaling(T);
  }, delay);
}

/**
 * ———————————————————————————————————————————————————————————————————
 * ICE RESTART
 */
let ICE_RESTART_TIMER = null;
const ICE_RESTART_DEBOUNCE = 1200;

async function doIceRestart() {
  const pc = STATE.pc;
  if (!pc) return;
  if (STATE.role !== 'impolite') return; // 단일 오퍼 생성자 유지

  log('ICE Restart: creating new offer with iceRestart:true');
  try {
    STATE.makingOffer = T;
    const offer = await pc.createOffer({ iceRestart: T });
    await pc.setLocalDescription(offer);
    sendSignal(STATE.partnerId, { sdp: pc.localDescription });
  } finally {
    STATE.makingOffer = F;
  }
}
function debounceIceRestart() {
  if (ICE_RESTART_TIMER) clearTimeout(ICE_RESTART_TIMER);
  ICE_RESTART_TIMER = setTimeout(() => {
    ICE_RESTART_TIMER = null;
    doIceRestart().catch((err) => console.error('ICE restart failed:', err));
  }, ICE_RESTART_DEBOUNCE);
}

/**
 * ———————————————————————————————————————————————————————————————————
 * RELOABLE
 */
const RELIABLE = {
  nextSeq: 1,
  expectedSeq: 1,
  outbox: new Map(), // 보낸 편지 대기함
  buffer: new Map(), // 받은 편지 정렬함
  lastAcked: 0,
  resendTimer: null,
};
let PING_TIMER = null;
const PING_INTERVAL = 5000;
let LAST_PING_TS = 0;
let LAST_RTT_MS = null;
const RESEND_INTERVAL = 300;
const RESEND_MAX = 10;

export function rawSend(env) {
  if (!STATE.dc || STATE.dc.readyState !== 'open') return;
  // 최신 ack를 동봉(양방향 ack 파이프라인)
  if (typeof env.ack !== 'number') {
    env.ack = RELIABLE.expectedSeq - 1;
  }
  STATE.dc.send(JSON.stringify(env));
}
function stopPingLoop() {
  if (PING_TIMER) {
    clearInterval(PING_TIMER);
    PING_TIMER = null;
  }
}
function startPingLoop() {
  if (PING_TIMER) return;
  PING_TIMER = setInterval(() => {
    if (!STATE.dc || STATE.dc.readyState !== 'open') return;
    LAST_PING_TS = Date.now();
    rawSend({ v: 1, t: 'PING', ts: LAST_PING_TS });
  }, PING_INTERVAL);
}
function stopResendLoop() {
  if (RELIABLE.resendTimer) {
    clearInterval(RELIABLE.resendTimer);
    RELIABLE.resendTimer = null;
  }
}
function startResendLoop() {
  if (RELIABLE.resendTimer) return;
  RELIABLE.resendTimer = setInterval(() => {
    const now = Date.now();
    for (const [seq, rec] of RELIABLE.outbox) {
      if (!rec.sentAt || now - rec.sentAt >= RESEND_INTERVAL) {
        // 재전송(최대 횟수 초과 시 포기 및 오류 로그)
        if (rec.retries >= RESEND_MAX) {
          console.warn(`seq ${seq} dropped after ${RESEND_MAX} retries`);
          RELIABLE.outbox.delete(seq);
          continue;
        }
        rec.sentAt = now;
        rec.retries++;
        rawSend(rec.msg);
      }
    }
    // outbox가 비면 타이머 중지
    if (RELIABLE.outbox.size === 0) {
      stopResendLoop();
    }
  }, RESEND_INTERVAL);
}
function resetReliableLayer() {
  RELIABLE.nextSeq = 1;
  RELIABLE.expectedSeq = 1;
  RELIABLE.outbox.clear();
  RELIABLE.buffer.clear();
  RELIABLE.lastAcked = 0;
  stopResendLoop();
}
export function ackUntil(seq) {
  console.log('ackUntil 진입', seq);
  // seq 이하 outbox를 정리
  let removed = 0;
  for (const s of Array.from(RELIABLE.outbox.keys())) {
    if (s <= seq) {
      RELIABLE.outbox.delete(s);
      removed++;
    }
  }
  if (removed) {
    RELIABLE.lastAcked = seq;
  }
}
export function handleReliableReceive(env) {
  const seq = env.seq;

  // 이미 전달한(seq < expected) 이거나 중복이면 무시
  if (seq < RELIABLE.expectedSeq) return;

  // 미래 패킷(seq > expected) → 버퍼에 저장
  if (seq > RELIABLE.expectedSeq) {
    RELIABLE.buffer.set(seq, env);
    // 최신 ack를 동봉해 즉시 회신해 주면 상대 재전송 최적화에 도움

    rawSend({ v: 1, t: 'ACK', seq: RELIABLE.expectedSeq - 1 });
    return;
  }

  // 정확히 다음에 전달되어야 할 패킷(seq === expected)
  // deliverToGame(env.payload, { reliable: true, seq });
  FNS.deliverToGame(env.payload, { reliable: T, seq });

  // 전달 완료 → expectedSeq 증가
  RELIABLE.expectedSeq++;

  // 혹시 버퍼에 다음 것들이 와 있으면 연속으로 전달
  while (RELIABLE.buffer.has(RELIABLE.expectedSeq)) {
    const nextEnv = RELIABLE.buffer.get(RELIABLE.expectedSeq);
    RELIABLE.buffer.delete(RELIABLE.expectedSeq);
    // deliverToGame(nextEnv.payload, { reliable: true, seq: RELIABLE.expectedSeq });
    FNS.deliverToGame(nextEnv.payload, { reliable: T, seq: RELIABLE.expectedSeq });
    RELIABLE.expectedSeq++;
  }

  // 전달 후 ack 전송(상대의 재전송 종료를 빠르게)
  rawSend({ v: 1, t: 'ACK', seq: RELIABLE.expectedSeq - 1 });
}
export function sendGame(payload, { reliable = T, id = undefined } = {}) {
  if (!STATE.dc || STATE.dc.readyState !== 'open') return;

  if (!reliable) {
    // 비신뢰/무순서(간단): 타입만 MSG, seq/ack 없이 전송
    const env = { v: 1, t: 'MSG', ts: Date.now(), id, payload };
    STATE.dc.send(JSON.stringify(env));
    return;
  }

  // --- 신뢰/순서 보장 경로 ---
  const seq = RELIABLE.nextSeq++;
  const env = {
    v: 1,
    t: 'MSG',
    seq,
    ts: Date.now(),
    id,
    // 내가 마지막으로 "전달 완료"한 원격 seq를 ack에 담아 보내줘 상호 확인 빠르게
    ack: RELIABLE.expectedSeq - 1,
    payload,
  };

  // outbox에 보관(ACK 오기 전까지 재전송 대상)
  RELIABLE.outbox.set(seq, { msg: env, sentAt: 0, retries: 0 });

  // 즉시 송신 + 재전송 루프 가동
  rawSend(env);
  startResendLoop();
}

/**
 * ———————————————————————————————————————————————————————————————————
 * RELOAD REMOTE PEER CHECK EVENT
 */
function channelClose() {
  console.log('Remote Peer Left...');
  cleanupPeerConnection(F);
  if (STATE.ws) {
    try {
      STATE.ws.close(4000, 'remote_peer_left');
    } catch {}
    STATE.ws = null;
  }
}
function reloadConnectCheck() {
  STATE.reloadTimer = setTimeout(() => {
    if (!STATE.dc || STATE.dc.readyState !== 'open') {
      channelClose();
    } else {
      clearTimeout(STATE.reloadTimer);
      STATE.reloadTimer = null;
    }
  }, REJOIN_GRACE_MS);
}

/**
 * ———————————————————————————————————————————————————————————————————
 * BROWSER RELOAD EVENT
 */
function leavePage() {
  storageMethod('s', 'SET_ITEM', "reload", T);
  if (STATE.roomId && STATE.initRole) {
    const pool = STATE.initRole === 'impolite' ? createChars('a') : createChars('b');
    const randomChar = pool[Math.floor(Math.random() * pool.length)];
    storageMethod('s', 'SET_ITEM', "roomId", `${STATE.roomId}${randomChar}`);
  }
};
if (getDeviceType() === 'PC') {
  window.addEventListener('beforeunload', () => {
    leavePage();
  });
};

/**
 * ———————————————————————————————————————————————————————————————————
 * PERFECT NEGOTIATION
 */
function attachDataChannelHandlers(dc, tag) {
  dc.onopen = () => {
    log(`DataChannel[${tag}] open`);
    if (STATE.reloadTimer) {
      clearTimeout(STATE.reloadTimer);
      STATE.reloadTimer = null;
    }

    resetReliableLayer();
    // startPingLoop();

    // 앱 레벨 핸드셰이크 시작
    READY.myHelloSent = T;
    // sendEnvelope({ t: 'HELLO', payload: { from: STATE.peerId } });
    sendGame({ type: 'ROUND/START', from: STATE.peerId }, { reliable: F });
  };
  dc.onmessage = (ev) => {
    let msg;
    try {
      msg = JSON.parse(ev.data);
    } catch {
      return;
    }
    // handleEnvelope(msg);
    FNS.handleEnvelope(msg);
  };
  dc.onclose = () => {
    log(`DataChannel[${tag}] close`);

    // stopPingLoop();
    stopResendLoop();

    if (STATE.role === 'impolite' && STATE.pc?.connectionState !== 'closed') {
      debounceIceRestart();
    }

    reloadConnectCheck();
  };
}
function cleanupPeerConnection(logIt = T) {
  if (STATE.dc) {
    try {
      STATE.dc.close();
    } catch {}
    STATE.dc = null;
  }
  if (STATE.pc) {
    try {
      STATE.pc.onicecandidate = null;
      STATE.pc.ondatachannel = null;
      STATE.pc.onconnectionstatechange = null;
      STATE.pc.oniceconnectionstatechange = null;
      STATE.pc.close();
    } catch {}
    STATE.pc = null;
  }

  STATE.makingOffer = F;
  STATE.ignoreOffer = F;
  STATE.isSettingRemoteAnswerPending = F;

  READY.myHelloSent = F;
  READY.peerHelloSeen = F;
  READY.connectedAt = 0;
  READY.waiter = null;

  if (logIt) log('pc clean up');
}
async function startPeerConnection() {
  cleanupPeerConnection(F);

  const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });
  STATE.pc = pc;

  STATE.makingOffer = F;
  STATE.ignoreOffer = F;
  STATE.isSettingRemoteAnswerPending = F;

  READY.myHelloSent = F;
  READY.peerHelloSeen = F;
  READY.connectedAt = 0;
  READY.waiter = null;

  if (STATE.role === 'impolite') {
    STATE.dc = pc.createDataChannel(gameId());
    attachDataChannelHandlers(STATE.dc, 'active-dc');
  } else {
    STATE.dc = null;
  }

  pc.onnegotiationneeded = async () => {
    if (STATE.role !== 'impolite') return;
    try {
      STATE.makingOffer = T;
      await pc.setLocalDescription(await pc.createOffer());
      sendSignal(STATE.partnerId, { sdp: pc.localDescription });
    } catch (err) {
      console.error('onnegotiationneeded error : ', err);
    } finally {
      STATE.makingOffer = F;
    }
  };
  pc.ondatachannel = (ev) => {
    STATE.dc = ev.channel;
    attachDataChannelHandlers(STATE.dc, 'passive-dc');
  };
  pc.onicecandidate = (ev) => {
    if (ev.candidate) {
      sendSignal(STATE.partnerId, { candidate: ev.candidate });
    } else {
      sendSignal(STATE.partnerId, { candidate: null });
    }
  };
  pc.onconnectionstatechange = () => {
    log('connectionState', pc.connectionState);
  };
  pc.oniceconnectionstatechange = () => {
    log('iceConnectionState', pc.iceConnectionState);

    if (pc.iceConnectionState === 'disconnected' || pc.iceConnectionState === 'failed') {
      if (STATE.role === 'impolite') {
        debounceIceRestart();
      }
    }
  };
}
async function handleRemoveSignal(msg) {
  const pc = STATE.pc;
  if (!pc) return;
  try {
    const data = msg.data;
    if (data?.sdp) {
      const desc = data.sdp;
      const offerCollision = desc.type === 'offer' && (STATE.makingOffer || STATE.isSettingRemoteAnswerPending);
      STATE.ignoreOffer = !isPolite() && offerCollision;
      if (STATE.ignoreOffer) return;
      if (desc.type === 'offer') {
        if (STATE.makingOffer) {
          await pc.setLocalDescription({ type: 'rollback' });
        }
        await pc.setRemoteDescription(desc);
        STATE.isSettingRemoteAnswerPending = T;
        await pc.setLocalDescription(await pc.createAnswer());
        sendSignal(STATE.partnerId, { sdp: pc.localDescription });
        STATE.isSettingRemoteAnswerPending = F;
      } else {
        await pc.setRemoteDescription(desc);
      }
    } else if ('candidate' in data) {
      try {
        await pc.addIceCandidate(data.candidate || null);
      } catch (e) {
        if (!STATE.ignoreOffer) {
          console.error('addIceCandidate error : ', e);
        }
      }
    }
  } catch (err) {
    console.error('handleRemoveSignal error : ', err);
  }
}

/**
 * ———————————————————————————————————————————————————————————————————
 * CONNECT SIGNALING
 */
export function connectSignaling(connected = F, fns) {
  if (fns && fns.deliverToGame && fns.handleEnvelope) {
    FNS.deliverToGame = fns.deliverToGame;
    FNS.handleEnvelope = fns.handleEnvelope;
    FNS.startGame = fns.startGame;
    FNS.gameName = fns.gameName;
  }

  if (STATE.ws && STATE.ws.readyState === WebSocket.OPEN) return;

  // ----- WebSocket signaling -----
  const WS_URL = `${process.env.SOCKET_HOST}:${process.env.RTC_PORT}`;
  const ws = new WebSocket(WS_URL);
  STATE.ws = ws;

  ws.addEventListener('open', () => {
    log(connected ? 'WS reconnected.' : 'WS connected.');
    WS_RETRY.tries = 0;
    if (WS_RETRY.timer) {
      clearTimeout(WS_RETRY.timer);
      WS_RETRY.timer = null;
    }

    // ★ 이전 roomId가 있으면 힌트로 보낸다.
    // const roomHint = window.sessionStorage.getItem('roomId') || null;
    const roomHint = () => {
      const roomId = window.sessionStorage.getItem('roomId');
      if (roomId) {
        if (roomId.length === 11) {
          const lastChar = roomId.at(-1);
          const offset = lastChar.charCodeAt(0) - 'a'.charCodeAt(0);
          if (offset % 2 === 0) {
            // 최초 할당받은 role = impolite
            STATE.initRole = 'impolite';
          } else {
            // 최초 할당받은 role = polite
            STATE.initRole = 'polite';
          }
          return roomId.slice(0, -1);
        } else if (roomId.length === 10) {
          return roomId;
        }
      }
      return null;
    };

    safeWsSend({
      type: 'join',
      roomHint: roomHint(),
    });
  });
  ws.addEventListener('message', async (ev) => {
    let msg;
    try {
      msg = JSON.parse(ev.data);
    } catch {
      return;
    }
    switch (msg.type) {
      case 'room-assigned': {
        if (msg?.pairedDataChannel) {
          // 이전에 상대 peer와 DataChannel로 연결했었음
          reloadConnectCheck();
        }

        STATE.roomId = msg.roomId;
        STATE.peerId = msg.peerId;
        STATE.role = msg.role;
        // KEY.keypair = msg.keypair;
        // console.log('KEY.keypair : ', KEY.keypair);

        // ★ 세션에 저장(재접속시 hint로 사용)
        // if (window.sessionStorage.getItem('roomId') === null) {
        //   window.sessionStorage.setItem('roomId', STATE.roomId);
        // }
        log(`Assigned room=${STATE.roomId}, me=${STATE.peerId}, role=${STATE.role}`);
        break;
      }
      case 'paired': {
        if (msg.roomId !== STATE.roomId) return;
        if (msg.you?.peerId === STATE.peerId) {
          STATE.role = msg.you.role;
          STATE.partnerId = msg.partner.peerId;

          // ★ 안전 위해 여기서도 다시 저장(경합 대비)
          if (window.sessionStorage.getItem('roomId') === null && STATE.initRole === null) {
            // 최초 연결 시
            STATE.initRole = STATE.role;

            const pool = STATE.initRole === 'impolite' ? createChars('a') : createChars('b');
            const randomChar = pool[Math.floor(Math.random() * pool.length)];

            window.sessionStorage.setItem('roomId', `${msg.roomId}${randomChar}`);
          }
          log(`Paired! me(${STATE.role}) <-> partner(${msg.partner.peerId}/${msg.partner.role})`);

          await startPeerConnection();

          waitConnected(7000).then(async (ok) => {
            if (!ok) {
              console.warn('Peer not fully ready in time (will keep recovering).');
              return;
            }

            console.log('최초 할당 role : ', STATE.initRole);

            // 여기서부터 "진짜 연결 완료" 로 가정하고 게임 시작/동기화
            const compair = encryptionStore.getState().encryptionState.compair;
            // 새로고침 당한 경우, compair 데이터 있으므로 requestStorage 호출 불필요
            if (compair && compair.constructor === Object && Object.keys(compair).length > 0) return;

            // 처음 진입이거나 새로고침 일 경우 signalinServer에 compair 데이터 호출
            safeWsSend({
              type: 'requestStorage',
              gameName: FNS.gameName,
              initRole: STATE.initRole,
            });
            // await FNS.startGame();
          });
        }

        break;
      }
      case 'partner-left': {
        if (msg.roomId !== STATE.roomId) return;
        console.log('Partner Lefted...');
        cleanupPeerConnection();
        break;
      }
      case 'signal': {
        if (!STATE.pc) {
          await startPeerConnection();
        }
        await handleRemoveSignal(msg);
        break;
      }
      case 'responseStorage': {
        if (msg?.storageData && msg?.keypair) {
          KEY.puk = msg.keypair.puk;
          KEY.prk = msg.keypair.prk;
          console.log('PUBLIC KEY :::: ', KEY.puk);
          console.log('PRIVATE KEY ::: ', KEY.prk);

          await insertStorageDate(msg.storageData);
          await FNS.startGame();
        }
        break;
      }
      default: {
        break;
      }
    }
  });
  ws.addEventListener('close', (ev) => {
    log('WS closed. Try reconnecting...', ev.code, ev.reason);
    if (ev.code === 4000 && ev.reason === 'remote_peer_left') {
      return;
    }
    scheduleWsReconnect();
  });
  ws.addEventListener('error', () => {
    try {
      ws.close();
    } catch {}
  });
}
