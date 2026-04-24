import { getStyle } from "@/client/js/functions/comnExport";

export default () => {
  const TXT_BLOCK = document.querySelector(".result-txt");
  if (!TXT_BLOCK) return;

  const RESULT_STORAGE = window.sessionStorage.result;
  if (!RESULT_STORAGE) return;

  const RESULT = Boolean(RESULT_STORAGE === "true");

  const BOARD_ELEM = document.querySelector(".board");
  const LIST = BOARD_ELEM.querySelectorAll("li");
  const W = LIST[0].clientWidth;
  const H = LIST[0].clientHeight;

  const TXT_WIN = "WIN";
  const TXT_LOSE = "LOSE";

  TXT_BLOCK.style.height = `${H}px`;
  TXT_BLOCK.style.fontSize = `${W}px`;
  // TXT_BLOCK.style.opacity = 1;

  const ENEMY_BLOCK = document.querySelector(".enemy-block");
  const PICTURE_BOARD = document.querySelector(".picture-board");
  const BOARD = PICTURE_BOARD.querySelector(".board");
  const BOARD_LIST = BOARD.querySelectorAll("li");

  const POS_X_1 = BOARD.offsetLeft + getStyle(BOARD, "border-left-width");
  const POS_Y_1 = ENEMY_BLOCK.clientHeight + BOARD.offsetTop + getStyle(BOARD, "border-top-width");

  let emEl = new Object();
  let iEl = new Object();
  let l = TXT_BLOCK.offsetLeft - POS_X_1;
  let t = TXT_BLOCK.offsetTop - POS_Y_1;

  for (let i = 0; i < BOARD_LIST.length; i++) {
    const BTN = BOARD_LIST[i].querySelector("button.btn");
    const FRONT = BTN.querySelector("span.front");

    if (i !== 13 && i !== 14) {
      emEl = FRONT.querySelector("em");
      iEl = emEl.querySelector("i");

      emEl.style.cssText = `
        position: relative;
        width: ${BOARD_LIST[i].clientWidth}px;
        height: ${BOARD_LIST[i].clientHeight}px;
        font-size: ${BOARD_LIST[i].clientWidth}px;
        line-height: ${BOARD_LIST[i].clientWidth}px;
      `;
      iEl.style.cssText = `
        position: absolute;
        left: ${l - BOARD_LIST[i].offsetLeft - TXT_BLOCK.clientWidth / 2}px;
        top: ${t - BOARD_LIST[i].offsetTop - TXT_BLOCK.clientHeight / 2}px;
        height: ${BOARD_LIST[i].clientHeight}px;
        font-size: ${BOARD_LIST[i].clientWidth}px;
        line-height: ${BOARD_LIST[i].clientWidth}px;
      `;
    }
  }
};
