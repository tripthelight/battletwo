import findCharCode from '@/client/js/functions/findCharCode';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import playerCoinsData from '@/client/js/views/game/indianPocker/fns/common/playerCoinsData';
import { SET_BASIC_BETTING } from '@/client/js/views/game/indianPocker/fns/stateBasicBetting/setBasicBetting';

export default (_event) => {
  const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  const encryptKey2 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
  // if (window.sessionStorage.betState === 'basicBetting') {
  if (encryptVal1 === encryptKey2) {
    // 기본 배팅
    SET_BASIC_BETTING.setBasicBetting(_event);
  // } else if (window.sessionStorage.betState === 'extraBetting') {
  } else if (encryptVal1 === 'extraBetting') {
    // 추가 배팅
    playerCoinsData(_event);
  } else {
    // error
    return errorManagement({ errCase: 'errorComn', message: 'betState 세션의 값이 잘못되었습니다.' });
  }
};
