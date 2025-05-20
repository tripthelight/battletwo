import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import indianPockerGameState from '@/client/js/gameState/indianPocker';

export default () => {
  const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  if (!COINS_PLAYER) return errorManagement({ errCase: 'sessionStorageLoss', message: 'gameover 체크에서 coinsPlayer 세션이 없습니다.' });
  const COINS_ENEMY = window.sessionStorage.coinsEnemy;
  if (!COINS_ENEMY) return errorManagement({ errCase: 'sessionStorageLoss', message: 'gameover 체크에서 coinsEnemy 세션이 없습니다.' });

  setTimeout(() => {
    if (Number(COINS_PLAYER) === 0) storageMethod('s', 'SET_ITEM', 'result', false);
    if (Number(COINS_ENEMY) === 0) storageMethod('s', 'SET_ITEM', 'result', true);

    setTimeout(() => {
      indianPockerGameState.gameOver();
    }, timeInterval_1);
  }, timeInterval_1);
};
