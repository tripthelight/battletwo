import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import cubeToNum from '@/client/js/views/game/blackAndWhite1/fns/common/cubeToNum';
import showBattleResult from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/showBattleResult";
import { request } from '@/client/js/network/blackAndWhite1/request';

export default (remoteCardNum) => {
  // const MY_CARD = Number(window.sessionStorage.getItem("beforePlayerNum"));

  const encryptKey1 = findCharCode([65, 69, 68, 79, 82, 85, 78, 80, 90, 75]); // beforePlayerNum
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
  const decryptVal1 = cubeToNum(encryptVal1);

  let result = "";
  let resultSend = "";
  // if (MY_CARD > remoteCardNum) {
  if (decryptVal1 > remoteCardNum) {
    // 내가 이김
    result = "win";
    resultSend = "die";
  // } else if (MY_CARD < remoteCardNum) {
  } else if (decryptVal1 < remoteCardNum) {
    // 내가 짐
    result = "die";
    resultSend = "win";
  // } else if (MY_CARD === remoteCardNum) {
  } else if (decryptVal1 === remoteCardNum) {
    // 비김
    result = "drew";
    resultSend = "drew";
  } else {
    // error
    // return waitEnemy(err);
  }
  showBattleResult(result);

  request("resultRound", { resultSend });
};
