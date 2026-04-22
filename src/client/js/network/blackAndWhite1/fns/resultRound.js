import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import { deobfuscateInt32 } from '@/client/js/module/crypts/encryptNumber';
import _t from '@/client/js/module/crypts/textDE';

import errorManager from '@/client/js/module/errorHandler/errorManager';
import showBattleResult from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/showBattleResult";

/**
 * @param {string} _data 난독화된 round result 문자열 : "win", "die", "drew" 중 하나
 */
export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then((_data) => {
      console.log("resultRound DATA ::::::: ", _data);
      const { resultSend } = _data;
      // console.log("resultRound RES ::::::: ", dec(resultSend));

      /* let result = "";
      switch (resultSend) {
        case dec(enc(encryptNumOfStr(_t([119, 101, 101, 101, 101, 119, 119, 98])))): // "weeeewwb" : 1 : win
          result = "win";
          break;
        case dec(enc(encryptNumOfStr(_t([101, 101, 119, 119, 101, 119, 119, 119])))): // "eewwewww" : 0 : die
          result = "die";
          break;
        case dec(enc(encryptNumOfStr(_t([119, 119, 101, 101, 119, 101, 101, 112])))): // "wweeweep" : 2 : drew
          result = "drew";
          break;
        default:
          // error
          throw throwObj('dataManipulation', 'resultRound - round result data failed.');
      }; */

      // showBattleResult(result);
      // showBattleResult(resultSend);

      showBattleResult(enc(deobfuscateInt32(resultSend)));
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
