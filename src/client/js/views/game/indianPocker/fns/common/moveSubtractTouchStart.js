import { errorManagement } from '@/client/js/module/errorManagement';
import { mTargetIdx, mtX, mtY, selectX, selectY } from '@/client/js/views/game/indianPocker/fns/common/variable';
import touchCoinState from '@/client/js/views/game/indianPocker/fns/common/touchCoinState';

export default (e) => {
  if (!touchCoinState(e.target)) return;
  const BET_COIN_POS = window.sessionStorage.betCoinPos;
  if (!BET_COIN_POS) return;
  const BET_COIN_ARR = JSON.parse(BET_COIN_POS);
  if (!BET_COIN_ARR || BET_COIN_ARR.length <= 0) return;
  const BET_COINS = Array.from(e.target.closest('ul').children);
  if (!BET_COINS) return errorManagement({ errCase: 'errorComn' });
  mTargetIdx = BET_COINS.indexOf(e.target);
  mtX = BET_COIN_ARR[mTargetIdx].translateX;
  mtY = BET_COIN_ARR[mTargetIdx].translateY;
  selectX = e.targetTouches[0].clientX;
  selectY = e.targetTouches[0].clientY;
};
