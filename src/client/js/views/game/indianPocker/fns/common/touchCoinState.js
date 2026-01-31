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
  if (!COIN_BET_ARR || COIN_BET_ARR.length <= 0) return false;
  if (COIN_BET_ARR[reactiveState.mTargetIdx].host === 'enemy') return false;
  if (COIN_BET_ARR[reactiveState.mTargetIdx].betState === 'end') return false;
  return true;
};
