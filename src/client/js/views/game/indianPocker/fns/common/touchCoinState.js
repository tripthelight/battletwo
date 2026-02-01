import { reactiveState } from '@/client/js/views/game/indianPocker/fns/common/variable';
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';

export default (dragCoin) => {
  const BET_COINS = Array.from(dragCoin.closest('ul').children);
  if (!BET_COINS) return false;
  reactiveState.mTargetIdx = BET_COINS.indexOf(dragCoin);
  // const COIN_BET = window.sessionStorage.betCoin;
  // if (!COIN_BET) return false;
  const encryptKey1 = findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]); // betCoin
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
  // const COIN_BET_ARR = JSON.parse(COIN_BET);
  const COIN_BET_ARR = JSON.parse(encryptVal1);

  if (!COIN_BET_ARR || COIN_BET_ARR.length < 1) return false;

  const K = [
    findCharCode([88, 79, 72, 75, 71, 83, 81, 85, 82, 84]), // host
    findCharCode([80, 72, 83, 88, 76, 75, 78, 84, 65, 89]), // betState
  ];

  // if (COIN_BET_ARR[reactiveState.mTargetIdx].host === 'enemy') return false;
  if (COIN_BET_ARR[reactiveState.mTargetIdx][K[0]] === 'enemy') return false;
  // if (COIN_BET_ARR[reactiveState.mTargetIdx].betState === 'end') return false;
  if (COIN_BET_ARR[reactiveState.mTargetIdx][K[1]] === 'end') return false;
  return true;
};
