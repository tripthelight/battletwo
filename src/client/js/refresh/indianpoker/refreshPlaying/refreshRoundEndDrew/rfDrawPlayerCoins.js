import deviceStateStore from '@/client/store/deviceStateStore.js';
import { timeInterval_1 } from '@/client/js/functions/variable';

export default () => {
  // element | seeeion 체크
  const COINS_PLAYER = document.querySelector('.coins-player');
  if (COINS_PLAYER) return;
  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!PLAYER_BLOCK) return;

  // 명령
  setTimeout(() => {
    let elem = document.createElement('ul');
    let li;
    elem.classList.add('coins');
    elem.classList.add('coins-player');
    let coinCount = Number(window.sessionStorage.coinsPlayer);
    for (let i = 0; i < coinCount; i++) {
      li = document.createElement('li');
      const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
      if (deviceState == 'pc') li.setAttribute('draggable', true);
      elem.appendChild(li);
    }
    PLAYER_BLOCK.appendChild(elem);
  }, timeInterval_1);
};
