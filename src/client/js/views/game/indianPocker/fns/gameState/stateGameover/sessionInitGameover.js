import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import drawResult from '@/client/js/views/game/indianPocker/fns/gameState/stateGameover/drawResult';
import setStorageGameResult from '@/client/js/views/game/indianPocker/fns/common/setStorageGameResult';

export default () => {
  // element | seeeion 체크
  const RESULT = window.sessionStorage.result;
  if (!RESULT) return errorManagement({ errCase: 'errorComn', message: 'game over 상태에서 result 세션이 없습니다' });

  // 명령
  setTimeout(() => {
    // 필요없는 세션 삭제
    const D_ARR = ['betUser', 'betCoinPos', 'betUserFirst', 'battleCardNum', 'basicBettingState', 'extFirstBet', 'roundEnd', 'cardNum', 'betState', 'gameReady', 'coinsPlayerBet', 'coinsEnemyExtBet', 'betCoin', 'coinsPlayerExtBet', 'coinsEnemyBet'];
    storageMethod('s', 'REMOVE_ARR', '', '', D_ARR);

    // 게임 결과를 localStorage에 저장
    const RES_BOOLEAN = window.sessionStorage.result === 'true' ? true : false;
    setStorageGameResult('indianpoker', RES_BOOLEAN);
    // 다음 함수 실행
    setTimeout(drawResult, timeInterval_1);
  }, timeInterval_1);
};
