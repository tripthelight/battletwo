import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import sessionInit from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/sessionInit';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE.then((_data) => {
    // basicBet
    if (JSON.stringify(_data) === JSON.stringify([98, 97, 115, 105, 99, 66, 101, 116])) {
      // basicBet
      // const reloadUser = window.sessionStorage.playingReloadUser;
      const encryptKey1 = findCharCode([75, 81, 83, 80, 89, 88, 86, 72, 82, 77]); // playingReloadUser
      const encryptVal1 = window.sessionStorage.getItem(encryptKey1);

      // if (reloadUser && reloadUser === 'true') {
      // reloadUser === true
      if (
        encryptVal1 !== null &&
        encryptVal1 !== '' &&
        X.dec(encryptVal1)
      ) {
        // storageMethod('s', 'REMOVE_ITEM', 'playingReloadUser');
        storageMethod('s', 'REMOVE_ITEM', encryptKey1); // playingReloadUser

        storageMethod('s', 'SET_ITEM',
          findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]), // gameState
          findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]) // basicBet
        );

        storageMethod('s', 'SET_ITEM',
          findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]), // betState
          findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]) // basicBetting
        );

        storageMethod('s', 'SET_ITEM',
          findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]), // roundEnd
          X.enc(decodeTF(textDE([120, 111, 98, 105, 117]))) // "xobiu" : false
        );

        sessionInit();
      }
    }
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'remoteReloadBasicBetResult() 함수를 못탐' });
  });
};
