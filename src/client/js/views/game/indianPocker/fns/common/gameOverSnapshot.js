import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';

export const GAME_OVER_SNAPSHOT_KEY = 'indianPocker.gameOverSnapshot.v1';
export const RESULT_RECORDED_KEY = 'indianPocker.resultRecorded.v1';

const RESULT_KEY_CHARS = Object.freeze([
  79, 85, 77, 74, 71, 78, 80, 67, 81, 72,
]);

const COINS_PLAYER_KEY_CHARS = Object.freeze([
  81, 67, 69, 68, 71, 77, 83, 90, 65, 74,
]);

const COINS_ENEMY_KEY_CHARS = Object.freeze([
  83, 78, 84, 68, 66, 80, 71, 65, 67, 87,
]);

function isValidCoinCount(value) {
  return Number.isInteger(value) && value >= 0;
}

function parseSnapshot(rawValue) {
  if (!rawValue) return null;

  try {
    const snapshot = JSON.parse(rawValue);

    if (
      snapshot?.version !== 1 ||
      typeof snapshot.result !== 'boolean' ||
      !isValidCoinCount(snapshot.coinsPlayer) ||
      !isValidCoinCount(snapshot.coinsEnemy)
    ) {
      return null;
    }

    return snapshot;
  } catch {
    return null;
  }
}

export function loadGameOverSnapshot() {
  return parseSnapshot(
    window.sessionStorage.getItem(GAME_OVER_SNAPSHOT_KEY),
  );
}

export function hasGameOverSnapshot() {
  return loadGameOverSnapshot() !== null;
}

export function hasEncryptedGameStorage() {
  return Boolean(KEY.prk);
}

function readEncryptedResult() {
  if (!hasEncryptedGameStorage()) return null;

  try {
    const resultKey = findCharCode(RESULT_KEY_CHARS);
    const encryptedResult = window.sessionStorage.getItem(resultKey);

    if (encryptedResult === null || encryptedResult === '') {
      return null;
    }

    const result = X.dec(encryptedResult);
    return typeof result === 'boolean' ? result : null;
  } catch {
    return null;
  }
}

function readEncryptedCoinCount(keyChars) {
  if (!hasEncryptedGameStorage()) return null;

  try {
    const storageKey = findCharCode(keyChars);
    const encryptedValue = window.sessionStorage.getItem(storageKey);

    if (encryptedValue === null || encryptedValue === '') {
      return null;
    }

    const value = Number(dec(encryptedValue));

    if (!Number.isFinite(value) || value < 0) {
      return null;
    }

    return Math.trunc(value);
  } catch {
    return null;
  }
}

export function saveGameOverSnapshot() {
  const result = readEncryptedResult();
  const coinsPlayer = readEncryptedCoinCount(COINS_PLAYER_KEY_CHARS);
  const coinsEnemy = readEncryptedCoinCount(COINS_ENEMY_KEY_CHARS);

  if (
    typeof result !== 'boolean' ||
    !isValidCoinCount(coinsPlayer) ||
    !isValidCoinCount(coinsEnemy)
  ) {
    return false;
  }

  window.sessionStorage.setItem(
    GAME_OVER_SNAPSHOT_KEY,
    JSON.stringify({
      version: 1,
      result,
      coinsPlayer,
      coinsEnemy,
    }),
  );

  return true;
}

export function getGameOverResult() {
  const encryptedResult = readEncryptedResult();

  if (typeof encryptedResult === 'boolean') {
    return encryptedResult;
  }

  return loadGameOverSnapshot()?.result ?? null;
}

export function getGameOverCoinsPlayer() {
  const encryptedCoinsPlayer = readEncryptedCoinCount(
    COINS_PLAYER_KEY_CHARS,
  );

  if (isValidCoinCount(encryptedCoinsPlayer)) {
    return encryptedCoinsPlayer;
  }

  return loadGameOverSnapshot()?.coinsPlayer ?? null;
}

export function getGameOverCoinsEnemy() {
  const encryptedCoinsEnemy = readEncryptedCoinCount(
    COINS_ENEMY_KEY_CHARS,
  );

  if (isValidCoinCount(encryptedCoinsEnemy)) {
    return encryptedCoinsEnemy;
  }

  return loadGameOverSnapshot()?.coinsEnemy ?? null;
}
