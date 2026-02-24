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
      const BLACK_SQUARE = document.querySelector(".black-square");
      if (BLACK_SQUARE) {
        BLACK_SQUARE.removeEventListener("drop", selectDrop, false);
        BLACK_SQUARE.removeEventListener("dragover", selectDragover, false);
        BLACK_SQUARE.removeEventListener("dragleave", selectDragleave, false);
        el.removeEventListener("dragstart", selectDragStart, false);
        el.removeEventListener("dragend", selectDragEnd, false);
      }
      const DISABLED = document.querySelector(".cube");
      if (DISABLED) {
        if (!DISABLED.classList.contains("disabled")) {
          DISABLED.classList.add("disabled");
        }
      }
      break;
    case "mobile":
      el.removeEventListener("touchstart", selectTouchStart, false);
      el.removeEventListener("touchmove", selectTouchMove, false);
      el.removeEventListener("touchend", selectTouchEnd, false);
      break;
    default:
      break;
  }
};
