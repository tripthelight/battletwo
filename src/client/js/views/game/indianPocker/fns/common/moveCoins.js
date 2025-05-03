import { timeInterval_1 } from '@/client/js/functions/variable';
import pcDraggableCheck from '@/client/js/views/game/indianPocker/fns/common/pcDraggableCheck';
import coinsActiveAni from '@/client/js/views/game/indianPocker/fns/common/coinsActiveAni';
import addEventsMoveCoin from '@/client/js/views/game/indianPocker/fns/common/addEventsMoveCoin';

export default () => {
  // element | seeeion 체크
  const COINS = document.querySelector('.coins-player');
  if (!COINS) return;

  setTimeout(() => {
    COINS.classList.remove('disabled');
    pcDraggableCheck('coins-player', true);
    coinsActiveAni();
    let moveCoins = COINS.querySelectorAll('li');
    [].forEach.call(moveCoins, (item) => {
      addEventsMoveCoin(item);
    });
  }, timeInterval_1);
};
