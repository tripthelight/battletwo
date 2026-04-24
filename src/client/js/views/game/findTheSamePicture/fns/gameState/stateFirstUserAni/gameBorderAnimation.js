import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findTheSamePictureGameState from '@/client/js/gameState/findTheSamePicture';
import { WW, WH } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";
import { IS_DARKMODE } from "@/client/js/module/darkMode";

export default (_border) => {
  const W = _border.clientWidth + Number(getComputedStyle(_border).borderLeftWidth.replace("px", "")) + Number(getComputedStyle(_border).borderRightWidth.replace("px", ""));
  const H = _border.clientHeight + Number(getComputedStyle(_border).borderTopWidth.replace("px", "")) + Number(getComputedStyle(_border).borderBottomWidth.replace("px", ""));
  const BOARD_BORDER = document.createElement("div");
  BOARD_BORDER.style.position = "fixed";
  BOARD_BORDER.style.width = `${W}px`;
  BOARD_BORDER.style.height = `${H}px`;
  BOARD_BORDER.style.left = `${_border.offsetLeft}px`;
  BOARD_BORDER.style.top = `${_border.offsetTop}px`;
  BOARD_BORDER.style.backgroundColor = "transparent";
  BOARD_BORDER.style.border = getComputedStyle(_border).border;
  BOARD_BORDER.style.boxSizing = "border-box";
  BOARD_BORDER.style.transition = "all .4s ease-in";
  BOARD_BORDER.style.backgroundColor = IS_DARKMODE ? "#3b3b3b" : "#FFF";

  const GAME_SCENE = document.getElementById("gameScene");
  if (!GAME_SCENE) throw throwObj('elementLoss', "gameBorderAnimation.js - #gameScene element failed.");
  GAME_SCENE.appendChild(BOARD_BORDER);

  const DRAWING_BOARD = document.querySelector(".drawing-board");
  if (DRAWING_BOARD) DRAWING_BOARD.remove();

  setTimeout(() => {
    // console.log("이거 타냐 ??? ", document.body.classList.contains("portrait"));
    if (WW >= 600) {
      if (WH <= 600) {
        if (document.body.classList.contains("landscape")) {
          BOARD_BORDER.style.width = `${WH - WW / 16 - (WW / 20) * 2}px`;
          BOARD_BORDER.style.height = `${WH - WW / 16 - (WW / 20) * 2}px`;
        } else if (document.body.classList.contains("portrait")) {
          BOARD_BORDER.style.width = "600px";
          BOARD_BORDER.style.height = "600px";
        }
      } else {
        BOARD_BORDER.style.width = "600px";
        BOARD_BORDER.style.height = "600px";
      }
    } else {
      if (document.body.classList.contains("landscape")) {
        BOARD_BORDER.style.width = `${WH - WW / 16}px`;
        BOARD_BORDER.style.height = `${WH - WW / 16}px`;
      } else if (document.body.classList.contains("portrait")) {
        BOARD_BORDER.style.width = `${WW}px`;
        BOARD_BORDER.style.height = `${WW}px`;
      }
    }
    BOARD_BORDER.style.top = "50%";
    BOARD_BORDER.style.left = "50%";
    BOARD_BORDER.style.transform = `translate(-50%, -50%)`;

    setTimeout(() => {
      // BOARD_BORDER.style.borderWidth = 0;
      setTimeout(() => {
        BOARD_BORDER.remove();
        LOADING_EVENT.show();
        // s : --- 이 --- 줄에서 --- 다음 --- STEP --- 실행
        window.sessionStorage.setItem("gameStateGetAll", false);
        window.sessionStorage.setItem("refresh", false);
        const FIRST_ENTER = window.sessionStorage.firstEnter;
        if (FIRST_ENTER && FIRST_ENTER === "true") window.sessionStorage.setItem("gameStateNext", false);

        // if (window.localStorage.nickname === "EDGE") {
        //   setTimeout(() => {
        //     console.log("EDGE playing 드러감 >>> ");
        //     findTheSamePictureGameState.playing();
        //   }, 5000);
        // } else {
        //   findTheSamePictureGameState.playing();
        // }

        if (FIRST_ENTER && FIRST_ENTER === "true") window.sessionStorage.setItem("gameStateNext", false);
        findTheSamePictureGameState.playing();
        // e : --- 이 --- 줄에서 --- 다음 --- STEP --- 실행
      }, 401);
    }, 440);
  }, 30);
};
