import { comnText } from '@/client/js/functions/language';
import disabledMoveCoins from '@/client/js/views/game/indianPocker/fns/common/disabledMoveCoins';
import disabledSubtractMoveCoin from '@/client/js/views/game/indianPocker/fns/common/disabledSubtractMoveCoin';
import pcDraggableAllDisabled from '@/client/js/views/game/indianPocker/fns/common/pcDraggableAllDisabled';

export default (_state) => {
  disabledMoveCoins();
  disabledSubtractMoveCoin();
  pcDraggableAllDisabled('bet-coins', false);
  pcDraggableAllDisabled('coins-player', false);

  document.querySelector('.coins-enemy').classList.add('active');
  document.querySelector('.enemy-card').classList.remove('disabled');
  document.querySelector('.player-block').classList.add('disabled');
  document.querySelector('.coins-player').classList.remove('active');
  document.querySelector('.coins-player').classList.add('disabled');
  document.querySelector('.betting-zone').classList.add('disabled');

  window.sessionStorage.setItem('betUser', false);
  window.sessionStorage.setItem('extFirstBet', true);
  // 배팅된 칩의 betState: 'end'
  if (_state === comnText.fold) return;
  window.sessionStorage.setItem(
    'betCoin',
    JSON.stringify(
      JSON.parse(window.sessionStorage.betCoin).map((item) => {
        item.betState = 'end';
        return item;
      }),
    ),
  );
};
