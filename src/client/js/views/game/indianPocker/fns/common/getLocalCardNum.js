import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import playerNum from '@/client/js/views/game/indianPocker/fns/common/playerNum';

export default () => {
  const PLAYER_CARD_NUM = window.sessionStorage.getItem('playCardNum');
  if (PLAYER_CARD_NUM === null || (PLAYER_CARD_NUM !== null && PLAYER_CARD_NUM === '')) {
    errorManagement({ errCase: 'errorComn', message: 'error - getRoundEnd.js - playCardNum null' });
    return false;
  }
  return playerNum(PLAYER_CARD_NUM);
};
