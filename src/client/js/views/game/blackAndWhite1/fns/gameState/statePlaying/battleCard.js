import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import cubeToNum from '@/client/js/views/game/blackAndWhite1/fns/common/cubeToNum';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr, obfuscateInt32 } from '@/client/js/module/crypts/encryptNumber';
import _t from '@/client/js/module/crypts/textDE';
import showBattleResult from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/showBattleResult";
import { request } from '@/client/js/network/blackAndWhite1/request';
import { getCurrentRound } from '@/client/js/views/game/blackAndWhite1/fns/common/roundResultStorage';

export default (remoteCardNum) => {
  try {
    const remoteNum = Number(remoteCardNum);
    if (!Number.isInteger(remoteNum) || remoteNum < 0 || remoteNum > 8) {
      throw throwObj('dataManipulation', 'battleCard - remote cube number failed.');
    }

    // const MY_CARD = Number(window.sessionStorage.getItem("beforePlayerNum"));

    const encryptKey1 = findCharCode([65, 69, 68, 79, 82, 85, 78, 80, 90, 75]); // beforePlayerNum
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
    if (!encryptVal1) {
      throw throwObj('sessionStorageLoss', 'battleCard - beforePlayerNum value failed.');
    }
    const decryptVal1 = cubeToNum(encryptVal1);

    const R = Object.create(null);

    // if (MY_CARD > remoteCardNum) {
    if (decryptVal1 > remoteNum) {
      // 내가 이김
      // R.result = "win";
      // R.resultSend = "die";
      R.result = enc(encryptNumOfStr(_t([119, 119, 101, 101, 119, 119, 119, 98]))); // "wweewwwb" : 1 : win
      R.resultSend = enc(encryptNumOfStr(_t([119, 119, 101, 101, 119, 119, 119, 101]))); // "wweewwwe" : 0 : die
    // } else if (MY_CARD < remoteCardNum) {
    } else if (decryptVal1 < remoteNum) {
      // 내가 짐
      // R.result = "die";
      // R.resultSend = "win";
      R.result = enc(encryptNumOfStr(_t([101, 119, 119, 101, 119, 119, 119, 119]))); // "ewwewwww" : 0 : die
      R.resultSend = enc(encryptNumOfStr(_t([119, 119, 101, 119, 101, 101, 119, 114]))); // "wweweewr" : 1 : win
    // } else if (MY_CARD === remoteCardNum) {
    } else if (decryptVal1 === remoteNum) {
      // 비김
      // R.result = "drew";
      // R.resultSend = "drew";
      R.result = enc(encryptNumOfStr(_t([119, 101, 119, 101, 119, 101, 119, 101, 112]))); // "wewewewep" : 2 : drew
      R.resultSend = enc(encryptNumOfStr(_t([101, 101, 119, 101, 119, 119, 101, 54]))); // "eewewwe6" : 2 : drew
    } else {
      // error
      throw throwObj('sessionStorageLoss', 'battleCard - remote cube number faild.');
    }
    const roundNumber = getCurrentRound();
    showBattleResult(R.result, roundNumber);

    request("resultRound", {
      resultSend: obfuscateInt32(dec(R.resultSend)),
      roundCode: obfuscateInt32(roundNumber),
    });

  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'battleCard.js error'
    );
  }
};
