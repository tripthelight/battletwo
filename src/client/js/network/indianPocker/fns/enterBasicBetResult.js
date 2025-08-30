import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import errorManager from '@/client/js/module/errorHandler/errorManager';
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
      if (encryptVal1 === encryptVal2) {
        const encryptKey2 = findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]); // roundEnd
        const encryptVal4 = X.enc(decodeTF(textDE([106, 103, 118, 105, 97]))); // "jgvia" : false
        storageMethod('s', 'SET_ITEM', encryptKey2, encryptVal4);

        console.log('sessionInit 진입 - enterBasicBetResult 받고 진입');

        sessionInit();
      } else if (encryptVal1 !== encryptVal2) {
        storageMethod('s', 'SET_ITEM',
          findCharCode([72, 81, 73, 79, 83, 70, 78, 80, 75, 88]), // basicBetReady
          X.enc(decodeTF(textDE([100, 111, 98, 101, 97]))) // "dobea" : false
        );
      }
    } else {
      // TODO: error 처리
    };
  }).catch((error) => {
    console.log('enterBasicBetResult() function error.');
    errorManager(error, true);
  });
};
