import deviceStateStore from '@/client/store/deviceStateStore';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import storageMethod from '@/client/js/module/storage/storageMethod';

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
    // const BET_COIN = window.sessionStorage.betCoin;
    // if (!BET_COIN) throw throwObj('sessionStorageLoss', 'pcDraggableCheck - betCoin sessionStorage not found.');
    // const BET_COIN_ARR = JSON.parse(BET_COIN);
    const encryptKey1 = findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]); // betCoin
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
    if (encryptVal1 === null) throw throwObj('sessionStorageLoss', 'pcDraggableCheck - betCoin sessionStorage not found.');
    const BET_COIN_ARR = JSON.parse(encryptVal1);
    if (!BET_COIN_ARR || BET_COIN_ARR.length < 1) return;

    console.log("BET_COIN_ARR ::::: ", BET_COIN_ARR.length);
    console.log("COINS :::::::::::: ", COINS.length);


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
