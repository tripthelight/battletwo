import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import findCharCode from '@/client/js/functions/findCharCode';
import { getRL } from '@/client/js/module/webRTC/connectSignaling';
import X from '@/client/js/module/crypts/bool-obf';
import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import sessionInit from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/sessionInit';
import reloadBasicBetComn from '@/client/js/network/indianPocker/fns/reloadBasicBetComn';

const BASIC_BET = Object.freeze([98, 97, 115, 105, 99, 66, 101, 116]);
const GAME_OVER = Object.freeze([103, 97, 109, 101, 79, 118, 101, 114]);

export const RESULT_RELOAD_STATE = Object.freeze({
  BASIC_BET,
  GAME_OVER,
});

function sameState(value, expected) {
  return (
    Array.isArray(value) &&
    value.length === expected.length &&
    value.every((item, index) => item === expected[index])
  );
}

export function isResultReloadState(value) {
  return (
    sameState(value, BASIC_BET) ||
    sameState(value, GAME_OVER)
  );
}

export function isGameOverResultState(value) {
  return sameState(value, GAME_OVER);
}

export function isResultReloadUser() {
  const key = findCharCode([75, 81, 83, 80, 89, 88, 86, 72, 82, 77]); // playingReloadUser
  const value = storageMethod('s', 'GET_ITEM', key);

  return (
    value !== null &&
    value !== '' &&
    X.dec(value)
  );
}

/**
 * 결과 화면에서 새로고침한 Peer의 공통 session 정리.
 * gameOver의 실제 result 계산/화면 전환은 호출부가 gameEnd()로 수행한다.
 */
export function prepareResultReload(state) {
  if (!isResultReloadState(state)) {
    throw throwObj('dataManipulation', 'result reload state failed.');
  }

  if (!isResultReloadUser()) {
    return false;
  }

  getRL(true);
  reloadBasicBetComn();

  if (isGameOverResultState(state)) {
    LOADING_EVENT.show();
    return true;
  }

  sessionInit();
  LOADING_EVENT.hide();
  return true;
}
