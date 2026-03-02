import deviceStateStore from '@/client/store/deviceStateStore';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import evenOdd from "@/client/js/views/game/blackAndWhite1/fns/common/evenOdd";
import throwObj from '@/client/js/module/errorHandler/throwObj';
import cubeReady from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/cubeReady';

export default () => {
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
  for (let i = 0; i < 9; i++) {
    const PLAYER_CUBES_EL = document.createElement("li");
    if (encryptVal1 !== null && encryptVal1 !== "") {
      // const nums = encryptVal1.split(",").map(Number);
      const nums = JSON.parse(encryptVal1);
      PLAYER_CUBES_EL.innerHTML = nums[i];
    } else {
      PLAYER_CUBES_EL.innerHTML = i;
    }
    evenOdd(PLAYER_CUBES_EL);
    if (deviceState === "pc") PLAYER_CUBES_EL.setAttribute("draggable", true);
    PLAYER_CUBE_LIST_EL.appendChild(PLAYER_CUBES_EL);


    if (i === 8) {
      PLAYER_CUBES_EL.classList.add("last-cube")
    }


  };
  PLAYER_BLOCK_EL.appendChild(PLAYER_CUBE_LIST_EL);
  GAME_SCENE.appendChild(ENEMY_BLOCK_EL);
  GAME_SCENE.appendChild(PLAYER_BLOCK_EL);

  // 다음 단계
  cubeReady();
};
