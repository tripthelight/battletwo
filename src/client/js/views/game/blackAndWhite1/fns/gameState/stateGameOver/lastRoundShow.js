import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import CryptoJS from 'crypto-js';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import gameOverRes from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/gameOverRes";
import lastRoundBtn from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/lastRoundBtn";
import setStorageGameResult from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/setStorageGameResult";

export default (result) => {
  try {
    const PVK = KEY?.prk ?? null; // private key
    if (!PVK) throw throwObj('errorComn', 'lastRoundShow - order decrypt key failed.');

    const encryptKey1 = findCharCode([71, 73, 69, 77, 83, 78, 89, 88, 82, 66]); // result
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
    if (!encryptVal1) throw throwObj('sessionStorageLoss', 'lastRoundShow - result value failed.');

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

      const bytes = CryptoJS.AES.decrypt(encryptVal1, PVK);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      // decrypted 가 빈 문자열이면 사용자가 storage value 조작함
      if (decrypted === "") throw throwObj('sessionStorageLoss', 'lastRoundShow - order decrypt value failed.');
      // 1. 객체 키를 큰따옴표로 감싸기
      const jsonStr = decrypted.replace(/(\w+)\s*:/g, '"$1":');
      // 2. 문자열 값도 작은따옴표 → 큰따옴표
      const resultStr = jsonStr.replace(/'([^']*)'/g, '"$1"');
      const resultObj = JSON.parse(resultStr);

      for (let i = 0; i < resultObj.length; i++) {
        listUl = document.createElement("ul");
        innerList = document.createElement("li");
        innerList.innerHTML = resultObj[i].round;
        listUl.appendChild(innerList);
        innerList = document.createElement("li");
        // innerList.innerHTML = resultObj[i].result == "die" ? "lose" : resultObj[i].result;
        const r = dec(resultObj[i].result);
        innerList.innerHTML = r === 0 ? "lose" : r === 1 ? "win" : r === 2 ? "drew" : "";
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
    setStorageGameResult("blackandwhite1", result);
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'lastRoundShow.js error'
    );
  }
};
