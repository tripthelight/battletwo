import { errorManagement } from '@/client/js/module/errorManagement';

export default () => {
  const DREW_STATE = window.sessionStorage.drewState;
  if (DREW_STATE) return false;
  const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  if (!COINS_PLAYER) return errorManagement({ errCase: 'errorComn', message: 'gameover 체크에서 coinsPlayer 세션이 없습니다.' });
  const COINS_ENEMY = window.sessionStorage.coinsEnemy;
  if (!COINS_ENEMY) return errorManagement({ errCase: 'errorComn', message: 'gameover 체크에서 coinsEnemy 세션이 없습니다.' });

  if (Number(COINS_PLAYER) === 0 || Number(COINS_ENEMY) === 0) return true;
  return false;
};
