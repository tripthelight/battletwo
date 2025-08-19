import findCharCode from '@/client/js/functions/findCharCode';
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
      const encryptVal = findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]); // basicBet
      const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
      // basicBet
      const reloadUser = window.sessionStorage.playingReloadUser;
      if (reloadUser && reloadUser === 'true') {
        storageMethod('s', 'REMOVE_ITEM', 'playingReloadUser');
        // storageMethod('s', 'SET_ITEM', 'betState', 'basicBet');
        storageMethod('s', 'SET_ITEM', encryptKey1, encryptVal);
        storageMethod('s', 'SET_ITEM', 'roundEnd', false);
        sessionInit();
      }
    }
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'remoteReloadBasicBetResult() 함수를 못탐' });
  });
};
