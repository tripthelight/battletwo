import findNickname from '@/client/js/functions/findNickname';
import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import {
  MAX_NICKNAME_LENGTH,
  STORAGE_KEYS,
} from '@/client/js/views/game/findTheSamePicture/fns/common/variable';

export function safeJsonParse(value, fallback = null) {
  if (typeof value !== 'string' || value.length === 0) {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function createId() {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export function getOrCreateClientId() {
  let clientId = window.sessionStorage.getItem(STORAGE_KEYS.clientId);

  if (!clientId) {
    clientId = createId();
    window.sessionStorage.setItem(STORAGE_KEYS.clientId, clientId);
  }

  return clientId;
}

export function getLocalNickname() {
  if (runtime.localNickname) {
    return runtime.localNickname;
  }

  const nickname = findNickname('localPlayer')
    .trim()
    .slice(0, MAX_NICKNAME_LENGTH);

  if (!nickname) {
    throw new Error(
      '[findTheSamePicture] localPlayer nickname is missing.',
    );
  }

  runtime.localNickname = nickname;
  return runtime.localNickname;
}

export function randomInt(max) {
  return Math.floor(Math.random() * max);
}

export function shuffleCopy(source) {
  const list = source.slice();

  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [list[i], list[j]] = [list[j], list[i]];
  }

  return list;
}
