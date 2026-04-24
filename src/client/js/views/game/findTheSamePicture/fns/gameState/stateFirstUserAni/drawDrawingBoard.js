import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import drawingBoardSize from "@/client/js/views/game/findTheSamePicture/fns/common/drawingBoardSize";
// import drawPictureCard from "./drawPictureCard.js";
import resizeEvent from "@/client/js/views/game/findTheSamePicture/fns/common/resize/resizeEvent";

export default () => {
  resizeEvent();
  // TODO: 처음 시작하는 단계에서는 gameStateGetAll : true 시켜줄 것
  // window.sessionStorage.setItem("gameStateGetAll", true);
  // window.sessionStorage.setItem("refresh", false);
  const DRAWING_BOARD = document.querySelector(".drawing-board");
  if (DRAWING_BOARD) return LOADING_EVENT.hide();
  const DRAWING_BOARD_WRAP = document.createElement("div");
  const DRAWING_BOARD_EL = document.createElement("ul");
  DRAWING_BOARD_WRAP.classList.add("drawing-board");
  DRAWING_BOARD_EL.classList.add("board");
  DRAWING_BOARD_WRAP.appendChild(DRAWING_BOARD_EL);
  drawingBoardSize(DRAWING_BOARD_WRAP);
  const GAME_SCENE = document.getElementById("gameScene");
  if (!GAME_SCENE) throw throwObj('sessionStorageLoss', 'drawDrawingBoard.js : drawing-board gameScene element failed.');
  GAME_SCENE.appendChild(DRAWING_BOARD_WRAP);
  // drawPictureCard(DRAWING_BOARD_EL);
  // window.sessionStorage.setItem("gameStateNext", false);
};
