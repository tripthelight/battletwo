import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import indianPockerGameState from '@/client/js/gameState/indianPocker';

export default () => {
  const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  if (!COINS_PLAYER) return errorManagement({ errCase: 'sessionStorageLoss', message: 'gameover 체크에서 coinsPlayer 세션이 없습니다.' });

  // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
  // if (!COINS_ENEMY) return errorManagement({ errCase: 'sessionStorageLoss', message: 'gameover 체크에서 coinsEnemy 세션이 없습니다.' });
  const encryptKey2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  if (encryptVal2 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'gameover 체크에서 coinsEnemy 세션이 없습니다.' });
  const decryptVal2 = dec(encryptVal2); // coinsEnemy value number

  setTimeout(() => {
    if (Number(COINS_PLAYER) === 0) storageMethod('s', 'SET_ITEM', 'result', false);

    // if (Number(COINS_ENEMY) === 0) storageMethod('s', 'SET_ITEM', 'result', true);
    if (decryptVal2 === 0) storageMethod('s', 'SET_ITEM', 'result', true);

    setTimeout(() => {
      indianPockerGameState.gameOver();
    }, timeInterval_1);
  }, timeInterval_1);
};
