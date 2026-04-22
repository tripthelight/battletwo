import findCharCode from '@/client/js/functions/findCharCode';
import findCharDecCode from '@/client/js/functions/findCharDecCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { request } from '@/client/js/network/blackAndWhite1/request';

const STATE_CODE_POINTS = {
  waitEnemy: [66, 81, 78, 88, 74, 80, 70, 65, 90, 71],
  ready: [72, 76, 74, 83, 79, 77, 84, 73, 69, 65],
  waitEnemyShuffle: [67, 86, 80, 69, 76, 66, 77, 73, 72, 71],
  setOrder: [65, 71, 81, 72, 85, 75, 78, 74, 86, 73],
  playing: [75, 68, 67, 71, 82, 87, 74, 73, 66, 78],
  gameOver: [67, 68, 72, 69, 90, 77, 80, 81, 75, 85],
};

const gameStateKey = () => findCharCode([89, 79, 69, 71, 82, 83, 87, 75, 86, 85]);
const syncMap = new Map();
const SYNC_RESEND_MS = 500;

const getStateCodePoints = (stateName) => {
  const codePoints = STATE_CODE_POINTS[stateName];
  if (!codePoints) {
    throw throwObj('dataManipulation', `unknown gameState sync target: ${stateName}`);
  }
  return codePoints;
};

const getSyncEntry = (proofCode) => {
  if (!syncMap.has(proofCode)) {
    syncMap.set(proofCode, {
      stateName: null,
      local: false,
      remote: false,
      committed: false,
      commit: null,
      resendTimer: null,
    });
  }
  return syncMap.get(proofCode);
};

const stopSyncResend = (entry) => {
  if (!entry?.resendTimer) return;
  clearInterval(entry.resendTimer);
  entry.resendTimer = null;
};

const sendSyncProof = (stateName, syncAck = false) => {
  request('gameStateSync', {
    stateCode: publicGameStateProof(stateName),
    syncAck,
  });
};

const startSyncResend = (proofCode, stateName) => {
  const entry = getSyncEntry(proofCode);
  if (entry.resendTimer || entry.committed) return;

  entry.resendTimer = setInterval(() => {
    if (entry.committed) {
      stopSyncResend(entry);
      return;
    }

    sendSyncProof(stateName);
  }, SYNC_RESEND_MS);
};

const flushSyncEntry = (proofCode) => {
  const entry = getSyncEntry(proofCode);
  if (!entry.local || !entry.remote || entry.committed || typeof entry.commit !== 'function') return;

  entry.committed = true;
  stopSyncResend(entry);
  entry.commit();
};

export const localGameStateValue = (stateName) => findCharCode(getStateCodePoints(stateName));

export const publicGameStateProof = (stateName) => findCharDecCode(getStateCodePoints(stateName));

export const isLocalGameState = (stateName) => {
  return storageMethod('s', 'GET_ITEM', gameStateKey()) === localGameStateValue(stateName);
};

export const isGameStateProof = (stateName, proofCode) => {
  if (!proofCode) return false;
  return proofCode === publicGameStateProof(stateName);
};

export const stateNameFromProof = (proofCode) => {
  if (!proofCode) return null;

  return Object.keys(STATE_CODE_POINTS).find((stateName) => isGameStateProof(stateName, proofCode)) ?? null;
};

export const syncGameStateEntry = (stateName, commit) => {
  const proofCode = publicGameStateProof(stateName);
  const entry = getSyncEntry(proofCode);

  entry.stateName = stateName;
  entry.local = true;
  entry.commit = commit;

  sendSyncProof(stateName);
  startSyncResend(proofCode, stateName);
  flushSyncEntry(proofCode);
};

export const receiveGameStateSync = (data) => {
  const proofCode = data?.stateCode;
  const stateName = stateNameFromProof(proofCode);

  if (!stateName) {
    throw throwObj('dataManipulation', 'gameStateSync - state proof failed.');
  }

  const entry = getSyncEntry(proofCode);
  entry.stateName = stateName;
  entry.remote = true;

  if (data?.syncAck !== true && (entry.local || entry.committed || isLocalGameState(stateName))) {
    sendSyncProof(stateName, true);
  }

  flushSyncEntry(proofCode);
};
