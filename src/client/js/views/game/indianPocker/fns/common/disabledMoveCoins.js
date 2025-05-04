import { timeInterval_1 } from '@/client/js/functions/variable';
import pcDraggableCheck from '@/client/js/views/game/indianPocker/fns/common/pcDraggableCheck';
import deviceStateStore from '@/client/store/deviceStateStore.js';
import removeEventMoveCoin from '@/client/js/views/game/indianPocker/fns/common/removeEventMoveCoin.js';

export default () => {
  const COINS = document.querySelector('.coins-player');
  if (!COINS) return;

  setTimeout(() => {
    pcDraggableCheck('coins-player', false);
    COINS.classList.add('disabled');
    let disableMoveCoins = COINS.querySelectorAll('li');
    if (disableMoveCoins.length == 0) return;
    const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
    if (deviceState === 'pc') {
      for (let i = 0; i < disableMoveCoins.length; i++) {
        disableMoveCoins[i].setAttribute('draggable', false);
      }
    }
    [].forEach.call(disableMoveCoins, (item) => {
      removeEventMoveCoin(item);
    });
  }, timeInterval_1);
};
