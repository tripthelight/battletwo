import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import { hasEnemyBeforeCube } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/enemyBeforeCube';
import { hasAfterPlayerNum } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/afterPlayerCube';

export const turnKeys = {
  firstUser: () => findCharCode([73, 81, 90, 83, 68, 86, 69, 89, 78, 70]),
  activeUser: () => findCharCode([73, 71, 65, 80, 77, 75, 84, 66, 85, 82]),
  enemyNick: () => findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90]),
  beforePlayerNum: () => findCharCode([65, 69, 68, 79, 82, 85, 78, 80, 90, 75]),
};

export const getTurnState = () => {
  const firstUser = storageMethod('s', 'GET_ITEM', turnKeys.firstUser());
  const activeUser = storageMethod('s', 'GET_ITEM', turnKeys.activeUser());
  const enemyNick = storageMethod('s', 'GET_ITEM', turnKeys.enemyNick());
  const localPlayer = storageMethod('l', 'GET_ITEM', 'localPlayer');
  const beforePlayerNum = storageMethod('s', 'GET_ITEM', turnKeys.beforePlayerNum());

  return {
    firstUser,
    activeUser,
    enemyNick,
    localPlayer,
    beforePlayerNum,
    hasBeforePlayerNum: beforePlayerNum !== null && beforePlayerNum !== '',
    hasEnemyBeforeCube: hasEnemyBeforeCube(),
    hasAfterPlayerNum: hasAfterPlayerNum(),
  };
};

export const inferActiveUser = () => {
  const state = getTurnState();
  if (!state.firstUser) return null;

  if (state.hasBeforePlayerNum && state.firstUser === state.localPlayer && state.enemyNick) {
    return state.enemyNick;
  }

  if (state.hasEnemyBeforeCube && state.firstUser !== state.localPlayer && state.localPlayer) {
    return state.localPlayer;
  }

  const activeUserKnown =
    state.activeUser &&
    (state.activeUser === state.localPlayer || state.activeUser === state.enemyNick);

  if (activeUserKnown) {
    return state.activeUser;
  }

  return state.firstUser;
};

export const ensureActiveUser = () => {
  const activeUser = inferActiveUser();
  if (!activeUser) return null;

  const activeUserKey = turnKeys.activeUser();
  if (storageMethod('s', 'GET_ITEM', activeUserKey) !== activeUser) {
    storageMethod('s', 'SET_ITEM', activeUserKey, activeUser);
  }

  return activeUser;
};

export const isLocalTurn = () => {
  const activeUser = ensureActiveUser();
  const state = getTurnState();
  const localPlayer = storageMethod('l', 'GET_ITEM', 'localPlayer');
  const localFirstMoveDone =
    state.hasBeforePlayerNum &&
    state.firstUser === localPlayer;

  return Boolean(
    activeUser &&
    localPlayer &&
    activeUser === localPlayer &&
    !state.hasAfterPlayerNum &&
    !localFirstMoveDone
  );
};
