const pendingPayloads = [];

let ready = false;
let replayPayload = null;

const MAX_PENDING_PAYLOADS = 200;
const BOOTSTRAP_SAFE_TYPES = new Set(['ROUND/START']);

function flushPendingPayloads() {
  if (!ready || typeof replayPayload !== 'function' || pendingPayloads.length === 0) return;

  const payloads = pendingPayloads.splice(0, pendingPayloads.length);
  for (const item of payloads) {
    replayPayload(item.payload, { ...item.meta, replayedAfterBootstrap: true });
  }
}

export function registerPayloadReplay(fn) {
  replayPayload = fn;
  flushPendingPayloads();
}

export function markGamePayloadReady() {
  ready = true;
  flushPendingPayloads();
}

export function resetGamePayloadBootstrap() {
  ready = false;
  pendingPayloads.length = 0;
}

export function shouldDeferGamePayload(payload) {
  if (!payload || typeof payload.type !== 'string') return false;
  if (BOOTSTRAP_SAFE_TYPES.has(payload.type)) return false;

  return !ready;
}

export function deferGamePayload(payload, meta) {
  if (pendingPayloads.length >= MAX_PENDING_PAYLOADS) {
    pendingPayloads.shift();
  }

  pendingPayloads.push({ payload, meta });
}
