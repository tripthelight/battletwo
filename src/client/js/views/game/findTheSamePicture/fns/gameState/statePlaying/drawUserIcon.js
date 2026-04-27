import deviceStateStore from '@/client/store/deviceStateStore';

import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';

import { timeInterval_1 } from "@/client/js/functions/variable";
import findIconActive from "@/client/js/views/game/findTheSamePicture/fns/common/findIconActive";
import touchUserIcon from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/touchUserIcon";
import infoPlayPop from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/infoPlayPop";
import playerCardAcitveClass from "@/client/js/views/game/findTheSamePicture/fns/common/playerCardAcitveClass";
import findTheSamePictureGameState from '@/client/js/gameState/findTheSamePicture';

import saveResult from "@/client/js/views/game/findTheSamePicture/fns/gameState/stateGameOver/saveResult";
import X from '@/client/js/module/crypts/bool-obf';

export default () => {
  const PLAYER_ICON = document.querySelector(".player-icon");
  if (PLAYER_ICON) return;
  const PLAYER_BLOCK = document.querySelector(".player-block");
  if (!PLAYER_BLOCK) throw throwObj('elementLoss', "drawUserIcon.js - .player-block element failed.");
  const PLAYER_CARD_LIST = PLAYER_BLOCK.querySelector("ul");
  if (!PLAYER_CARD_LIST) throw throwObj('elementLoss', "drawUserIcon.js - .player-block ul element failed.");
  const PLAYER_CARDS = PLAYER_CARD_LIST.querySelectorAll("li");
  if (!PLAYER_CARDS || PLAYER_CARDS.length < 1) throw throwObj('elementLoss', "drawUserIcon.js - .player-block ul length element failed.");

  const ENEMY_ICON = document.querySelector(".enemy-icon");
  if (ENEMY_ICON) return;
  const ENEMY_BLOCK = document.querySelector(".enemy-block");
  if (!ENEMY_BLOCK) throw throwObj('elementLoss', "drawUserIcon.js - .enemy-block element failed.");
  const ENEMY_CARD_LIST = ENEMY_BLOCK.querySelector("ul");
  if (!ENEMY_CARD_LIST) throw throwObj('elementLoss', "drawUserIcon.js - .enemy-block ul element failed.");
  const ENEMY_CARDS = ENEMY_CARD_LIST.querySelectorAll("li");
  if (!ENEMY_CARDS || ENEMY_CARDS.length < 1) throw throwObj('elementLoss', "drawUserIcon.js - .enemy-block ul length element failed.");

  // player : 'p' || enemy : 'e'
  const PLAYER_ACTIVE = findIconActive("p");
  const ENEMY_ACTIVE = findIconActive("e");

  const PLAYER_ICON_EL = document.createElement("div");
  const ENEMY_ICON_EL = document.createElement("div");
  let pData = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  };
  let eData = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  };
  for (let i = 0; i < PLAYER_CARDS.length; i++) {
    if (i === PLAYER_ACTIVE) {
      pData.x = PLAYER_CARDS[i].offsetLeft;
      pData.y = PLAYER_CARDS[i].offsetTop;
      pData.w = PLAYER_CARDS[i].clientWidth;
      pData.h = PLAYER_CARDS[i].clientHeight;
      break;
    }
  }
  // enemy의 경우 배열을 뒤에서 부터 시작
  for (let i = ENEMY_CARDS.length - 1; i >= 0; i--) {
    if (i === ENEMY_ACTIVE) {
      eData.x = ENEMY_CARDS[i].offsetLeft;
      eData.y = ENEMY_CARDS[i].offsetTop;
      eData.w = ENEMY_CARDS[i].clientWidth;
      eData.h = ENEMY_CARDS[i].clientHeight;
      break;
    }
  }
  PLAYER_ICON_EL.classList.add("player-icon");
  PLAYER_ICON_EL.style.left = `${pData.x + 1}px`;
  PLAYER_ICON_EL.style.top = `${pData.y + 1}px`;
  PLAYER_ICON_EL.style.width = `${pData.w - 2}px`;
  PLAYER_ICON_EL.style.height = `${pData.h - 2}px`;

  ENEMY_ICON_EL.classList.add("enemy-icon");
  ENEMY_ICON_EL.style.left = `${eData.x + 1}px`;
  ENEMY_ICON_EL.style.top = `${eData.y + 1}px`;
  ENEMY_ICON_EL.style.width = `${eData.w - 2}px`;
  ENEMY_ICON_EL.style.height = `${eData.h - 2}px`;

  PLAYER_BLOCK.appendChild(PLAYER_ICON_EL);
  ENEMY_BLOCK.appendChild(ENEMY_ICON_EL);

  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
  if (deviceState === "mobile") {
    PLAYER_ICON_EL.removeAttribute("draggable");
  } else if (deviceState === "pc") {
    PLAYER_ICON_EL.setAttribute("draggable", true);
  }

  // 새로고침일 경우
  // const GAME_STATE = window.sessionStorage.gameState;
  // if (!GAME_STATE) errorComn("gameState not found");
  // if (GAME_STATE === "gameover") {
  //   const RESULT = window.sessionStorage.result;
  //   if (!RESULT) errorComn("result not found");
  //   gameState.gameOver(RESULT === "true" ? true : false);
  // } else {
  //   setTimeout(touchUserIcon, timeInterval_1);
  //   // 안내 팝업
  //   setTimeout(infoPlayPop, timeInterval_1);
  //   setTimeout(playerCardAcitveClass, timeInterval_1);
  // }

  // 새로고침일 경우
  const encryptKey1 = findCharCode([87, 67, 76, 82, 72, 74, 68, 66, 69, 73]); // gameState
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (!encryptVal1) throw throwObj('sessionStorageLoss', "drawUserIcon.js - gameState failed.");

  // gameState === gameover
  if (encryptVal1 === findCharCode([66, 85, 77, 82, 70, 74, 67, 81, 76, 87])) {
    const encryptKey2 = findCharCode([67, 72, 86, 68, 83, 77, 74, 65, 88, 78]); // result
    const encryptVal2 = storageMethod('s', 'GET_ITEM', encryptKey2);
    if (!encryptVal2) throw throwObj('sessionStorageLoss', "drawUserIcon.js - result failed.");

    // 게임 결과 저장
    saveResult(
      X.dec(encryptVal2),
      [115, 119, 112, 97], // "swpa" : true
      [106, 111, 98, 101, 117] // "jobeu" : false
    );
    findTheSamePictureGameState.gameOver();
  } else {
    setTimeout(touchUserIcon, timeInterval_1);
    // 안내 팝업
    setTimeout(infoPlayPop, timeInterval_1);
    setTimeout(playerCardAcitveClass, timeInterval_1);
  }
};
