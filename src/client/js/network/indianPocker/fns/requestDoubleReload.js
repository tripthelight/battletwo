import errorManager from '@/client/js/module/errorHandler/errorManager';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { request } from '@/client/js/network/indianPocker/request';
import basicBetMainCheck from '@/client/js/views/game/indianPocker/fns/common/basicBetMainCheck';
import gameEnd from '@/client/js/views/game/indianPocker/fns/common/gameEnd';
import {
  RESULT_RELOAD_STATE,
  isGameOverResultState,
  isResultReloadUser,
  prepareResultReload,
} from '@/client/js/network/indianPocker/fns/resultReloadSync';

function isBasicBetProbe(value) {
  const expected = RESULT_RELOAD_STATE.BASIC_BET;
  return (
    Array.isArray(value) &&
    value.length === expected.length &&
    value.every((item, index) => item === expected[index])
  );
}

/**
 * 결과 화면에서 양 Peer가 모두 새로고침한 경우의 동기화 요청.
 * 각 Peer의 확정된 코인 상태를 기준으로 다음 상태(basicBet/gameOver)를 결정한다.
 */
export default (_data) => {
  try {
    if (!isBasicBetProbe(_data)) {
      throw throwObj('dataManipulation', 'requestDoubleReload - probe failed.');
    }

    if (!isResultReloadUser()) {
      return;
    }

    const nextState = basicBetMainCheck()
      ? RESULT_RELOAD_STATE.GAME_OVER
      : RESULT_RELOAD_STATE.BASIC_BET;

    request('responseDoubleReload', nextState);

    if (prepareResultReload(nextState) && isGameOverResultState(nextState)) {
      gameEnd();
    }
  } catch (error) {
    errorManager(error, true);
  }
};
