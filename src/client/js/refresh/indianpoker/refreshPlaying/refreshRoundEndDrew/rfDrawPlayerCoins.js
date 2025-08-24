import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import deviceStateStore from '@/client/store/deviceStateStore.js';
import { timeInterval_1 } from '@/client/js/functions/variable';

export default () => {
  // element | seeeion 체크
  const COINS_PLAYER = document.querySelector('.coins-player');
  console.log(' 6-1 : loading show loop test >>>>>>>>>>>>>> ');
  if (COINS_PLAYER) return;
  console.log(' 6-2 : loading show loop test >>>>>>>>>>>>>> ');
  const PLAYER_BLOCK = document.querySelector('.player-block');
  console.log(' 7-1 : loading show loop test >>>>>>>>>>>>>> ');
  if (!PLAYER_BLOCK) return;
  console.log(' 7-2 : loading show loop test >>>>>>>>>>>>>> ');

  // 명령
  setTimeout(() => {
    const encryptKey = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]);  // coinsPlayer
    const encryptVal = window.sessionStorage.getItem(encryptKey);
    const decryptVal = dec(encryptVal); // coinsPlayer value number

    let elem = document.createElement('ul');
    let li;
    elem.classList.add('coins');
    elem.classList.add('coins-player');
    // let coinCount = Number(window.sessionStorage.coinsPlayer);
    // for (let i = 0; i < coinCount; i++) {
    for (let i = 0; i < Number(decryptVal); i++) {
      li = document.createElement('li');
      const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
      if (deviceState === 'pc') li.setAttribute('draggable', true);
      elem.appendChild(li);
    }
    PLAYER_BLOCK.appendChild(elem);
  }, timeInterval_1);
};
