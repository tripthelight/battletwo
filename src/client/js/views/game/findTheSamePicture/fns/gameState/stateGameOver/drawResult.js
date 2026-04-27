import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';

import resultWin from "@/client/js/views/game/findTheSamePicture/fns/gameState/stateGameOver/resultWin";
import resultLose from "@/client/js/views/game/findTheSamePicture/fns/gameState/stateGameOver/resultLose";
import setStorageGameResult from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/setStorageGameResult";

// true / false module
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';

export default (_state) => {
  // window.sessionStorage.setItem("clickUser", false);
  storageMethod('s', 'SET_ITEM',
    findCharCode([75, 77, 88, 72, 80, 73, 86, 71, 67, 78]), // clickUser
    X.enc(decodeTF(_t([100, 111, 98, 105, 97]))) // "dobia" : false
  );

  // const RESULT = window.sessionStorage.result;
  // if (RESULT) {
  //   window.sessionStorage.setItem("result", RESULT === "true" ? true : false);
  // } else {
  //   window.sessionStorage.setItem("result", _state);
  // }

  // const RESULT_RES = window.sessionStorage.result;
  const encryptKey1 = findCharCode([67, 72, 86, 68, 83, 77, 74, 65, 88, 78]); // result
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  // if (RESULT_RES === "true") {
  if (X.dec(encryptVal1)) {
    // 이김
    resultWin();
  } else {
    // 짐
    resultLose();
  }

  // 게임 결과를 localStorage에 저장
  // const RES_BOOLEAN = window.sessionStorage.result === "true" ? true : false;
  // setStorageGameResult("findsamepicture", RES_BOOLEAN);
  setStorageGameResult("findsamepicture", encryptVal1 === "true" ? true : false);
};
