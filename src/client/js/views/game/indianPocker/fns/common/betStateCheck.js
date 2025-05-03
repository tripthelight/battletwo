import { timeInterval_1 } from '@/client/js/functions/variable';
import { SET_BASIC_BETTING } from '@/client/js/views/game/indianPocker/fns/stateBasicBetting/setBasicBetting';
import extraBettingCheck from '@/client/js/views/game/indianPocker/fns/common/extraBettingCheck';

export default () => {
  setTimeout(() => {
    if (window.sessionStorage.betState === 'basicBetting') {
      SET_BASIC_BETTING.basicBettingBetStateCheck();
    } else if (window.sessionStorage.betState === 'extraBetting') {
      setTimeout(extraBettingCheck, timeInterval_1);
    } else {
      return errorComn();
    }
  }, timeInterval_1);
};
