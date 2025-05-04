import deviceStateStore from '@/client/store/deviceStateStore.js';

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
  for (let i = 0; i < COINS.length; i++) {
    COINS[i].setAttribute('draggable', _state);
  }
};
