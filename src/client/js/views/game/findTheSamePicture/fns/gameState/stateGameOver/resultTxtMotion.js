import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';

import throwObj from '@/client/js/module/errorHandler/throwObj';
import { getStyle } from "@/client/js/functions/comnExport";
import rotateResult from "@/client/js/views/game/findTheSamePicture/fns/gameState/stateGameOver/rotateResult";

export default () => {
  // const RESULT_STORAGE = window.sessionStorage.result;
  // if (!RESULT_STORAGE) throw throwObj('sessionStorageLoss', "resultTxtMotion.js - result failed.");

  const encryptKey1 = findCharCode([67, 72, 86, 68, 83, 77, 74, 65, 88, 78]); // result
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (!encryptVal1) throw throwObj('sessionStorageLoss', "resultTxtMotion.js - result failed.");

  // const RESULT = Boolean(RESULT_STORAGE === "true");
  const RESULT = Boolean(encryptVal1 === "true");
  const BOARD_ELEM = document.querySelector(".board");
  const LIST = BOARD_ELEM.querySelectorAll("li");
  const W = LIST[0].clientWidth;
  const H = LIST[0].clientHeight;

  const TXT_BLOCK = document.createElement("div");
  TXT_BLOCK.classList.add("result-txt");

  const TXT_WIN = "WIN";
  const TXT_LOSE = "LOSE";

  if (RESULT) {
    TXT_BLOCK.innerHTML = TXT_WIN;
  } else {
    TXT_BLOCK.innerHTML = TXT_LOSE;
  }

  TXT_BLOCK.style.position = "fixed";
  TXT_BLOCK.style.display = "inline-flex";
  TXT_BLOCK.style.top = `50%`;
  TXT_BLOCK.style.left = `50%`;
  TXT_BLOCK.style.transform = `translate(-50%,-50%)`;
  TXT_BLOCK.style.height = `${H}px`;
  TXT_BLOCK.style.fontSize = `${W}px`;
  TXT_BLOCK.style.zIndex = `9999`;
  TXT_BLOCK.style.opacity = `0`;

  const CONTAINER = document.getElementById("container");
  CONTAINER.appendChild(TXT_BLOCK);

  const ENEMY_BLOCK = document.querySelector(".enemy-block");
  const PICTURE_BOARD = document.querySelector(".picture-board");
  const BOARD = PICTURE_BOARD.querySelector(".board");
  const BOARD_LIST = BOARD.querySelectorAll("li");

  const POS_X_1 = BOARD.offsetLeft + getStyle(BOARD, "border-left-width");
  const POS_Y_1 = ENEMY_BLOCK.clientHeight + BOARD.offsetTop + getStyle(BOARD, "border-top-width");

  const RESULT_TXT = document.querySelector(".result-txt");
  // const RESULT_TXT_LIST = RESULT_TXT.querySelectorAll("li");
  let emEl = new Object();
  let iEl = new Object();
  let homeLink = new Object();
  let replayLink = new Object();
  let l = RESULT_TXT.offsetLeft - POS_X_1;
  let t = RESULT_TXT.offsetTop - POS_Y_1;

  for (let i = 0; i < BOARD_LIST.length; i++) {
    const BTN = BOARD_LIST[i].querySelector("button.btn");
    const FRONT = BTN.querySelector("span.front");
    FRONT.innerHTML = "";
    // TEST CODE ----------------------------
    // const IMG = FRONT.querySelector("img");
    // IMG.remove();

    if (i !== 13 && i !== 14) {
      emEl = document.createElement("em");
      emEl.style.cssText = `
        position: relative;
        width: ${BOARD_LIST[i].clientWidth}px;
        height: ${BOARD_LIST[i].clientHeight}px;
        font-size: ${BOARD_LIST[i].clientWidth}px;
        line-height: ${BOARD_LIST[i].clientWidth}px;
      `;
      iEl = document.createElement("i");
      iEl.style.cssText = `
        position: absolute;
        left: ${l - BOARD_LIST[i].offsetLeft - RESULT_TXT.clientWidth / 2}px;
        top: ${t - BOARD_LIST[i].offsetTop - RESULT_TXT.clientHeight / 2}px;
        height: ${BOARD_LIST[i].clientHeight}px;
        font-size: ${BOARD_LIST[i].clientWidth}px;
        line-height: ${BOARD_LIST[i].clientWidth}px;
      `;
      iEl.innerHTML = RESULT ? TXT_WIN : TXT_LOSE;
      emEl.appendChild(iEl);
      FRONT.appendChild(emEl);
    }
    if (i === 13) {
      homeLink = document.createElement("a");
      homeLink.setAttribute("title", "GO HOME");
      homeLink.setAttribute("href", "javascript:void(0)");
      homeLink.classList.add("home");
      homeLink.innerHTML = "H";
      FRONT.appendChild(homeLink);
      // homeLink.onclick = () => {
      //   window.sessionStorage.clear();
      //   location.replace("/");
      // };
    }
    if (i === 14) {
      replayLink = document.createElement("a");
      replayLink.setAttribute("title", "GO HOME");
      replayLink.setAttribute("href", "javascript:void(0)");
      replayLink.classList.add("replay");
      replayLink.innerHTML = "R";
      FRONT.appendChild(replayLink);
      // replayLink.onclick = () => {
      //   window.sessionStorage.clear();
      //   location.replace("/findsamepicture");
      // };
    }
    if (i === BOARD_LIST.length - 1) {
      rotateResult();
    }
  }
};
