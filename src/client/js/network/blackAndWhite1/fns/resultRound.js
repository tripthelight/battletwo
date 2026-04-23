import { enc } from '@/client/js/module/crypts/obf8lower';
import { deobfuscateInt32 } from '@/client/js/module/crypts/encryptNumber';

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
      const { resultSend, roundCode } = _data;

      const roundNumber = roundCode ? deobfuscateInt32(roundCode) : undefined;
      showBattleResult(enc(deobfuscateInt32(resultSend)), roundNumber);
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
