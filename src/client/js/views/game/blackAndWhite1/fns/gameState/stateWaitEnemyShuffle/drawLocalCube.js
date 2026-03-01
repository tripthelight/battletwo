import { getStyle } from '@/client/js/functions/comnExport';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import evenOdd from "@/client/js/views/game/blackAndWhite1/fns/common/evenOdd";
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default () => {
  const CONTAINER = document.getElementById("container");
  if (!CONTAINER) throw throwObj('elementLoss', 'drawLocalCube.js - container failed.');

  const GAME_SCENE = document.getElementById("gameScene");
  if (!GAME_SCENE) throw throwObj('elementLoss', 'drawLocalCube.js - gameScene failed.');

  const encryptKey1 = findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]); // playerNumOrder
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
  if (!encryptVal1) throw throwObj('sessionStorageLoss', 'drawLocalCube.js - playerNumOrder key failed.');

  // const cubeNums = encryptVal1.split(",").map(Number);
  const cubeNums = JSON.parse(encryptVal1);

  if (cubeNums.length !== 9) throw throwObj('sessionStorageLoss', 'drawLocalCube.js - playerNumOrder value failed.');

  const ENEMY_BLOCK_EL = document.createElement("div");
  const PLAYER_BLOCK_EL = document.createElement("div");
  const PLAYER_CUBE_LIST_EL = document.createElement("ul");
  ENEMY_BLOCK_EL.classList.add("enemy-block");
  PLAYER_BLOCK_EL.classList.add("player-block");
  PLAYER_CUBE_LIST_EL.classList.add("cube");
  PLAYER_CUBE_LIST_EL.classList.add("ready");
  PLAYER_CUBE_LIST_EL.classList.add("start");
  PLAYER_CUBE_LIST_EL.classList.add("disabled");
  for (let i = 0; i < cubeNums.length; i++) {
    const PLAYER_CUBES_EL = document.createElement("li");
    PLAYER_CUBES_EL.innerHTML = cubeNums[i];
    evenOdd(PLAYER_CUBES_EL);
    PLAYER_CUBE_LIST_EL.appendChild(PLAYER_CUBES_EL);
  };
  PLAYER_BLOCK_EL.appendChild(PLAYER_CUBE_LIST_EL);
  GAME_SCENE.appendChild(ENEMY_BLOCK_EL);
  GAME_SCENE.appendChild(PLAYER_BLOCK_EL);

  // .player-block translate
  const BTN_START = document.createElement("button");
  const BTN_START_INNER = document.createElement("span");
  BTN_START_INNER.innerText = "wait opponent";
  BTN_START.setAttribute("disabled", true);
  BTN_START.setAttribute("aria-label", "Your opponent is shuffling their cards.");
  BTN_START.appendChild(BTN_START_INNER);
  BTN_START.classList.add("btn-start");
  CONTAINER.appendChild(BTN_START);

  const CUBE_HEIGHT = PLAYER_CUBE_LIST_EL.clientHeight;
  const BOTTOM_HEIGHT = BTN_START.clientHeight + getStyle(BTN_START, "bottom");
  const RESULT = (PLAYER_BLOCK_EL.clientHeight - CUBE_HEIGHT - BOTTOM_HEIGHT) / 2;
  PLAYER_CUBE_LIST_EL.style.transform = `translateY(${RESULT}px)`;
};
