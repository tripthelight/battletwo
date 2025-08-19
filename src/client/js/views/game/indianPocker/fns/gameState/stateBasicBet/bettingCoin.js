import findCharCode from '@/client/js/functions/findCharCode';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import removeCoinActive from '@/client/js/views/game/indianPocker/fns/common/removeCoinActive';
import moveCoins from '@/client/js/views/game/indianPocker/fns/common/moveCoins';

export default () => {
  // element | seeeion 체크
  // const BET_STATE = window.sessionStorage.betState;
  // if (!BET_STATE) return errorManagement({ errCase: 'sessionStorageLoss', message: 'betState 세션이 없습니다.' });
  // if (BET_STATE !== 'basicBetting') return errorManagement({ errCase: 'sessionStorageLoss', message: 'basicBetting 세션의 값이 잘못되었습니다.' });
  const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  if (encryptVal1 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'betState 세션이 없습니다.' });
  // basicBetting
  if (encryptVal1 !== findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65])) return errorManagement({ errCase: 'sessionStorageLoss', message: 'basicBetting 세션의 값이 잘못되었습니다.' });
  const BASIC_BETTING_STATE = window.sessionStorage.basicBettingState;
  if (!BASIC_BETTING_STATE) return errorManagement({ errCase: 'sessionStorageLoss', message: 'basicBettingState 세션이 없습니다.' });

  // 명령
  console.log('BASIC_BETTING_STATE :: ', BASIC_BETTING_STATE);
  if (BASIC_BETTING_STATE === 'true') {
    removeCoinActive();
  } else if (BASIC_BETTING_STATE === 'false') {
    moveCoins();
  } else {
    return errorManagement({ errCase: 'sessionStorageLoss', message: 'BASIC_BETTING_STATE 세션의 값이 잘못되었습니다.' });
  }
  LOADING_EVENT.hide();
};
