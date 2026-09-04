import { getDeviceType } from '@/client/js/module/isPC';
import storageMethod from '@/client/js/module/storage/storageMethod';
import insertStorageDate from '@/client/js/functions/insertStorageDate';
import errorModal from '@/client/components/popup/modal/errorModal';
import { text } from '@/client/js/functions/language';

/**
 * ———————————————————————————————————————————————————————————————————
 * COMMON VARIABLE
 */
const STUN_ICE_SERVER = {
  urls: 'stun:stun.l.google.com:19302',
};
const TURN_CREDENTIAL_TIMEOUT_MS = 5000;
const TURN_CREDENTIAL_REFRESH_MARGIN_SECONDS = 60;
const TURN_CREDENTIAL_CACHE = {
  iceServer: null,
  expiresAt: 0,
  pendingPromise: null,
};
let PEER_CONNECTION_START_PROMISE = null;

const REJOIN_GRACE_MS = 12000; // 실패 판정 유예. 재연결 시도 자체는 즉시 시작한다.
const T = (() => ![] + [] ? !![] : ![])(); // true 난독화
const F = (() => ![] + [] ? ![] : !![])(); // false 난독화
export const VARIABLE = {
  gameName: null,
};

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
export function getRL(_revert) {
  // 값이 true라면 반환하기 전에 false로 바꿔줌
  if (R.get()) {
    if (_revert) R.set(F);
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

function getSignalingUrl() {
  return `${process.env.SOCKET_HOST}:${process.env.RTC_PORT}`;
}

function getTurnCredentialUrl() {
  const signalingUrl = new URL(getSignalingUrl());

  if (signalingUrl.protocol === 'wss:') {
    signalingUrl.protocol = 'https:';
  } else if (signalingUrl.protocol === 'ws:') {
    signalingUrl.protocol = 'http:';
  } else {
    throw new Error(`Unsupported signaling protocol: ${signalingUrl.protocol}`);
  }

  signalingUrl.pathname = '/turn-credentials';
  signalingUrl.search = '';
  signalingUrl.hash = '';

  return signalingUrl.toString();
}

function isValidTurnIceServer(iceServer) {
  if (!iceServer || typeof iceServer !== 'object') return F;

  const urls = Array.isArray(iceServer.urls)
    ? iceServer.urls
    : [iceServer.urls];

  if (
    urls.length === 0 ||
    urls.some(
      (url) =>
        typeof url !== 'string' ||
        !/^turns?:/i.test(url),
    )
  ) {
    return F;
  }

  return (
    typeof iceServer.username === 'string' &&
    iceServer.username.length > 0 &&
    typeof iceServer.credential === 'string' &&
    iceServer.credential.length > 0
  );
}

async function requestTurnIceServer() {
  const now = Math.floor(Date.now() / 1000);

  if (
    TURN_CREDENTIAL_CACHE.iceServer &&
    TURN_CREDENTIAL_CACHE.expiresAt >
      now + TURN_CREDENTIAL_REFRESH_MARGIN_SECONDS
  ) {
    return TURN_CREDENTIAL_CACHE.iceServer;
  }

  if (TURN_CREDENTIAL_CACHE.pendingPromise) {
    return TURN_CREDENTIAL_CACHE.pendingPromise;
  }

  const requestPromise = (async () => {
    const controller = new AbortController();

    const timeoutId = setTimeout(
      () => {
        controller.abort();
      },
      TURN_CREDENTIAL_TIMEOUT_MS,
    );

    try {
      const response = await fetch(
        getTurnCredentialUrl(),
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
          cache: 'no-store',
          credentials: 'omit',
          signal: controller.signal,
        },
      );

      if (!response.ok) {
        throw new Error(
          `TURN credential HTTP ${response.status}`,
        );
      }

      const data = await response.json();
      const receivedAt = Math.floor(Date.now() / 1000);

      if (
        !isValidTurnIceServer(data?.iceServer) ||
        !Number.isInteger(data?.expiresAt) ||
        data.expiresAt <= receivedAt
      ) {
        throw new Error('Invalid TURN credential response');
      }

      const iceServer = {
        urls: data.iceServer.urls,
        username: data.iceServer.username,
        credential: data.iceServer.credential,
      };

      TURN_CREDENTIAL_CACHE.iceServer = iceServer;
      TURN_CREDENTIAL_CACHE.expiresAt = data.expiresAt;

      return iceServer;
    } finally {
      clearTimeout(timeoutId);
    }
  })();

  TURN_CREDENTIAL_CACHE.pendingPromise = requestPromise;

  try {
    return await requestPromise;
  } finally {
    if (
      TURN_CREDENTIAL_CACHE.pendingPromise === requestPromise
    ) {
      TURN_CREDENTIAL_CACHE.pendingPromise = null;
    }
  }
}

async function getIceServers() {
  try {
    const turnIceServer = await requestTurnIceServer();

    return [
      STUN_ICE_SERVER,
      turnIceServer,
    ];
  } catch (err) {
    const now = Math.floor(Date.now() / 1000);

    if (
      TURN_CREDENTIAL_CACHE.iceServer &&
      TURN_CREDENTIAL_CACHE.expiresAt > now
    ) {
      console.warn(
        'TURN credential refresh failed. Reusing unexpired credential.',
        err,
      );

      return [
        STUN_ICE_SERVER,
        TURN_CREDENTIAL_CACHE.iceServer,
      ];
    }

    console.warn(
      'TURN credential fetch failed. Falling back to STUN only.',
      err,
    );

    return [
      STUN_ICE_SERVER,
    ];
  }
}

function getImmediateIceServers() {
  const now = Math.floor(Date.now() / 1000);

  if (
    TURN_CREDENTIAL_CACHE.iceServer &&
    TURN_CREDENTIAL_CACHE.expiresAt > now
  ) {
    return [
      STUN_ICE_SERVER,
      TURN_CREDENTIAL_CACHE.iceServer,
    ];
  }

  // 새로고침 복구 경로에서는 TURN credential HTTP 응답을 기다리지 않고
  // RTCPeerConnection을 즉시 만든다. TURN은 아래 background refresh에서 추가한다.
  return [
    STUN_ICE_SERVER,
  ];
}

async function refreshPeerIceServers(pc) {
  try {
    const iceServers = await getIceServers();

    if (
      STATE.pc !== pc ||
      pc.signalingState === 'closed'
    ) {
      return;
    }

    pc.setConfiguration({
      iceServers,
    });

    // 최초 STUN 협상이 아직 연결되지 않았다면 TURN 후보를 반영하도록
    // 짧은 시간 뒤 즉시 ICE restart를 시도한다.
    setTimeout(
      () => {
        if (
          STATE.pc === pc &&
          !isBrowserConnected() &&
          STATE.role === 'impolite' &&
          !STALE_PC_REPLACE_RUNNING &&
          !STALE_PC_REPLACE_TIMER &&
          pc.signalingState !== 'closed'
        ) {
          startFastRejoin();
        }
      },
      250,
    );
  } catch (error) {
    console.warn(
      'ICE server background refresh failed.',
      error,
    );
  }
}

export const KEY = {
  puk: null,
  prk: null,
};

const FNS = {
  deliverToGame: null,
  handleEnvelope: null,
  startGame: null,
};

const BOOTSTRAP = {
  requiresStorage: T,
  storageRequested: F,
  storageReady: F,
  gameStarting: F,
  gameStarted: F,
  pendingSignals: [],
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
  resumeRejected: F,
  peerConnectionStale: F,
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
function isPeerReady() {
  return (
    isBrowserConnected() &&
    isDcOpen() &&
    READY.myHelloSent &&
    READY.peerHelloSeen
  );
}

// 연결 완료를 기다리는 Promise (타임아웃 포함)
// 타임아웃은 진단용일 뿐 bootstrap 자체를 중단시키지 않는다.
function waitConnected(timeoutMs = 5000) {
  if (isPeerReady()) {
    return Promise.resolve(T);
  }

  return new Promise((resolve) => {
    const waiter = (value) => {
      resolve(value);
    };

    READY.waiter = waiter;

    setTimeout(() => {
      if (READY.waiter === waiter) {
        READY.waiter = null;
      }

      resolve(F);
    }, timeoutMs);
  });
}

async function maybeStartGameWhenReady() {
  if (
    BOOTSTRAP.gameStarted ||
    BOOTSTRAP.gameStarting ||
    !isPeerReady()
  ) {
    return;
  }

  if (
    BOOTSTRAP.requiresStorage &&
    !BOOTSTRAP.storageReady
  ) {
    return;
  }

  if (typeof FNS.startGame !== 'function') {
    return;
  }

  BOOTSTRAP.gameStarting = T;

  try {
    console.log('최초 할당 role : ', STATE.initRole);
    await FNS.startGame();
    BOOTSTRAP.gameStarted = T;
  } catch (error) {
    console.error('Game bootstrap failed.', error);
  } finally {
    BOOTSTRAP.gameStarting = F;
  }
}

function watchPeerReady() {
  waitConnected(REJOIN_GRACE_MS).then((ok) => {
    if (!ok) {
      console.warn(
        'Peer not fully ready in time (will keep recovering).',
      );
      return;
    }

    void maybeStartGameWhenReady();
  });
}

function requestBootstrapStorage() {
  if (
    !BOOTSTRAP.requiresStorage ||
    BOOTSTRAP.storageReady ||
    BOOTSTRAP.storageRequested ||
    !STATE.roomId ||
    !STATE.peerId ||
    (
      STATE.initRole !== 'impolite' &&
      STATE.initRole !== 'polite'
    ) ||
    !VARIABLE.gameName ||
    !STATE.ws ||
    STATE.ws.readyState !== WebSocket.OPEN
  ) {
    return;
  }

  BOOTSTRAP.storageRequested = T;

  safeWsSend({
    type: 'requestStorage',
    gameName: VARIABLE.gameName,
    initRole: STATE.initRole,
  });
}

async function ensurePeerConnectionStarted() {
  if (!STATE.pc) {
    await startPeerConnection();
  }

  watchPeerReady();
}

async function flushPendingSignals() {
  if (
    BOOTSTRAP.requiresStorage &&
    !BOOTSTRAP.storageReady
  ) {
    return;
  }

  while (BOOTSTRAP.pendingSignals.length > 0) {
    const msg = BOOTSTRAP.pendingSignals.shift();

    if (!STATE.pc) {
      await startPeerConnection();
    }

    await handleRemoveSignal(msg);
  }
}

export function maybeResolveReady() {
  if (!isPeerReady()) return;

  const firstReady =
    READY.connectedAt === 0;

  READY.connectedAt = Date.now();

  if (READY.waiter) {
    const r = READY.waiter;
    READY.waiter = null;
    r(T);
  }

  if (firstReady) {
    log('✅ Peer READY: both HELLO exchanged & DC open.');
  }

  void maybeStartGameWhenReady();
}

/**
 * ———————————————————————————————————————————————————————————————————
 * WEBSOCKET RETRY
 */
let WS_RETRY = { tries: 0, timer: null };
const WS_RETRY_MAX = 6;
const WS_RETRY_BASE = 200;
const PAGE_EXIT = Object.freeze({
  UNKNOWN: 'unknown',
  RELOAD: 'reload',
  LEAVE: 'leave',
});
export const SESSION_END_REASON = Object.freeze({
  LEAVE: 'leave',
  INVALID_LOCAL: 'invalid-local',
  INVALID_REMOTE: 'invalid-remote',
  NETWORK_LOST: 'network-lost',
});
const SESSION_END_REASONS = new Set(
  Object.values(SESSION_END_REASON),
);
let PAGE_EXIT_MODE = PAGE_EXIT.UNKNOWN;
let PAGE_LEAVING = F;
let SESSION_TERMINATED = F;
let SESSION_END_NOTICE_SENT = F;

function clearWsReconnectTimer() {
  if (!WS_RETRY.timer) return;

  clearTimeout(WS_RETRY.timer);
  WS_RETRY.timer = null;
}

function scheduleWsReconnect() {
  if (PAGE_LEAVING || WS_RETRY.timer) return;
  const t = Math.min(WS_RETRY_MAX, WS_RETRY.tries++);
  const delay = WS_RETRY_BASE * Math.pow(2, t);
  WS_RETRY.timer = setTimeout(() => {
    WS_RETRY.timer = null;
    connectSignaling(T);
  }, delay);
}

function clearResumeSessionState() {
  storageMethod('s', 'REMOVE_ITEM', 'reload');
  storageMethod('s', 'REMOVE_ITEM', 'resumeToken');
  storageMethod('s', 'REMOVE_ITEM', 'roomId');
}

function normalizeSessionEndReason(reason) {
  return SESSION_END_REASONS.has(reason)
    ? reason
    : SESSION_END_REASON.LEAVE;
}

function sendSessionEndNotice(reason) {
  if (
    SESSION_END_NOTICE_SENT ||
    !STATE.dc ||
    STATE.dc.readyState !== 'open'
  ) {
    return F;
  }

  try {
    STATE.dc.send(
      JSON.stringify({
        v: 1,
        t: 'SESSION_END',
        ts: Date.now(),
        payload: {
          reason: normalizeSessionEndReason(reason),
        },
      }),
    );

    SESSION_END_NOTICE_SENT = T;
    return T;
  } catch {
    return F;
  }
}

function closeSessionRealtime(reason) {
  clearWsReconnectTimer();
  clearFastRejoin();
  clearStalePeerReplacement();

  if (STATE.reloadTimer) {
    clearTimeout(STATE.reloadTimer);
    STATE.reloadTimer = null;
  }

  cleanupPeerConnection(F);

  const ws = STATE.ws;
  STATE.ws = null;

  if (!ws) return;

  try {
    if (
      ws.readyState === WebSocket.OPEN ||
      ws.readyState === WebSocket.CONNECTING
    ) {
      ws.close(4000, normalizeSessionEndReason(reason));
    }
  } catch {}
}

export function terminateGameSession({
  reason = SESSION_END_REASON.INVALID_LOCAL,
  notifyPeer = T,
} = {}) {
  if (SESSION_TERMINATED) {
    return F;
  }

  const normalizedReason =
    normalizeSessionEndReason(reason);

  if (notifyPeer) {
    sendSessionEndNotice(normalizedReason);
  }

  SESSION_TERMINATED = T;
  PAGE_LEAVING = T;
  PAGE_EXIT_MODE = PAGE_EXIT.LEAVE;

  clearResumeSessionState();
  closeSessionRealtime(normalizedReason);

  return T;
}

function handleRemoteSessionEnd(reason) {
  if (PAGE_LEAVING || SESSION_TERMINATED) {
    return;
  }

  const normalizedReason =
    normalizeSessionEndReason(reason);

  terminateGameSession({
    reason: normalizedReason,
    notifyPeer: F,
  });

  errorModal(
    normalizedReason === SESSION_END_REASON.INVALID_REMOTE
      ? text.err
      : text.leaveRoom,
    '/selectGame',
  );
}

function handleLocalNetworkOffline() {
  if (PAGE_LEAVING || SESSION_TERMINATED) {
    return;
  }

  terminateGameSession({
    reason: SESSION_END_REASON.NETWORK_LOST,
    notifyPeer: T,
  });

  errorModal(text.networkLost, '/selectGame');
}

/**
 * ———————————————————————————————————————————————————————————————————
 * ICE RESTART
 */
let ICE_RESTART_TIMER = null;
let FAST_REJOIN_TIMER = null;
let FAST_REJOIN_INDEX = 0;
let STALE_PC_REPLACE_TIMER = null;
let STALE_PC_REPLACE_INDEX = 0;
let STALE_PC_REPLACE_RUNNING = F;

const ICE_RESTART_DEBOUNCE = 100;
const STALE_PC_REPLACE_DELAYS = [
  0,
  300,
  700,
  1500,
];
const FAST_REJOIN_DELAYS = [
  0,
  200,
  500,
  1000,
  2000,
];

function clearFastRejoin() {
  if (FAST_REJOIN_TIMER) {
    clearTimeout(FAST_REJOIN_TIMER);
    FAST_REJOIN_TIMER = null;
  }

  FAST_REJOIN_INDEX = 0;
}

function clearStalePeerReplacement() {
  if (STALE_PC_REPLACE_TIMER) {
    clearTimeout(STALE_PC_REPLACE_TIMER);
    STALE_PC_REPLACE_TIMER = null;
  }

  STALE_PC_REPLACE_INDEX = 0;
}

async function runStalePeerReplacementAttempt() {
  if (
    STATE.role !== 'impolite' ||
    STATE.ws?.readyState !== WebSocket.OPEN ||
    !STATE.partnerId ||
    isDcOpen()
  ) {
    clearStalePeerReplacement();
    return;
  }

  if (STALE_PC_REPLACE_RUNNING) {
    return;
  }

  STALE_PC_REPLACE_RUNNING = T;

  try {
    // 상대 polite Peer가 reload되면 기존 ICE/DTLS 세션을 재사용하지 않는다.
    // old RTCPeerConnection을 통째로 버리고 새 active DataChannel을 가진
    // 새 RTCPeerConnection으로 즉시 offer를 만든다.
    await startPeerConnection();
  } catch (error) {
    console.error(
      'Stale PeerConnection replacement failed:',
      error,
    );
  } finally {
    STALE_PC_REPLACE_RUNNING = F;
  }

  if (
    STATE.ws?.readyState !== WebSocket.OPEN ||
    !STATE.partnerId ||
    isDcOpen()
  ) {
    clearStalePeerReplacement();
    return;
  }

  STALE_PC_REPLACE_INDEX += 1;

  if (
    STALE_PC_REPLACE_INDEX >=
    STALE_PC_REPLACE_DELAYS.length
  ) {
    STALE_PC_REPLACE_TIMER = null;
    return;
  }

  STALE_PC_REPLACE_TIMER =
    setTimeout(
      () => {
        STALE_PC_REPLACE_TIMER = null;
        void runStalePeerReplacementAttempt();
      },
      STALE_PC_REPLACE_DELAYS[
        STALE_PC_REPLACE_INDEX
      ],
    );
}

function startStalePeerReplacement() {
  clearStalePeerReplacement();

  if (
    STATE.role !== 'impolite' ||
    STATE.ws?.readyState !== WebSocket.OPEN ||
    !STATE.partnerId ||
    isDcOpen()
  ) {
    return;
  }

  STALE_PC_REPLACE_INDEX = 0;
  void runStalePeerReplacementAttempt();
}

function ensureActiveDataChannel() {
  const pc = STATE.pc;

  if (
    !pc ||
    STATE.role !== 'impolite' ||
    pc.signalingState === 'closed'
  ) {
    return;
  }

  if (
    STATE.dc &&
    STATE.dc.readyState !== 'closed'
  ) {
    return;
  }

  STATE.dc = pc.createDataChannel(
    gameId(),
  );

  attachDataChannelHandlers(
    STATE.dc,
    'active-dc',
  );
}

async function doIceRestart() {
  const pc = STATE.pc;

  if (
    !pc ||
    STATE.role !== 'impolite' ||
    pc.signalingState === 'closed' ||
    STATE.makingOffer ||
    pc.signalingState !== 'stable'
  ) {
    return F;
  }

  log('ICE Restart: creating new offer with iceRestart:true');

  try {
    STATE.makingOffer = T;

    const offer =
      await pc.createOffer({
        iceRestart: T,
      });

    await pc.setLocalDescription(
      offer,
    );

    sendSignal(
      STATE.partnerId,
      {
        sdp:
          pc.localDescription,
      },
    );

    return T;
  } finally {
    STATE.makingOffer = F;
  }
}

function debounceIceRestart() {
  if (ICE_RESTART_TIMER) {
    clearTimeout(
      ICE_RESTART_TIMER,
    );
  }

  ICE_RESTART_TIMER =
    setTimeout(
      () => {
        ICE_RESTART_TIMER = null;

        doIceRestart()
          .catch(
            (err) =>
              console.error(
                'ICE restart failed:',
                err,
              ),
          );
      },
      ICE_RESTART_DEBOUNCE,
    );
}

function runFastRejoinAttempt() {
  if (
    STATE.role !== 'impolite' ||
    !STATE.pc ||
    STATE.pc.signalingState === 'closed' ||
    isDcOpen()
  ) {
    clearFastRejoin();
    return;
  }

  ensureActiveDataChannel();

  doIceRestart()
    .catch(
      (error) => {
        console.error(
          'Fast rejoin ICE restart failed:',
          error,
        );
      },
    );

  FAST_REJOIN_INDEX += 1;

  if (
    FAST_REJOIN_INDEX >=
    FAST_REJOIN_DELAYS.length
  ) {
    FAST_REJOIN_TIMER = null;
    return;
  }

  FAST_REJOIN_TIMER =
    setTimeout(
      runFastRejoinAttempt,
      FAST_REJOIN_DELAYS[
        FAST_REJOIN_INDEX
      ],
    );
}

function startFastRejoin() {
  clearFastRejoin();

  if (
    STATE.role !== 'impolite' ||
    !STATE.pc ||
    STATE.pc.signalingState === 'closed'
  ) {
    return;
  }

  FAST_REJOIN_INDEX = 0;

  // 첫 재협상은 기다리지 않고 같은 tick에서 시작한다.
  runFastRejoinAttempt();
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
  // console.log('ackUntil 진입', seq);
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
  handleRemoteSessionEnd(SESSION_END_REASON.LEAVE);
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
 * BROWSER PAGE LIFECYCLE
 */
function markReloadExit() {
  PAGE_EXIT_MODE = PAGE_EXIT.RELOAD;

  if (
    STATE.partnerId ||
    window.sessionStorage.getItem('resumeToken')
  ) {
    // DataChannel이 아직 재개되지 않은 순간에 연속 새로고침을 해도
    // resumeToken이 남아 있으면 기존 게임 상태를 reload 복구로 취급한다.
    storageMethod('s', 'SET_ITEM', 'reload', T);
  }
}

function markLeaveExit() {
  PAGE_EXIT_MODE = PAGE_EXIT.LEAVE;

  // 새로고침이 아닌 실제 페이지 이탈은 DataChannel이 살아 있는 동안
  // 상대에게 즉시 알려 server grace/ICE timeout을 기다리지 않게 한다.
  sendSessionEndNotice(SESSION_END_REASON.LEAVE);

  // 뒤로가기/다른 페이지 이동은 기존 room을 다시 resume하면 안 된다.
  // 게임별 나머지 세션 상태는 목적지 페이지의 clearStorage()가 정리한다.
  clearResumeSessionState();
}

function closeRealtimeConnectionsForPageHide() {
  PAGE_LEAVING = T;
  clearWsReconnectTimer();

  // BFCache에 들어가는 페이지가 이전 WebRTC/DataChannel을
  // 그대로 보유하지 않도록 즉시 정리한다.
  cleanupPeerConnection(F);

  const ws = STATE.ws;
  STATE.ws = null;

  if (!ws) return;

  try {
    if (
      ws.readyState === WebSocket.OPEN ||
      ws.readyState === WebSocket.CONNECTING
    ) {
      ws.close(1000, PAGE_EXIT_MODE);
    }
  } catch {}
}

window.addEventListener('offline', handleLocalNetworkOffline);

if (getDeviceType() === 'PC') {
  // Navigation API는 reload와 back/forward(traverse)를 정확히 구분한다.
  // 지원 브라우저에서는 페이지가 사라지기 전에 exit 의도를 먼저 기록한다.
  if (window.navigation) {
    window.navigation.addEventListener('navigate', (event) => {
      if (event.hashChange) return;

      if (event.navigationType === 'reload') {
        markReloadExit();
        return;
      }

      markLeaveExit();
    });
  }

  window.addEventListener('pagehide', (event) => {
    // Navigation API 미지원 브라우저용 fallback.
    // BFCache 진입은 명백한 페이지 이탈이고, 그 외에는 기존 reload 복구를 보존한다.
    if (PAGE_EXIT_MODE === PAGE_EXIT.UNKNOWN) {
      if (event.persisted) {
        markLeaveExit();
      } else {
        markReloadExit();
      }
    }

    closeRealtimeConnectionsForPageHide();
  });
}

/**
 * ———————————————————————————————————————————————————————————————————
 * PERFECT NEGOTIATION
 */
function attachDataChannelHandlers(dc, tag) {
  dc.onopen = () => {
    log(`DataChannel[${tag}] open`);
    STATE.peerConnectionStale = F;
    clearFastRejoin();
    clearStalePeerReplacement();

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
    maybeResolveReady();
  };
  dc.onmessage = (ev) => {
    let msg;
    try {
      msg = JSON.parse(ev.data);
    } catch {
      return;
    }
    if (msg?.v === 1 && msg.t === 'SESSION_END') {
      handleRemoteSessionEnd(msg?.payload?.reason);
      return;
    }

    // handleEnvelope(msg);
    FNS.handleEnvelope(msg);
  };
  dc.onclose = () => {
    log(`DataChannel[${tag}] close`);

    // stopPingLoop();
    stopResendLoop();

    if (STATE.dc === dc) {
      STATE.dc = null;
      STATE.peerConnectionStale = T;
    }

    if (
      STATE.role === 'impolite' &&
      STATE.pc?.connectionState !== 'closed'
    ) {
      // 상대 polite Peer가 reload된 경우 old RTCPeerConnection 자체가 stale이다.
      // ICE restart로 old PC를 재사용하지 말고 새 PC + active DC를 즉시 만든다.
      startStalePeerReplacement();
    }

    reloadConnectCheck();
  };
}
function cleanupPeerConnection(logIt = T) {
  clearFastRejoin();

  if (STALE_PC_REPLACE_TIMER) {
    clearTimeout(STALE_PC_REPLACE_TIMER);
    STALE_PC_REPLACE_TIMER = null;
  }

  if (ICE_RESTART_TIMER) {
    clearTimeout(
      ICE_RESTART_TIMER,
    );
    ICE_RESTART_TIMER = null;
  }

  if (STATE.dc) {
    try {
      // 의도적인 PC cleanup은 remote reload 감지로 취급하면 안 된다.
      STATE.dc.onclose = null;
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
  if (PEER_CONNECTION_START_PROMISE) {
    return PEER_CONNECTION_START_PROMISE;
  }

  PEER_CONNECTION_START_PROMISE = (async () => {
    cleanupPeerConnection(F);

    const pc = new RTCPeerConnection({
      iceServers:
        getImmediateIceServers(),
    });

    STATE.pc = pc;
    STATE.peerConnectionStale = F;

    // TURN credential fetch가 느려도 새로고침 재연결을 막지 않는다.
    // STUN으로 즉시 협상을 시작하고, TURN 구성은 background로 갱신한다.
    void refreshPeerIceServers(
      pc,
    );

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
      if (
        STATE.role !== 'impolite' ||
        STATE.makingOffer ||
        pc.signalingState !== 'stable'
      ) {
        return;
      }

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

      if (pc.connectionState === 'connected') {
        maybeResolveReady();
      }
    };
    pc.oniceconnectionstatechange = () => {
      log('iceConnectionState', pc.iceConnectionState);

      if (
        pc.iceConnectionState ===
          'failed'
      ) {
        if (
          STATE.role ===
            'impolite' &&
          !STALE_PC_REPLACE_RUNNING &&
          !STALE_PC_REPLACE_TIMER
        ) {
          startFastRejoin();
        }
      } else if (
        pc.iceConnectionState ===
          'disconnected'
      ) {
        if (
          STATE.role ===
            'impolite' &&
          !STALE_PC_REPLACE_RUNNING &&
          !STALE_PC_REPLACE_TIMER
        ) {
          debounceIceRestart();
        }
      }
    };
  })();

  try {
    await PEER_CONNECTION_START_PROMISE;
  } finally {
    PEER_CONNECTION_START_PROMISE = null;
  }
}

async function handleRemoveSignal(msg) {

  try {
    const data = msg.data;

    // 상대가 새로고침되면 살아남은 polite Peer의 기존 DataChannel은
    // 먼저 close되지만 RTCPeerConnection 자체는 브라우저 내부에 남아 있다.
    // 그 old PC에 새 offer를 계속 적용하면 ICE/DTLS 복구가 수 초 지연될 수 있다.
    // 한 번 정상 연결됐던 DC가 닫힌 뒤 새 offer가 들어온 경우에만
    // old PC를 폐기하고 새 RTCPeerConnection으로 즉시 교체한다.
    if (
      data?.sdp?.type === 'offer' &&
      STATE.role === 'polite' &&
      STATE.peerConnectionStale
    ) {
      await startPeerConnection();
    }

    const pc = STATE.pc;
    if (!pc) return;

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
    STATE.isSettingRemoteAnswerPending = F;
    console.error('handleRemoveSignal error : ', err);
  }
}

/**
 * ———————————————————————————————————————————————————————————————————
 * CONNECT SIGNALING
 */
export function connectSignaling(connected = F, fns) {
  const restoredAfterPageLeave = PAGE_LEAVING;

  PAGE_LEAVING = F;
  PAGE_EXIT_MODE = PAGE_EXIT.UNKNOWN;
  SESSION_TERMINATED = F;
  SESSION_END_NOTICE_SENT = F;

  if (
    restoredAfterPageLeave &&
    !window.sessionStorage.getItem('resumeToken')
  ) {
    // BFCache로 이전 game document 자체가 복원된 경우에도
    // 새 room join에 이전 document의 peer identity가 섞이지 않게 한다.
    STATE.roomId = null;
    STATE.peerId = null;
    STATE.role = null;
    STATE.initRole = null;
    STATE.partnerId = null;
    STATE.resumeRejected = F;
    STATE.peerConnectionStale = F;

    KEY.puk = null;
    KEY.prk = null;

    BOOTSTRAP.storageRequested = F;
    BOOTSTRAP.storageReady = F;
    BOOTSTRAP.gameStarting = F;
    BOOTSTRAP.gameStarted = F;
    BOOTSTRAP.pendingSignals.length = 0;

    PEER_CONNECTION_START_PROMISE = null;
    R.set(F);
    resetReliableLayer();
  }

  if (fns && fns.deliverToGame && fns.handleEnvelope) {
    FNS.deliverToGame = fns.deliverToGame;
    FNS.handleEnvelope = fns.handleEnvelope;
    FNS.startGame = fns.startGame;
    VARIABLE.gameName = fns.gameName;
    BOOTSTRAP.requiresStorage = fns.requiresStorage !== F;
  }

  if (
    STATE.ws &&
    (
      STATE.ws.readyState === WebSocket.OPEN ||
      STATE.ws.readyState === WebSocket.CONNECTING
    )
  ) {
    return;
  }

  // ----- WebSocket signaling -----
  const WS_URL = getSignalingUrl();
  const ws = new WebSocket(WS_URL);
  STATE.ws = ws;

  ws.addEventListener('open', () => {
    log(connected ? 'WS reconnected.' : 'WS connected.');
    WS_RETRY.tries = 0;
    if (WS_RETRY.timer) {
      clearTimeout(WS_RETRY.timer);
      WS_RETRY.timer = null;
    }

    const resumeToken =
      window.sessionStorage.getItem('resumeToken');

    // 현재 분산 Signaling Server의 재접속 계약은 roomHint가 아니라
    // 서버가 발급한 resumeToken이다. 토큰이 있을 때만 해당 필드를 보낸다.
    // fresh join에서는 resumeToken 속성 자체를 보내지 않아야 한다.
    if (resumeToken) {
      safeWsSend({
        type: 'join',
        resumeToken,
      });
      return;
    }

    safeWsSend({
      type: 'join',
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

        if (STATE.role === 'impolite' || STATE.role === 'polite') {
          // fresh join과 resume join 모두 서버가 보장한 role을 기준으로 한다.
          STATE.initRole = STATE.role;
        }

        if (
          typeof msg.resumeToken === 'string' &&
          msg.resumeToken.length > 0
        ) {
          // resumeToken 값은 로그로 출력하지 않는다.
          storageMethod(
            's',
            'SET_ITEM',
            'resumeToken',
            msg.resumeToken,
          );
        }

        // 이전 roomHint 방식의 잔여 데이터는 더 이상 사용하지 않는다.
        storageMethod('s', 'REMOVE_ITEM', 'roomId');

        log(`Assigned room=${STATE.roomId}, me=${STATE.peerId}, role=${STATE.role}`);
        break;
      }
      case 'paired': {
        if (msg.roomId !== STATE.roomId) return;
        if (msg.you?.peerId === STATE.peerId) {
          STATE.role = msg.you.role;
          STATE.partnerId = msg.partner.peerId;

          // room-assigned에서 role을 설정하지만 메시지 순서 경합에 대비해
          // paired에서도 한 번 더 보정한다.
          if (STATE.initRole !== 'impolite' && STATE.initRole !== 'polite') {
            STATE.initRole = STATE.role;
          }
          log(`Paired! me(${STATE.role}) <-> partner(${msg.partner.peerId}/${msg.partner.role})`);

          if (BOOTSTRAP.requiresStorage) {
            // storage/keypair를 먼저 확보한 뒤 RTCPeerConnection을 시작한다.
            // reload 시 DataChannel이 늦게 복구되더라도 KEY.prk가 먼저 준비되어
            // 게임 메시지가 keypair보다 앞서 도착하는 race를 막는다.
            requestBootstrapStorage();

            if (BOOTSTRAP.storageReady) {
              await ensurePeerConnectionStarted();
              await flushPendingSignals();
            }

            break;
          }

          await ensurePeerConnectionStarted();
        }

        break;
      }
      case 'resume-rejected': {
        STATE.resumeRejected = T;
        storageMethod('s', 'REMOVE_ITEM', 'resumeToken');
        storageMethod('s', 'REMOVE_ITEM', 'roomId');
        console.warn(
          'Signaling resume rejected.',
          msg?.reason ?? 'unknown',
        );
        break;
      }
      case 'partner-left': {
        if (msg.roomId !== STATE.roomId || PAGE_LEAVING) return;

        console.log('Partner Lefted...');
        handleRemoteSessionEnd(SESSION_END_REASON.LEAVE);
        break;
      }
      case 'signal': {
        if (
          BOOTSTRAP.requiresStorage &&
          !BOOTSTRAP.storageReady
        ) {
          // 상대가 storage 응답보다 먼저 offer/candidate를 보낸 경우
          // keypair 준비 전 DataChannel이 열리지 않도록 signaling만 잠시 보관한다.
          if (BOOTSTRAP.pendingSignals.length < 256) {
            BOOTSTRAP.pendingSignals.push(msg);
          } else {
            console.warn(
              'Too many pending signaling messages before storage bootstrap.',
            );
          }
          break;
        }

        if (!STATE.pc) {
          await startPeerConnection();
          watchPeerReady();
        }

        await handleRemoveSignal(msg);
        break;
      }
      case 'responseStorage': {
        if (
          msg?.storageData &&
          msg?.keypair &&
          !BOOTSTRAP.storageReady
        ) {
          KEY.puk = msg.keypair.puk;
          KEY.prk = msg.keypair.prk;

          await insertStorageDate(msg.storageData);

          BOOTSTRAP.storageReady = T;
          BOOTSTRAP.storageRequested = F;

          await ensurePeerConnectionStarted();
          await flushPendingSignals();
          await maybeStartGameWhenReady();
        }
        break;
      }
      case 'storage-unavailable': {
        BOOTSTRAP.storageRequested = F;
        console.warn(
          'Signaling storage bootstrap unavailable.',
          msg?.gameName ?? VARIABLE.gameName,
        );
        break;
      }
      default: {
        break;
      }
    }
  });
  ws.addEventListener('close', (ev) => {
    const isCurrentSocket = STATE.ws === ws;

    if (isCurrentSocket) {
      STATE.ws = null;
    }

    log('WS closed.', ev.code, ev.reason);

    if (
      BOOTSTRAP.requiresStorage &&
      !BOOTSTRAP.storageReady
    ) {
      BOOTSTRAP.storageRequested = F;
    }

    // pagehide에서 의도적으로 닫았거나 이미 교체된 stale socket이면
    // BFCache 안의 이전 페이지가 다시 매칭 대기열에 들어오지 않게 한다.
    if (!isCurrentSocket || PAGE_LEAVING) {
      return;
    }

    if (!navigator.onLine) {
      handleLocalNetworkOffline();
      return;
    }

    if (
      ev.code === 4000 &&
      SESSION_END_REASONS.has(ev.reason)
    ) {
      return;
    }

    if (STATE.resumeRejected) {
      STATE.resumeRejected = F;
      return;
    }

    log('Scheduling WS reconnect...', ev.code, ev.reason);
    scheduleWsReconnect();
  });
  ws.addEventListener('error', () => {
    try {
      ws.close();
    } catch {}
  });
}
