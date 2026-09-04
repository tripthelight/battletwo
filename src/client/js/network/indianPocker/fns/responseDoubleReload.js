import errorManager from '@/client/js/module/errorHandler/errorManager';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import gameEnd from '@/client/js/views/game/indianPocker/fns/common/gameEnd';
import {
  isGameOverResultState,
  isResultReloadState,
  prepareResultReload,
} from '@/client/js/network/indianPocker/fns/resultReloadSync';

/**
 * 결과 화면에서 양 Peer가 모두 새로고침한 경우의 동기화 응답.
 */
export default (_data) => {
  try {
    if (!isResultReloadState(_data)) {
      throw throwObj('dataManipulation', 'responseDoubleReload - next state failed.');
    }

    if (prepareResultReload(_data) && isGameOverResultState(_data)) {
      gameEnd();
    }
  } catch (error) {
    errorManager(error, true);
  }
};
