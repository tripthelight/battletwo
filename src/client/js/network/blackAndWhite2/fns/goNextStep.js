import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF, { decodeTF_readable } from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import { request } from '@/client/js/network/blackAndWhite2/request';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import blackAndWhite2GameState from '@/client/js/gameState/blackAndWhite2';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then(({
      ready: remotePeerReady
    }) => {
      if (decodeTF_readable(remotePeerReady)) { // true
        storageMethod("s", "SET_ITEM",
          findCharCode([84, 79, 80, 68, 70, 86, 82, 87, 85, 74]), // remoteReady
          X.enc(decodeTF(_t([107, 119, 114, 97]))) // "kwra" : true
        );
      }

      const encryptKey1 = findCharCode([90, 67, 66, 79, 89, 70, 86, 76, 71, 72]) // localReady key
      const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
      if (!encryptVal1 || encryptVal1 === "") {
        // Local 준비 X
      } else {
        if (X.dec(encryptVal1)) {
          // Local 준비 O
          if (decodeTF_readable(remotePeerReady)) { // true
            // *** 다음 STEP 진행 전 ready sessionStorage 제거
            storageMethod('s', 'REMOVE_ARR', '', '', [
              findCharCode([90, 67, 66, 79, 89, 70, 86, 76, 71, 72]), // localReady
              findCharCode([84, 79, 80, 68, 70, 86, 82, 87, 85, 74]), // remoteReady key
              findCharCode([75, 69, 86, 83, 70, 82, 85, 73, 90, 87]), // enemyNick
            ]);
            // *** 다음 STEP 진행
            blackAndWhite2GameState.playing();
          }
        }
      }
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
