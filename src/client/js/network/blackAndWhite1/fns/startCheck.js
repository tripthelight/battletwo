import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import { request } from '@/client/js/network/blackAndWhite1/request';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import startState from '@/client/js/network/blackAndWhite1/fns/startState';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then((_data) => {
      if (_data.rdy) {
        storageMethod("s", "SET_ITEM",
          findCharCode([66, 79, 83, 65, 89, 81, 74, 68, 87, 70]), // enemyShuffleState
          X.enc(decodeTF(_t([115, 102, 112, 117]))) // "sfpu" : true
        );
        storageMethod("s", "SET_ITEM",
          findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90]), // enemyNick
          _data.nick
        );
      } else {
        // request("startState", { stat: "enemyReadyEnd" });
      };
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
