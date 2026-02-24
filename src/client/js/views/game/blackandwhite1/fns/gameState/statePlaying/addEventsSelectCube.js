import { deviceState } from "../../../js/common/deviceCheck.js";
import selectDrop from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectDrop";
import selectDragover from "./selectDragover.js";
import selectDragleave from "./selectDragleave.js";
import selectDragStart from "./selectDragStart.js";
import selectDragEnd from "./selectDragEnd.js";
import selectTouchStart from "./selectTouchStart.js";
import selectTouchMove from "./selectTouchMove.js";
import selectTouchEnd from "./selectTouchEnd.js";

export default (el) => {
  switch (deviceState) {
    case "pc":
      // add ondrop, ondragover
      const BLACK_SQUARE = document.querySelector(".black-square");
      if (BLACK_SQUARE) {
        BLACK_SQUARE.addEventListener("drop", selectDrop, false);
        BLACK_SQUARE.addEventListener("dragover", selectDragover, false);
        BLACK_SQUARE.addEventListener("dragleave", selectDragleave, false);
        el.addEventListener("dragstart", selectDragStart, false);
        el.addEventListener("dragend", selectDragEnd, false);
      }
      break;
    case "mobile":
      el.addEventListener("touchstart", selectTouchStart, false);
      el.addEventListener("touchmove", selectTouchMove, false);
      el.addEventListener("touchend", selectTouchEnd, false);
      break;
    default:
      break;
  }
};
