import findCharCode from '@/client/js/functions/findCharCode';
import errorManager from '@/client/js/module/errorHandler/errorManager';

import betStateCheck from '@/client/js/views/game/indianPocker/fns/common/betStateCheck';

export default () => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve();
  });
  PROMISE
    .then(() => {
      const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
      const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
      const encryptKey2 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
      if (encryptVal1 === encryptKey2) {
        betStateCheck();
      };
    })
    .catch((error) => {
      console.log('error basicBettingCompleted.js');
      errorManager(error, true);
    });
};
