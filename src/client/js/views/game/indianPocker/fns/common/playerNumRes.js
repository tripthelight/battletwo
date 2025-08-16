import playerNum from '@/client/js/views/game/indianPocker/fns/common/playerNum.js';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';

export default () => {
  /*
  const BATTLE_CARD_NUM = window.sessionStorage.battleCardNum;
  if (!BATTLE_CARD_NUM) {
    console.log('error !BATTLE_CARD_NUM');
    return errorManagement({ errCase: 'errorComn' });
  }
  const BATTLE_CARD_ARR = JSON.parse(BATTLE_CARD_NUM);
  if (!BATTLE_CARD_ARR || BATTLE_CARD_ARR.length <= 0) {
    console.log('error !BATTLE_CARD_ARR || BATTLE_CARD_ARR.length <= 0');
    return errorManagement({ errCase: 'errorComn' });
  }
  return playerNum(BATTLE_CARD_ARR, 'player');
  */

  const BATTLE_CARD_NUM = window.sessionStorage.getItem('battleCardNum');
  if (BATTLE_CARD_NUM === null) {
    return errorManagement({ errCase: 'errorComn', message: 'error !BATTLE_CARD_NUM' });
  }
  return playerNum(BATTLE_CARD_NUM);
};
