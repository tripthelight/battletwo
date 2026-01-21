import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import playerCoinsData from '@/client/js/views/game/indianPocker/fns/common/playerCoinsData';
import { SET_BASIC_BETTING } from '@/client/js/views/game/indianPocker/fns/stateBasicBetting/setBasicBetting';

export default (_event) => {
  const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  const encryptVal2 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
  const encryptVal3 = findCharCode([77, 86, 83, 87, 69, 73, 72, 88, 80, 89]); // extraBetting
  // if (window.sessionStorage.betState === 'basicBetting') {
  // betState === basicBetting

  if (encryptVal1 === encryptVal2) {
    // 기본 배팅
    SET_BASIC_BETTING.setBasicBetting(_event);
  // } else if (window.sessionStorage.betState === 'extraBetting') {
  // betState === extraBetting
  } else if (encryptVal1 === encryptVal3) {
    // 추가 배팅
    playerCoinsData(_event);
  } else {
    // error
    throw throwObj('sessionStorageLoss', 'betCoinEndComn - betState sessionStorage value failed.');
  }
};
