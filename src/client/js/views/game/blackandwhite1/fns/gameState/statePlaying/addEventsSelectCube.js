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
