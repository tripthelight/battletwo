import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import removeCoinActive from '@/client/js/views/game/indianPocker/fns/common/removeCoinActive';
import moveCoins from '@/client/js/views/game/indianPocker/fns/common/moveCoins';

export default () => {
  // element | seeeion 체크
  // const BET_STATE = window.sessionStorage.betState;
  // if (!BET_STATE) return errorManagement({ errCase: 'sessionStorageLoss', message: 'betState 세션이 없습니다.' });
  // if (BET_STATE !== 'basicBetting') return errorManagement({ errCase: 'sessionStorageLoss', message: 'basicBetting 세션의 값이 잘못되었습니다.' });
  const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  if (encryptVal1 === null || (encryptVal1 !== null && encryptVal1 === '')) throw throwObj('sessionStorageLoss', 'betState 세션이 없습니다.');
  // betState !== basicBetting
  if (encryptVal1 !== findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65])) throw throwObj('sessionStorageLoss', 'basicBetting 세션의 값이 잘못되었습니다.');

  // const BASIC_BETTING_STATE = window.sessionStorage.basicBettingState;
  // if (!BASIC_BETTING_STATE) return errorManagement({ errCase: 'sessionStorageLoss', message: 'basicBettingState 세션이 없습니다.' });
  const encryptKey2 = findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]); // basicBettingState
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  if (encryptVal2 === null || (encryptVal2 !== null && encryptVal2 === '')) throw throwObj('sessionStorageLoss', 'basicBettingState 세션이 없습니다.');
  const decryptVal2 = X.dec(encryptVal2);

  // 명령
  // console.log('BASIC_BETTING_STATE :: ', BASIC_BETTING_STATE);
  // if (BASIC_BETTING_STATE === 'true') {
  // basicBettingState === true
  if (decryptVal2) {
    removeCoinActive();
  // } else if (BASIC_BETTING_STATE === 'false') {
  // basicBettingState === false
  } else if (!decryptVal2) {
    moveCoins();
  } else {
    // return errorManagement({ errCase: 'sessionStorageLoss', message: 'BASIC_BETTING_STATE 세션의 값이 잘못되었습니다.' });
    throw throwObj('sessionStorageLoss', 'bettingCoin - basicBettingState sessionStorage Value failed.');
  };
  LOADING_EVENT.hide();
};
