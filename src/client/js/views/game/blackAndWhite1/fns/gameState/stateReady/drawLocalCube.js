import CryptoJS from "crypto-js";
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import deviceStateStore from '@/client/store/deviceStateStore';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import evenOdd from "@/client/js/views/game/blackAndWhite1/fns/common/evenOdd";
import throwObj from '@/client/js/module/errorHandler/throwObj';
import cubeReady from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/cubeReady';

export default () => {
  try {
    const GAME_SCENE = document.getElementById("gameScene");
    if (!GAME_SCENE) throw throwObj('elementLoss', 'drawLocalCube.js - gameScene failed.');
    const ENEMY_BLOCK = GAME_SCENE.querySelector(".enemy-block");
    const PLAYER_BLOCK = GAME_SCENE.querySelector(".player-block");

    if (ENEMY_BLOCK && PLAYER_BLOCK) {
      cubeReady();
      return; // 다음 단계
    };

    const deviceState = deviceStateStore.getState().deviceStateState.deviceState;

    const encryptKey1 = findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]); // playerNumOrder
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);

    const ENEMY_BLOCK_EL = document.createElement("div");
    const PLAYER_BLOCK_EL = document.createElement("div");
    const PLAYER_CUBE_LIST_EL = document.createElement("ul");
    ENEMY_BLOCK_EL.classList.add("enemy-block");
    PLAYER_BLOCK_EL.classList.add("player-block");
    PLAYER_CUBE_LIST_EL.classList.add("cube");

    if (!encryptVal1) {
      for (let i = 0; i < 9; i++) {
        const PLAYER_CUBES_EL = document.createElement("li");
        PLAYER_CUBES_EL.innerHTML = i;
        evenOdd(PLAYER_CUBES_EL);
        if (deviceState === "pc") PLAYER_CUBES_EL.setAttribute("draggable", true);
        PLAYER_CUBE_LIST_EL.appendChild(PLAYER_CUBES_EL);
      }
    } else {
      // 새로고침 후 진입
      const PVK = KEY?.prk ?? null; // private key
      if (!PVK) throw throwObj('errorComn', 'drawLocalCube - order decrypt key failed.');
      const bytes = CryptoJS.AES.decrypt(encryptVal1, PVK);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      // decrypted 가 빈 문자열이면 사용자가 storage value 조작함
      if (decrypted === "") throw throwObj('sessionStorageLoss', 'drawLocalCube - order decrypt value failed.');
      const playerNumOrder = [...decrypted].map(Number);
      for (let i = 0; i < playerNumOrder.length; i++) {
        const PLAYER_CUBES_EL = document.createElement("li");
        PLAYER_CUBES_EL.innerHTML = playerNumOrder[i];
        evenOdd(PLAYER_CUBES_EL);
        if (deviceState === "pc") PLAYER_CUBES_EL.setAttribute("draggable", true);
        PLAYER_CUBE_LIST_EL.appendChild(PLAYER_CUBES_EL);
      }
    }

    PLAYER_BLOCK_EL.appendChild(PLAYER_CUBE_LIST_EL);
    GAME_SCENE.appendChild(ENEMY_BLOCK_EL);
    GAME_SCENE.appendChild(PLAYER_BLOCK_EL);

    // 다음 단계
    cubeReady();
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'drawLocalCube.js error'
    );
  }
};
