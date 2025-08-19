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
      const encryptKey1 = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
      const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
      const encryptVal2 = findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]); // basicBet
      const encryptVal3 = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false
      if (encryptVal1 === encryptVal2) {
        const encryptKey2 = findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]); // roundEnd
        storageMethod('s', 'SET_ITEM', encryptKey2, encryptVal3);
        sessionInit();
      } else if (encryptVal1 !== encryptVal2) {
        const encryptKey3 = findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]); // basicBetReady
        storageMethod('s', 'SET_ITEM', encryptKey3, encryptVal3);
      }
    } else {
      // TODO: error 처리
    };
  }).catch((error) => {
    console.log('error : ', error);

    errorManagement({ errCase: 'errorComn', message: 'enterBasicBetResult() 함수를 못탐' });
  });
};
