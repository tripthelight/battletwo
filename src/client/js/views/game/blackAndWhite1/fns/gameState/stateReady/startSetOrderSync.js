import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import { request } from '@/client/js/network/blackAndWhite1/request';
import gameState from '@/client/js/gameState/blackAndWhite1';
import {
  publicGameStateProof,
  syncGameStateEntry
} from '@/client/js/views/game/blackAndWhite1/fns/common/gameStateSync';

const KEY = {
  myShuffleState: () => findCharCode([80, 72, 73, 74, 89, 86, 83, 66, 69, 87]),
  enemyShuffleState: () => findCharCode([66, 79, 83, 65, 89, 81, 74, 68, 87, 70]),
  enemyNick: () => findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90]),
  firstUser: () => findCharCode([73, 81, 90, 83, 68, 86, 69, 89, 78, 70]),
};

let setOrderStartSent = false;

const encryptedTrue = () => X.enc(decodeTF(_t([107, 119, 112, 117]))); // "kwpu" : true

const readEncryptedBool = (key) => {
  const value = storageMethod('s', 'GET_ITEM', key);
  if (!value) return false;

  try {
    return X.dec(value);
  } catch {
    return false;
  }
};

const hasLocalShuffleReady = () => readEncryptedBool(KEY.myShuffleState());
const hasEnemyShuffleReady = () => readEncryptedBool(KEY.enemyShuffleState());

export const announceLocalShuffleReady = () => {
  if (!hasLocalShuffleReady()) return false;

  request('startCheck', {
    rdyCode: publicGameStateProof('setOrder'),
    nick: getLocalPlayer(),
  });

  return true;
};

export const markEnemyShuffleReady = (nick) => {
  storageMethod('s', 'SET_ITEM', KEY.enemyShuffleState(), encryptedTrue());

  if (nick) {
    storageMethod('s', 'SET_ITEM', KEY.enemyNick(), nick);
  }
};

const getLocalPlayer = () => storageMethod('l', 'GET_ITEM', 'localPlayer');
const getEnemyNick = () => storageMethod('s', 'GET_ITEM', KEY.enemyNick());

const isSetOrderCoordinator = () => {
  const localPlayer = getLocalPlayer();
  const enemyNick = getEnemyNick();

  if (!localPlayer || !enemyNick) return false;
  return localPlayer < enemyNick;
};

const getOrCreateFirstUser = () => {
  const firstUserKey = KEY.firstUser();
  const savedFirstUser = storageMethod('s', 'GET_ITEM', firstUserKey);
  if (savedFirstUser) return savedFirstUser;

  const users = [getLocalPlayer(), getEnemyNick()].filter(Boolean);
  const firstUser = users[Math.floor(Math.random() * users.length)];
  if (firstUser) {
    storageMethod('s', 'SET_ITEM', firstUserKey, firstUser);
  }

  return firstUser;
};

export const enterSetOrderWhenSynced = () => {
  syncGameStateEntry('setOrder', () => {
    gameState.setOrder();
  });
};

const announceSetOrderStart = (firstUser) => {
  if (!firstUser) return false;

  request('startState', {
    statCode: publicGameStateProof('setOrder'),
    firstUser,
  });

  return true;
};

export const receiveSetOrderStart = (firstUser) => {
  if (!firstUser) return;

  storageMethod('s', 'SET_ITEM', KEY.firstUser(), firstUser);

  storageMethod('s', 'SET_ITEM', KEY.enemyShuffleState(), encryptedTrue());
  enterSetOrderWhenSynced();
};

export const resumeShuffleReadyAfterReload = () => {
  announceLocalShuffleReady();
  return tryStartSetOrder({ keepWaiting: false });
};

export const resumeSetOrderAfterReload = () => {
  const firstUser = storageMethod('s', 'GET_ITEM', KEY.firstUser());
  if (!firstUser) return false;

  setOrderStartSent = true;
  announceSetOrderStart(firstUser);
  syncGameStateEntry('setOrder', () => {});
  return true;
};

export const tryStartSetOrder = ({ keepWaiting = true } = {}) => {
  if (!hasLocalShuffleReady()) return false;

  if (!hasEnemyShuffleReady() || !getEnemyNick()) {
    if (keepWaiting) gameState.waitEnemyShuffle();
    return false;
  }

  if (!isSetOrderCoordinator()) {
    const firstUser = storageMethod('s', 'GET_ITEM', KEY.firstUser());
    if (firstUser) enterSetOrderWhenSynced();
    else if (keepWaiting) gameState.waitEnemyShuffle();
    return false;
  }

  const firstUser = getOrCreateFirstUser();
  if (!firstUser) {
    if (keepWaiting) gameState.waitEnemyShuffle();
    return false;
  }

  if (!setOrderStartSent) {
    setOrderStartSent = true;
    announceSetOrderStart(firstUser);
  }

  enterSetOrderWhenSynced();
  return true;
};
