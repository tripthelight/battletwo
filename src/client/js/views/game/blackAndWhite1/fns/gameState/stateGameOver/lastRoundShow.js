import { dec } from '@/client/js/module/crypts/obf8lower';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import returnResult from '@/client/js/views/game/blackAndWhite1/fns/common/returnResult';
import gameOverRes from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/gameOverRes";
import lastRoundBtn from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/lastRoundBtn";
import setStorageGameResult from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/setStorageGameResult";
import { loadRoundResults } from '@/client/js/views/game/blackAndWhite1/fns/common/roundResultStorage';

const gameResultSavedKey = () => findCharCode([76, 81, 82, 83, 86, 87, 80, 88, 84, 65]);
const encryptedTrue = () => X.enc(decodeTF(_t([107, 119, 112, 117]))); // "kwpu" : true

const isGameResultSaved = () => {
  const value = storageMethod('s', 'GET_ITEM', gameResultSavedKey());
  if (!value) return false;

  try {
    return X.dec(value);
  } catch {
    return false;
  }
};

const saveGameResultOnce = (result) => {
  if (isGameResultSaved()) return;

  setStorageGameResult("blackandwhite1", result);
  storageMethod('s', 'SET_ITEM', gameResultSavedKey(), encryptedTrue());
};

export default (result) => {
  try {
    const res = gameOverRes(result);
    const RESULT_INFO = document.querySelector(".last-round-info");
    if (!RESULT_INFO) {
      const elem = document.createElement("div");
      const tit = document.createElement("span");
      const list = document.createElement("div");
      let listUl;
      let innerList;
      elem.classList.add("last-round-info");
      list.classList.add("list");
      tit.innerHTML = res;

      const resultObj = loadRoundResults();

      console.log("이게 문제 ? ", resultObj);


      for (let i = 0; i < resultObj.length; i++) {
        listUl = document.createElement("ul");
        innerList = document.createElement("li");
        innerList.innerHTML = resultObj[i].round;
        listUl.appendChild(innerList);
        innerList = document.createElement("li");
        innerList.innerHTML = returnResult(dec(resultObj[i].result));
        listUl.appendChild(innerList);
        list.appendChild(listUl);
      }

      elem.appendChild(tit);
      elem.appendChild(list);
      const CONTAINER_EL = document.getElementById("container");
      if (CONTAINER_EL) {
        CONTAINER_EL.appendChild(elem);
        lastRoundBtn(elem);
      }
    }

    // win | lose | drew
    saveGameResultOnce(result);
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'lastRoundShow.js error'
    );
  }
};
