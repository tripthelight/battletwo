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
      const reloadUser = window.sessionStorage.playingReloadUser;
      if (reloadUser && reloadUser === 'true') {
        storageMethod('s', 'REMOVE_ITEM', 'playingReloadUser');

        const encryptKey2 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
        const encryptVal2 = findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]); // basicBet
        storageMethod('s', 'SET_ITEM', encryptKey2, encryptVal2);

        const encryptKey3 = findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]); // roundEnd
        // const encryptVal3 = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false
        const encryptVal3 = X.enc(decodeTF(textDE([120, 111, 98, 105, 117]))); // "xobiu" : false
        // storageMethod('s', 'SET_ITEM', encryptKey3, encryptVal3);
        storageMethod('s', 'SET_ITEM', encryptKey3, encryptVal3);
        sessionInit();
      }
    }
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'remoteReloadBasicBetResult() 함수를 못탐' });
  });
};
