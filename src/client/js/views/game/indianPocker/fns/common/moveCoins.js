import pcDraggableCheck from '@/client/js/views/game/indianPocker/fns/common/pcDraggableCheck';
import coinsActiveAni from '@/client/js/views/game/indianPocker/fns/common/coinsActiveAni';
import lastBettingCheck from '@/client/js/views/game/indianPocker/fns/common/lastBettingCheck';
import addEventsMoveCoin from '@/client/js/views/game/indianPocker/fns/common/addEventsMoveCoin';

export default () => {
  // element | seeeion 체크
  const COINS = document.querySelector('.coins-player');
  if (!COINS) return;

  COINS.classList.remove('disabled');
  pcDraggableCheck('coins-player', true);
  coinsActiveAni();

  // 상대가 추가배팅할 코인이 없으면 내 코인을 움직여서는 안됨
  const moveState = lastBettingCheck();
  if (moveState) return;

  const moveCoins = COINS.querySelectorAll('li');
  [].forEach.call(moveCoins, (item) => {
    addEventsMoveCoin(item);
  });
};
