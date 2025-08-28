import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import drawResult from '@/client/js/views/game/indianPocker/fns/gameState/stateGameover/drawResult';
import setStorageGameResult from '@/client/js/views/game/indianPocker/fns/common/setStorageGameResult';

export default () => {
  // element | seeeion 체크
  // const RESULT = window.sessionStorage.result;
  // if (!RESULT) return errorManagement({ errCase: 'sessionStorageLoss', message: 'game over 상태에서 result 세션이 없습니다' });
  const encryptKey1 = findCharCode([79, 85, 77, 74, 71, 78, 80, 67, 81, 72]); // result
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  if (encryptVal1 === null || (encryptVal1 !== null && encryptVal1 === '')) return errorManagement({ errCase: 'sessionStorageLoss', message: 'game over 상태에서 result 세션이 없습니다' });

  // 명령
  setTimeout(() => {
    // 필요없는 세션 삭제
    // const D_ARR = ['betUser', 'betCoinPos', 'betUserFirst', 'battleCardNum', 'basicBettingState', 'extFirstBet', 'roundEnd', 'cardNum', 'betState', 'gameReady', 'coinsPlayerBet', 'coinsEnemyExtBet', 'betCoin', 'coinsPlayerExtBet', 'coinsEnemyBet'];

    const D_ARR = [
      findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]), // betUser
      'betCoinPos',
      findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]), // betUserFirst
      'battleCardNum',
      findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]), // basicBettingState
      findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]). // extFirstBet
      findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]), // roundEnd
      'cardNum',
      findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]), // betState
      'gameReady',
      findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]), // coinsPlayerBet
      findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]), // coinsEnemyExtBet
      'betCoin',
      findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]), // coinsPlayerExtBet
      findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]) // coinsEnemyBet
    ];
    storageMethod('s', 'REMOVE_ARR', '', '', D_ARR);

    // 게임 결과를 localStorage에 저장
    // const RES_BOOLEAN = window.sessionStorage.result === 'true' ? true : false;
    // setStorageGameResult('indianpoker', RES_BOOLEAN);
    setStorageGameResult('indianpoker', X.dec(encryptVal1));
    // 다음 함수 실행
    setTimeout(drawResult, timeInterval_1);
  }, timeInterval_1);
};
