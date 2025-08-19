import findCharCode from '@/client/js/functions/findCharCode';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { SET_BASIC_BETTING } from '@/client/js/views/game/indianPocker/fns/stateBasicBetting/setBasicBetting';
import extraBettingCheck from '@/client/js/views/game/indianPocker/fns/common/extraBettingCheck';

export default () => {
  const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  const encryptKey2 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
  // if (window.sessionStorage.betState === 'basicBetting') {
  if (encryptVal1 ===encryptKey2) {
    SET_BASIC_BETTING.basicBettingBetStateCheck();
  // } else if (window.sessionStorage.betState === 'extraBetting') {
  } else if (encryptVal1 === 'extraBetting') {
    extraBettingCheck();
  } else {
    console.log('error - betStateCheck.js - window.sessionStorage.betState');
    return errorManagement({ errCase: 'errorComn' });
  };
};
