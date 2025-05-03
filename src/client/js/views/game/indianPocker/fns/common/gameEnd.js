import { timeInterval_1 } from '@/client/js/functions/variable';
import indianPockerGameState from '@/client/js/gameState/indianPocker';
import { errorManagement } from '@/client/js/module/errorManagement';

export default () => {
  const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  if (!COINS_PLAYER) return errorManagement({ errCase: 'errorComn', message: 'gameover 체크에서 coinsPlayer 세션이 없습니다.' });
  const COINS_ENEMY = window.sessionStorage.coinsEnemy;
  if (!COINS_ENEMY) return errorManagement({ errCase: 'errorComn', message: 'gameover 체크에서 coinsEnemy 세션이 없습니다.' });

  setTimeout(() => {
    if (Number(COINS_PLAYER) === 0) window.sessionStorage.setItem('result', false);
    if (Number(COINS_ENEMY) === 0) window.sessionStorage.setItem('result', true);

    setTimeout(() => {
      indianPockerGameState.gameOver();
    }, timeInterval_1);
  }, timeInterval_1);
};
