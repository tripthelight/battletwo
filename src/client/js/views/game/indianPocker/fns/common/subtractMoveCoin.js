import pcDraggableCheck from '@/client/js/views/game/indianPocker/fns/common/pcDraggableCheck';
import addEventsSubtractMoveCoin from '@/client/js/views/game/indianPocker/fns/common/addEventsSubtractMoveCoin';
import { errorManagement } from '@/client/js/module/errorManagement';

export default () => {
  const BETTING_ZONE = document.querySelector('.betting-zone');
  if (!BETTING_ZONE) return errorManagement({ errCase: 'errorComn', message: '.betting-zone 엘리먼트가 없습니다.' });
  const BET_COINS = BETTING_ZONE.querySelector('.bet-coins');
  if (!BET_COINS) return errorManagement({ errCase: 'errorComn', message: '.bet-coins li 엘리먼트들이 없습니다' });
  pcDraggableCheck('bet-coins', true);
  let moveCoins = BET_COINS.querySelectorAll('li');
  if (!moveCoins || moveCoins.length <= 0) return;
  [].forEach.call(moveCoins, (item) => {
    addEventsSubtractMoveCoin(item);
  });
};
