import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import CryptoJS from 'crypto-js';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import lastRoundState from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/lastRoundState";
import lastRoundShow from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/lastRoundShow";

export default () => {
  try {
    const PVK = KEY?.prk ?? null; // private key
    if (!PVK) throw throwObj('errorComn', 'lastRoundResult - order decrypt key failed.');

    const encryptKey1 = findCharCode([71, 73, 69, 77, 83, 78, 89, 88, 82, 66]); // result
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);

    const bytes = CryptoJS.AES.decrypt(encryptVal1, PVK);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    // decrypted 가 빈 문자열이면 사용자가 storage value 조작함
    if (decrypted === "") throw throwObj('sessionStorageLoss', 'lastRoundResult - order decrypt value failed.');

    // 1. 객체 키를 큰따옴표로 감싸기
    const jsonStr = decrypted.replace(/(\w+)\s*:/g, '"$1":');
    // 2. 문자열 값도 작은따옴표 → 큰따옴표
    const resultStr = jsonStr.replace(/'([^']*)'/g, '"$1"');
    const resultObj = JSON.parse(resultStr);

    const resultCase = {
      win: 0,
      die: 0,
      drew: 0,
    };

    for (let i = 0; i < resultObj.length; i++) {
      const r = dec(resultObj[i].result);
      if (r === 1) { // win
        resultCase.win += 1;
      } else if (r === 0) { // die
        resultCase.die += 1;
      } else if (r === 2) { // drew
        resultCase.drew += 1;
      }
    };

    const result = lastRoundState(resultCase.win, resultCase.die, resultCase.drew);
    lastRoundShow(result);

  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'lastRoundResult.js error'
    );
  }


  /*
  const RESULT_VALUE = window.sessionStorage.getItem("result");
  const RESULT_ARR = JSON.parse(RESULT_VALUE);
  let win = 0;
  let die = 0;
  let drew = 0;
  for (let i = 0; i < RESULT_ARR.length; i++) {
    if (RESULT_ARR[i].result === "win") {
      win += 1;
    } else if (RESULT_ARR[i].result === "die") {
      die += 1;
    } else if (RESULT_ARR[i].result === "drew") {
      drew += 1;
    }
  }
  const result = lastRoundState(win, die, drew);
  lastRoundShow(result);
  */
};
