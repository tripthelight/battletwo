import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';
import sessionInit from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/sessionInit';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE.then((_data) => {
    // basicBet
    if (JSON.stringify(_data) === JSON.stringify([98, 97, 115, 105, 99, 66, 101, 116])) {
      const encryptVal = findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]); // basicBet
      const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
      const decryptVal = window.sessionStorage.getItem(encryptKey);
      if (decryptVal === encryptVal) {
        storageMethod('s', 'SET_ITEM', 'roundEnd', false);
        sessionInit();
      } else if (decryptVal !== encryptVal) {
        storageMethod('s', 'SET_ITEM', 'basicBetReady', false);
      }
    } else {
      // TODO: error 처리
    };
  }).catch((error) => {
    console.log('error : ', error);

    errorManagement({ errCase: 'errorComn', message: 'enterBasicBetResult() 함수를 못탐' });
  });
};
