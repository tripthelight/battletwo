import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import playerNum from '@/client/js/views/game/indianPocker/fns/common/playerNum';

export default () => {
  /* const PLAYER_CARD_NUM = window.sessionStorage.getItem('playCardNum');
  if (PLAYER_CARD_NUM === null || (PLAYER_CARD_NUM !== null && PLAYER_CARD_NUM === '')) {
    errorManagement({ errCase: 'errorComn', message: 'error - getRoundEnd.js - playCardNum null' });
    return false;
  }
  return playerNum(PLAYER_CARD_NUM); */

  const encryptKey1 = findCharCode([77, 87, 85, 88, 83, 80, 79, 90, 65, 66]); // playCardNum
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  if (encryptVal1 === null || (encryptVal1 !== null && encryptVal1 === '')) {
    errorManagement({ errCase: 'errorComn', message: 'error - getRoundEnd.js - playCardNum null' });
    return false;
  };

  return playerNum(encryptVal1);
};
