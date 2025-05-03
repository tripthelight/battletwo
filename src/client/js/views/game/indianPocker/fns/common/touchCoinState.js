import { mTargetIdx } from '@/client/js/views/game/indianPocker/fns/common/variable';

export default (e) => {
  const BET_COINS = Array.from(e.closest('ul').children);
  if (!BET_COINS) return false;
  mTargetIdx = BET_COINS.indexOf(e);
  const COIN_BET = window.sessionStorage.betCoin;
  if (!COIN_BET) return false;
  const COIN_BET_ARR = JSON.parse(COIN_BET);
  if (!COIN_BET_ARR || COIN_BET_ARR.length <= 0) return false;
  if (COIN_BET_ARR[mTargetIdx].host === 'enemy') return false;
  if (COIN_BET_ARR[mTargetIdx].betState === 'end') return false;
  return true;
};
