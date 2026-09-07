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

const isKnownUser = (user, state) => (
  user &&
  (user === state.localPlayer || user === state.enemyNick)
);

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

/**
 * 현재 Round의 진행 흔적을 이용해 activeUser를 복구한다.
 *
 * - Round 시작 직후: firstUser 차례
 * - 내가 선Player이고 이미 beforePlayerNum을 냈음: 상대 차례
 * - 상대가 선Player이고 enemyBeforeCube가 존재함: 내 차례
 * - 두 번째 제출이 끝났으면 activeUser 값은 더 이상 입력 권한을 의미하지 않음
 */
export const inferActiveUser = () => {
  const state = getTurnState();

  if (!isKnownUser(state.firstUser, state)) return null;

  if (
    state.hasBeforePlayerNum &&
    state.firstUser === state.localPlayer &&
    state.enemyNick
  ) {
    return state.enemyNick;
  }

  if (
    state.hasEnemyBeforeCube &&
    state.firstUser !== state.localPlayer &&
    state.localPlayer
  ) {
    return state.localPlayer;
  }

  if (isKnownUser(state.activeUser, state)) {
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

  if (!activeUser || !state.localPlayer) return false;

  // 두 번째 Cube가 제출된 순간부터 Round 결과 commit 전까지는 양쪽 모두 입력 잠금.
  if (state.hasAfterPlayerNum) return false;

  // 내가 선Player인데 이미 첫 Cube를 제출했다면 다시 낼 수 없다.
  if (
    state.firstUser === state.localPlayer &&
    state.hasBeforePlayerNum
  ) {
    return false;
  }

  // 내가 후Player인 경우에는 상대의 첫 Cube가 확인된 뒤에만 제출 가능하다.
  if (
    state.firstUser !== state.localPlayer &&
    !state.hasEnemyBeforeCube
  ) {
    return false;
  }

  return activeUser === state.localPlayer;
};
