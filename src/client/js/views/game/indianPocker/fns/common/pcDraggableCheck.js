import deviceStateStore from '@/client/store/deviceStateStore';

export default (_elem, _state) => {
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
  if (deviceState !== 'pc') return;
  let el;
  if (_elem === 'bet-coins') {
    el = document.querySelector('.bet-coins');
  }
  if (_elem === 'coins-player') {
    el = document.querySelector('.coins-player');
  }
  if (!el) return;
  const COINS = el.querySelectorAll('li');
  if (!COINS || COINS.length <= 0) return;

  if (_elem === 'bet-coins') {
    const BET_COIN = window.sessionStorage.betCoin;
    if (!BET_COIN) return errorComn('betCoin 세션이 없습니다.');
    const BET_COIN_ARR = JSON.parse(BET_COIN);
    if (!BET_COIN_ARR || BET_COIN_ARR.length < 1) return;
    for (let i = 0; i < COINS.length; i++) {
      if (_state) {
        if (BET_COIN_ARR[i].host === 'enemy' || (BET_COIN_ARR[i].betState && BET_COIN_ARR[i].betState === 'end')) {
          COINS[i].setAttribute('draggable', false);
        } else {
          COINS[i].setAttribute('draggable', true);
        }
      }
    }
  } else {
    for (let i = 0; i < COINS.length; i++) {
      if (_state) COINS[i].setAttribute('draggable', true);
      if (!_state) COINS[i].setAttribute('draggable', false);
    }
  }
};
