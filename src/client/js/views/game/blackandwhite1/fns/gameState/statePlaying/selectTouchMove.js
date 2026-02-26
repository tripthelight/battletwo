// import { selectX, selectY } from "./variable.js";
import { reactiveState } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";

export default (e) => {
  let moveX = -(reactiveState.selectX - e.targetTouches[0].clientX);
  let moveY = -(reactiveState.selectY - e.targetTouches[0].clientY);
  e.target.style.zIndex = "3000";
  e.target.style.transform = "translate(" + moveX + "px, " + moveY + "px)";
  const BLOCK_SQUARE = document.querySelector(".black-square");
  const CUBE = document.querySelector(".cube.ready.start");
  const PLAYER_BLOCK = document.querySelector(".player-block");
  if (BLOCK_SQUARE && CUBE && PLAYER_BLOCK) {
    let focusX = e.target.offsetLeft + moveX;
    let focusY = CUBE.offsetTop - Math.abs(e.target.offsetTop + moveY);
    let bsX = BLOCK_SQUARE.offsetLeft;
    let bsY = BLOCK_SQUARE.offsetTop;
    let clientW = BLOCK_SQUARE.clientWidth;
    let clientH = BLOCK_SQUARE.clientHeight;
    if (focusX > bsX - clientW / 2 && focusX < bsX + clientW / 2 && focusY > 0 - clientH / 2 && focusY < clientH / 2 && moveY < 0) {
      BLOCK_SQUARE.classList.add("over");
      e.target.classList.add("in");
    } else {
      BLOCK_SQUARE.classList.remove("over");
      e.target.classList.remove("in");
    }
  }
};
