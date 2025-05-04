import deviceStateStore from '@/client/store/deviceStateStore.js';
import { timeInterval_1 } from '@/client/js/functions/variable';
import pcDraggableCheck from '@/client/js/views/game/indianPocker/fns/common/pcDraggableCheck';
import removeEventSubtractMoveCoin from '@/client/js/views/game/indianPocker/fns/common/removeEventSubtractMoveCoin';

export default () => {
  const COINS = document.querySelector('.betting-zone');
  if (!COINS) return;
  const COINS_PLAYER = document.querySelector('.coins-player');
  if (COINS_PLAYER) {
    COINS_PLAYER.classList.remove('active');
    const COINS_PLAYER_LI = COINS_PLAYER.querySelectorAll('li');
    if (COINS_PLAYER_LI.length > 0) {
      for (let i = 0; i < COINS_PLAYER_LI.length; i++) {
        COINS_PLAYER_LI[i].style.removeProperty('animation-delay');
      }
    }
  }

  setTimeout(() => {
    pcDraggableCheck('coins-player', false);
    COINS.classList.remove('active');
    COINS.classList.add('disabled');
    let disableSubtractMoveCoins = COINS.querySelectorAll('li');
    if (disableSubtractMoveCoins.length === 0) return;
    const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
    if (deviceState === 'pc') {
      for (let i = 0; i < disableSubtractMoveCoins.length; i++) {
        disableSubtractMoveCoins[i].setAttribute('draggable', false);
      }
    }
    [].forEach.call(disableSubtractMoveCoins, (item) => {
      removeEventSubtractMoveCoin(item);
    });
  }, timeInterval_1);
};
