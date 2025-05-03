import { timeInterval_1 } from '@/client/js/functions/variable';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { errorManagement } from '@/client/js/module/errorManagement';
import removeCoinActive from '@/client/js/views/game/indianPocker/fns/common/removeCoinActive';
import moveCoins from '@/client/js/views/game/indianPocker/fns/common/moveCoins';

export default () => {
  // element | seeeion 체크
  const BET_STATE = window.sessionStorage.betState;
  if (!BET_STATE) return errorManagement({ errCase: 'errorComn', message: 'betState 세션이 없습니다.' });
  if (BET_STATE !== 'basicBetting') return errorManagement({ errCase: 'errorComn', message: 'basicBetting 세션의 값이 잘못되었습니다.' });
  const BASIC_BETTING_STATE = window.sessionStorage.basicBettingState;
  if (!BASIC_BETTING_STATE) return errorManagement({ errCase: 'errorComn', message: 'basicBettingState 세션이 없습니다.' });

  // 명령
  setTimeout(() => {
    console.log('BASIC_BETTING_STATE :: ', BASIC_BETTING_STATE);
    if (BASIC_BETTING_STATE === 'true') {
      removeCoinActive();
    } else if (BASIC_BETTING_STATE === 'false') {
      moveCoins();
    } else {
      return errorManagement({ errCase: 'errorComn', message: 'BASIC_BETTING_STATE 세션의 값이 잘못되었습니다.' });
    }
    LOADING_EVENT.hide();
  }, timeInterval_1);
};
