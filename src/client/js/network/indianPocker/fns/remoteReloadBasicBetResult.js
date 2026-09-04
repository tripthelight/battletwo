import errorManager from '@/client/js/module/errorHandler/errorManager';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import gameEnd from '@/client/js/views/game/indianPocker/fns/common/gameEnd';
import {
  isGameOverResultState,
  isResultReloadState,
  prepareResultReload,
} from '@/client/js/network/indianPocker/fns/resultReloadSync';

/**
 * playing 결과 화면에서 새로고침한 Peer가 상대의 결과 처리가 끝난 뒤 받는 신호.
 * basicBet뿐 아니라 코인 0으로 종료된 경우 gameOver까지 동기화한다.
 */
export default (_data) => {
  try {
    if (!isResultReloadState(_data)) {
      throw throwObj('dataManipulation', 'remoteReloadBasicBetResult - next state failed.');
    }

    if (prepareResultReload(_data) && isGameOverResultState(_data)) {
      gameEnd();
    }
  } catch (error) {
    errorManager(error, true);
  }
};
