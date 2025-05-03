import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import playerCoinsData from '@/client/js/views/game/indianPocker/fns/common/playerCoinsData';
import { SET_BASIC_BETTING } from '@/client/js/views/game/indianPocker/fns/stateBasicBetting/setBasicBetting';

export default (_event) => {
  setTimeout(() => {
    if (window.sessionStorage.betState === 'basicBetting') {
      // 기본 배팅
      SET_BASIC_BETTING.setBasicBetting(_event);
    } else if (window.sessionStorage.betState === 'extraBetting') {
      // 추가 배팅
      setTimeout(playerCoinsData, timeInterval_1, _event);
    } else {
      // error
      return errorManagement({ errCase: 'errorComn', message: 'betState 세션의 값이 잘못되었습니다.' });
    }
  }, timeInterval_1);
};
