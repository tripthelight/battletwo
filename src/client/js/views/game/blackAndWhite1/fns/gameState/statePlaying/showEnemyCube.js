import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import cubesStyle from "@/client/js/views/game/blackAndWhite1/fns/common/cubesStyle";
import CryptoJS from "crypto-js";
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import cubeAddColor from '@/client/js/views/game/blackAndWhite1/fns/common/cubeAddColor';
import drawEnemyBlackSquare from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawEnemyBlackSquare";

export default () => {
  try {
    const PVK = KEY?.prk ?? null; // public key
    if (!PVK) throw throwObj('errorComn', 'showEnemyCube - order decrypt key failed.');

    const ENEMY_BLOCK_LIST = document.querySelector(".enemy-block-list");
    if (!ENEMY_BLOCK_LIST) {
      const enemyCubeList = document.createElement("ul");
      enemyCubeList.classList.add("enemy-block-list");
      const encryptKey1 = findCharCode([86, 82, 88, 89, 90, 72, 71, 84, 74, 85]); // emenyCube
      const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);

      const bytes = CryptoJS.AES.decrypt(encryptVal1, PVK);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      // decrypted 가 빈 문자열이면 사용자가 storage value 조작함
      if (decrypted === "") throw throwObj('sessionStorageLoss', 'showEnemyCube - order decrypt value failed.');

      const cubeArr = decrypted.split(",");

      const w = cubesStyle().w;
      const h = cubesStyle().h;
      for (let i = 0; i < cubeArr.length; i++) {
        const enemyCubeBlock = document.createElement("li");
        enemyCubeBlock.style.width = w + "px";
        enemyCubeBlock.style.height = h + "px";
        enemyCubeBlock.classList.add(cubeAddColor(cubeArr[i]));
        enemyCubeList.appendChild(enemyCubeBlock);
      }
      const ENEMY_BLOCK = document.querySelector("#gameScene .enemy-block");
      if (ENEMY_BLOCK) {
        ENEMY_BLOCK.appendChild(enemyCubeList);
        drawEnemyBlackSquare();
      }
    }
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'showEnemyCube.js error'
    );
  }
};
