import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import sessionInit from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/sessionInit';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE.then((_data) => {
    if (_data === 'basicBet') {
      if (window.sessionStorage.gameState === 'basicBet') {
        window.sessionStorage.setItem('roundEnd', false);
        setTimeout(sessionInit, timeInterval_1);
      } else if (window.sessionStorage.gameState !== 'basicBet') {
        window.sessionStorage.setItem('basicBetReady', false);
      }
    }
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'enterBasicBetResult() 함수를 못탐' });
  });
};
