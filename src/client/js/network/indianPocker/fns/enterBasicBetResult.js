import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';
import sessionInit from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/sessionInit';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE.then((_data) => {
    // if (_data === 'basicBet') {
    // basicBet
    const encryptVal = findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]);
    if (_data === encryptVal) {
      // gameState: sessionStorage.getItem('gameState'),
      const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]);
      const decryptVal = window.sessionStorage.getItem(encryptKey);
      // if (window.sessionStorage.gameState === 'basicBet') {
      if (decryptVal === encryptVal) {
        storageMethod('s', 'SET_ITEM', 'roundEnd', false);
        setTimeout(sessionInit, timeInterval_1);
        // } else if (window.sessionStorage.gameState !== 'basicBet') {
      } else if (decryptVal !== encryptVal) {
        storageMethod('s', 'SET_ITEM', 'basicBetReady', false);
      }
    }
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'enterBasicBetResult() 함수를 못탐' });
  });
};
