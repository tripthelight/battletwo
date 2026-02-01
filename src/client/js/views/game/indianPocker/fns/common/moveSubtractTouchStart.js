import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { reactiveState } from '@/client/js/views/game/indianPocker/fns/common/variable';
import touchCoinState from '@/client/js/views/game/indianPocker/fns/common/touchCoinState';

export default (e) => {
  if (!touchCoinState(e.target)) return;
  // const BET_COIN_POS = window.sessionStorage.betCoinPos;
  // if (!BET_COIN_POS) return;
  // const BET_COIN_ARR = JSON.parse(BET_COIN_POS);

  const encryptKey5 = findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]); // betCoinPos
  const encryptVal5 = storageMethod("s", "GET_ITEM", encryptKey5);
  if (encryptVal5 === null) return;
  const BET_COIN_ARR = JSON.parse(encryptVal5);
  if (!BET_COIN_ARR || BET_COIN_ARR.length <= 0) return;

  const BET_COINS = Array.from(e.target.closest('ul').children);
  if (!BET_COINS) {
    console.log('error - moveSubtractTouchStart.js - !BET_COINS');
    return errorManagement({ errCase: 'errorComn' });
  }
  reactiveState.mTargetIdx = BET_COINS.indexOf(e.target);

  reactiveState.mtX = BET_COIN_ARR[reactiveState.mTargetIdx].translateX;
  reactiveState.mtY = BET_COIN_ARR[reactiveState.mTargetIdx].translateY;
  reactiveState.selectX = e.targetTouches[0].clientX;
  reactiveState.selectY = e.targetTouches[0].clientY;
};
