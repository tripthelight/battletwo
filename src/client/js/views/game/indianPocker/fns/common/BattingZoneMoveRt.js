import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import X from '@/client/js/module/crypts/bool-obf';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default () => {
  // const BET_COIN_RES = window.sessionStorage.betCoin;
  const encryptKey1 = findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]); // betCoin
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
  // if (!BET_COIN_RES) return errorManagement({ errCase: 'sessionStorageLoss', message: '.betting-zone에서 .enemy-block으로 칩을 옯길 때 추가배팅이 빠진 betCoin 세션이 없습니다' });
  if (encryptVal1 === null) throw throwObj('sessionStorageLoss', '.betting-zone에서 .enemy-block으로 칩을 옯길 때 추가배팅이 빠진 betCoin 세션이 없습니다');

  // const BET_COIN_RES_ARR = JSON.parse(BET_COIN_RES);
  const BET_COIN_RES_ARR = JSON.parse(encryptVal1);
  if (!BET_COIN_RES_ARR || BET_COIN_RES_ARR.length === 0) return errorManagement({ errCase: 'sessionStorageLoss', message: 'round end에서 추가배팅이 빠진 betCoin 세션 개수가 0개입니다' });

  // const BET_COIN_POS = window.sessionStorage.betCoinPos;
  const encryptKey2 = findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]); // betCoinPos
  const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);
  // if (!BET_COIN_POS) return errorManagement({ errCase: 'sessionStorageLoss', message: '.betting-zone에서 .enemy-block으로 칩을 옯길 때 추가배팅이 빠진 betCoinPos 세션이 없습니다' });
  if (encryptVal2 === null) throw throwObj('sessionStorageLoss', '.betting-zone에서 .enemy-block으로 칩을 옯길 때 추가배팅이 빠진 betCoinPos 세션이 없습니다');
  const BET_COIN_POS_ARR = JSON.parse(encryptVal2);
  if (!BET_COIN_POS_ARR || BET_COIN_POS_ARR.length === 0) return errorManagement({ errCase: 'sessionStorageLoss', message: 'round end에서 추가배팅이 빠진 betCoinPos 세션 개수가 0개입니다' });

  return BET_COIN_RES_ARR;
};
