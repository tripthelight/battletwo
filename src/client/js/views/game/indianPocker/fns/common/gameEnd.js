import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import indianPockerGameState from '@/client/js/gameState/indianPocker';
import setGameoverResult from '@/client/js/views/game/indianPocker/fns/common/setGameoverResult';

export default () => {
  // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  // if (!COINS_PLAYER) return errorManagement({ errCase: 'sessionStorageLoss', message: 'gameover 체크에서 coinsPlayer 세션이 없습니다.' });
  const encryptKey1 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  if (encryptVal1 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'gameover 체크에서 coinsPlayer 세션이 없습니다.' });
  dec(encryptVal1); // coinsEnemy value number

  // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
  // if (!COINS_ENEMY) return errorManagement({ errCase: 'sessionStorageLoss', message: 'gameover 체크에서 coinsEnemy 세션이 없습니다.' });
  const encryptKey2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  if (encryptVal2 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'gameover 체크에서 coinsEnemy 세션이 없습니다.' });
  dec(encryptVal2); // coinsEnemy value number

  setTimeout(() => {
    setGameoverResult();
    setTimeout(() => {
      indianPockerGameState.gameOver();
    }, timeInterval_1);
  }, timeInterval_1);
};
