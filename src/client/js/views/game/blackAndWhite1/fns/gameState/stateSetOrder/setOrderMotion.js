import fromUnicodePoints from '@/client/js/module/unicode/fromUnicodePoints';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findNickname from '@/client/js/functions/findNickname';
import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import { timeInterval_4200, timeInterval_5200 } from "@/client/js/functions/variable";
import { parsePayloadToHex } from '@/client/js/module/crypts/obf_u32_xor_prng_b64';
import gameState from '@/client/js/gameState/blackAndWhite1';
import motionStyle from "@/client/js/views/game/blackAndWhite1/fns/common/motionStyle";
import { syncGameStateEntry } from '@/client/js/views/game/blackAndWhite1/fns/common/gameStateSync';

export default () => {
  if (!document.querySelector(".order-motion")) {
    let aniState = false;
    const elem = document.createElement("div");
    const playerDl = document.createElement("dl");
    const playerDt = document.createElement("dt");
    const playerDd = document.createElement("dd");
    const playerFront = document.createElement("span");
    const playerBack = document.createElement("span");
    const enemyDl = document.createElement("dl");
    const enemyDt = document.createElement("dt");
    const enemyDd = document.createElement("dd");
    const enemyFront = document.createElement("span");
    const enemyBack = document.createElement("span");
    playerFront.classList.add("fornt");
    playerBack.classList.add("back");
    enemyFront.classList.add("fornt");
    enemyBack.classList.add("back");
    elem.classList.add("order-motion");

    const LOCAL_PEER = findNickname('localPlayer'); // my nick name
    // const REMOTE_PEER = fromUnicodePoints(
    //     storageMethod("s", "GET_ITEM", findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90])) // enemyNick
    //       .replace(/"/g, '')
    //       .split(',')
    //       .map((s) => s.trim()),
    //   );
    const REMOTE_PEER = fromUnicodePoints(
      parsePayloadToHex(
        storageMethod("s", "GET_ITEM", findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90]))  // enemyNick
      )
    );
    const encryptKey1 = findCharCode([73, 81, 90, 83, 68, 86, 69, 89, 78, 70]); // firstUser
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);

    if (!encryptVal1) {
      // TODO: 에러처리 필요
      console.warn("firstUser 없음");
      return;
    };

    if (encryptVal1 === storageMethod("l", "GET_ITEM", "localPlayer")) {
      // 내가 firstUser
      playerFront.innerText = LOCAL_PEER;
      enemyFront.innerText = LOCAL_PEER;
      playerBack.innerText = REMOTE_PEER;
      enemyBack.innerText = REMOTE_PEER;
    } else {
      // 상대가 firstUser
      playerFront.innerText = REMOTE_PEER;
      enemyFront.innerText = REMOTE_PEER;
      playerBack.innerText = LOCAL_PEER;
      enemyBack.innerText = LOCAL_PEER;
    };

    playerDd.appendChild(playerFront);
    playerDd.appendChild(playerBack);
    playerDl.appendChild(playerDt);
    playerDl.appendChild(playerDd);
    enemyDd.appendChild(enemyFront);
    enemyDd.appendChild(enemyBack);
    enemyDl.appendChild(enemyDt);
    enemyDl.appendChild(enemyDd);
    elem.appendChild(playerDl);
    elem.appendChild(enemyDl);
    const ENOTAINER_EL = document.getElementById("container");
    if (ENOTAINER_EL) {
      ENOTAINER_EL.appendChild(elem);
      aniState = true;
    }
    const aniInterval = setInterval(() => {
      if (aniState === true) {
        clearInterval(aniInterval);
        motionStyle(elem);
      }
    }, 1);
    setTimeout(() => {
      clearInterval(aniInterval);
    }, timeInterval_4200);
    setTimeout(() => {
      elem.classList.remove("active");
      syncGameStateEntry('playing', () => {
        gameState.playing();
      });
    }, timeInterval_4200);
    setTimeout(() => {
      elem.remove();
    }, timeInterval_5200);
  }
};
