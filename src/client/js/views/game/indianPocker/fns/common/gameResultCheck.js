import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';

export default () => {
  const DREW_STATE = window.sessionStorage.drewState;
  if (DREW_STATE) return false;
  const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  if (!COINS_PLAYER) return errorManagement({ errCase: 'sessionStorageLoss', message: 'gameover 체크에서 coinsPlayer 세션이 없습니다.' });
  // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
  // if (!COINS_ENEMY) return errorManagement({ errCase: 'sessionStorageLoss', message: 'gameover 체크에서 coinsEnemy 세션이 없습니다.' });
  const encryptKey3 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
  const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
  if (encryptVal3 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'gameover 체크에서 coinsEnemy 세션이 없습니다.' });
  const decryptVal3 = dec(encryptVal3); // coinsEnemy value number

  // if (Number(COINS_PLAYER) === 0 || Number(COINS_ENEMY) === 0) return true;
  if (Number(COINS_PLAYER) === 0 || decryptVal3 === 0) return true;

  return false;
};
