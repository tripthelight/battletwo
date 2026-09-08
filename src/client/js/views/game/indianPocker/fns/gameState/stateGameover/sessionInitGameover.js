import findCharCode from '@/client/js/functions/findCharCode';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import drawResult from '@/client/js/views/game/indianPocker/fns/gameState/stateGameover/drawResult';
import setStorageGameResult from '@/client/js/views/game/indianPocker/fns/common/setStorageGameResult';
import {
  RESULT_RECORDED_KEY,
  getGameOverResult,
  hasEncryptedGameStorage,
} from '@/client/js/views/game/indianPocker/fns/common/gameOverSnapshot';

export default () => {
  const result = getGameOverResult();

  if (typeof result !== 'boolean') {
    return errorManagement({
      errCase: 'sessionStorageLoss',
      message: 'game over 상태에서 result 데이터가 없습니다',
    });
  }

  setTimeout(() => {
    // 정상 게임 종료 직후에는 암호화 sessionStorage를 기존 방식대로 정리한다.
    // 결과 화면 새로고침 복구에서는 KEY.prk가 없으므로 암호화 key 계산을 하지 않는다.
    if (hasEncryptedGameStorage()) {
      const D_ARR = [
        findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]), // betUser
        findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]), // betCoinPos
        findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]), // betUserFirst
        findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]), // battleCardNum
        findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]), // basicBettingState
        findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), // extFirstBet
        findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]), // roundEnd
        'cardNum',
        findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]), // betState
        'gameReady',
        findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]), // coinsPlayerBet
        findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]), // coinsEnemyExtBet
        findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]), // betCoin
        findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]), // coinsPlayerExtBet
        findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]), // coinsEnemyBet
      ];

      storageMethod('s', 'REMOVE_ARR', '', '', D_ARR);
    }

    if (window.sessionStorage.getItem(RESULT_RECORDED_KEY) !== '1') {
      setStorageGameResult('indianpoker', result);
      storageMethod('s', 'SET_ITEM', RESULT_RECORDED_KEY, '1');
    }

    setTimeout(drawResult, timeInterval_1);
  }, timeInterval_1);
};
