import { timeInterval_201 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';

export default () => {
  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!PLAYER_BLOCK) return errorManagement({ errCase: 'errorComn', message: 'cardHideAnimationComn 에서 .player-block 엘리먼트가 없습니다' });
  const PLAYER_CARD = PLAYER_BLOCK.querySelector('.player-card');
  if (!PLAYER_CARD) return errorManagement({ errCase: 'errorComn', message: 'cardHideAnimationComn 에서 .player-card 엘리먼트가 없습니다' });
  const ENEMY_BLOCK = document.querySelector('.enemy-block');
  if (!ENEMY_BLOCK) return errorManagement({ errCase: 'errorComn', message: 'cardHideAnimationComn 에서 .enemy-block 엘리먼트가 없습니다' });
  const ENEMY_COINS = ENEMY_BLOCK.querySelector('.coins-enemy');
  if (!ENEMY_COINS) return errorManagement({ errCase: 'errorComn', message: 'cardHideAnimationComn 에서 .coins-enemy 엘리먼트가 없습니다' });
  const ENEMY_CARD = ENEMY_BLOCK.querySelector('.enemy-card');
  if (!ENEMY_CARD) return errorManagement({ errCase: 'errorComn', message: 'cardHideAnimationComn 에서 .enemy-card 엘리먼트가 없습니다' });
  PLAYER_BLOCK.classList.add('round-fin');
  ENEMY_BLOCK.classList.add('round-fin');
  setTimeout(() => {
    window.sessionStorage.setItem('battleCardNum', []);
    PLAYER_CARD.remove();
    ENEMY_CARD.remove();
    ENEMY_COINS.classList.remove('disabled');
    PLAYER_BLOCK.classList.remove('disabled');
    PLAYER_BLOCK.classList.remove('round-end');
    PLAYER_BLOCK.classList.remove('round-fin');
    ENEMY_BLOCK.classList.remove('disabled');
    ENEMY_BLOCK.classList.remove('round-end');
    ENEMY_BLOCK.classList.remove('round-fin');
  }, timeInterval_201);
};
