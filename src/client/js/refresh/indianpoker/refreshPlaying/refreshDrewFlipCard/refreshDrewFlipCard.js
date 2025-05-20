import { timeInterval_1, timeInterval_2 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import disabledMoveCoins from '@/client/js/views/game/indianPocker/fns/common/disabledMoveCoins';
import pcDraggableCheck from '@/client/js/views/game/indianPocker/fns/common/pcDraggableCheck';
import refreshDrawDrew from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/refreshDrawDrew';

export default () => {
  const BOTTOM_BUTTONS = document.querySelector('.bottom-buttons');
  if (BOTTOM_BUTTONS) BOTTOM_BUTTONS.remove();

  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!PLAYER_BLOCK) return errorManagement({ errCase: 'elementLoss', message: 'drew refresh 중 player-block 엘리먼트가 없습니다.' });
  const PLAYER_CARD = PLAYER_BLOCK.querySelector('.player-card');
  if (!PLAYER_CARD) return errorManagement({ errCase: 'elementLoss', message: 'drew refresh 중  .player-card 엘리먼트가 없습니다' });

  const ENEMY_CARD = document.querySelector('.enemy-block .enemy-card');
  if (!ENEMY_CARD) return errorManagement({ errCase: 'elementLoss', message: 'drew refresh 중 enemy-card 엘리먼트가 없습니다.' });

  ENEMY_CARD.classList.add('disabled');
  PLAYER_BLOCK.classList.remove('disabled');
  PLAYER_CARD.classList.add('drew-wait-card');

  setTimeout(() => {
    const BOTTOM_BUTTONS = PLAYER_BLOCK.querySelector('.bottom-buttons');
    if (BOTTOM_BUTTONS) BOTTOM_BUTTONS.remove();
    const COINS_PLAYER_EL = PLAYER_BLOCK.querySelector('.coins-player');
    if (COINS_PLAYER_EL) {
      COINS_PLAYER_EL.classList.remove('active');
      COINS_PLAYER_EL.classList.add('disabled');
      if (COINS_PLAYER_EL.childNodes && COINS_PLAYER_EL.childNodes.length > 0)
        [...COINS_PLAYER_EL.childNodes].map((item) => {
          item.style.removeProperty('animation-delay');
          return item;
        });
      setTimeout(pcDraggableCheck, timeInterval_1, 'coins-player', false);
      setTimeout(disabledMoveCoins, timeInterval_1);
    }
    setTimeout(refreshDrawDrew, timeInterval_2);
  }, timeInterval_1);
};
