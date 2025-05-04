import { errorManagement } from '@/client/js/module/errorManagement';

export default () => {
  const BET_COIN_RES = window.sessionStorage.betCoin;
  if (!BET_COIN_RES) return errorManagement({ errCase: 'errorComn', message: '.betting-zone에서 .enemy-block으로 칩을 옯길 때 추가배팅이 빠진 betCoin 세션이 없습니다' });
  const BET_COIN_RES_ARR = JSON.parse(BET_COIN_RES);
  if (!BET_COIN_RES_ARR || BET_COIN_RES_ARR.length === 0) return errorManagement({ errCase: 'errorComn', message: 'round end에서 추가배팅이 빠진 betCoin 세션 개수가 0개입니다' });
  const BET_COIN_POS = window.sessionStorage.betCoinPos;
  if (!BET_COIN_POS) return errorManagement({ errCase: 'errorComn', message: '.betting-zone에서 .enemy-block으로 칩을 옯길 때 추가배팅이 빠진 betCoinPos 세션이 없습니다' });
  const BET_COIN_POS_ARR = JSON.parse(BET_COIN_POS);
  if (!BET_COIN_POS_ARR || BET_COIN_POS_ARR.length === 0) return errorManagement({ errCase: 'errorComn', message: 'round end에서 추가배팅이 빠진 betCoinPos 세션 개수가 0개입니다' });
  return BET_COIN_RES_ARR;
};
