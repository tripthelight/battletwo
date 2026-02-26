import deviceStateStore from '@/client/store/deviceStateStore';
import selectDrop from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectDrop";
import selectDragover from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectDragover";
import selectDragleave from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectDragleave";
import selectDragStart from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectDragStart";
import selectDragEnd from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectDragEnd";
import selectTouchStart from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectTouchStart.js";
import selectTouchMove from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectTouchMove";
import selectTouchEnd from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectTouchEnd";

export default (el) => {
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
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
