import deviceStateStore from '@/client/store/deviceStateStore';
import shuffleStart from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleStart";
import shuffleEnter from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleEnter";
import shuffleOver from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleOver";
import shuffleLeave from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleLeave";
import shuffleDrop from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleDrop";
import shuffleEnd from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleEnd";
import shuffleTouchStart from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleTouchStart";
import shuffleTouchMove from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleTouchMove";
import shuffleTouchEnd from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleTouchEnd";

export default (el) => {
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
  switch (deviceState) {
    case "pc":
      el.addEventListener("dragstart", shuffleStart, false);
      el.addEventListener("dragenter", shuffleEnter, false);
      el.addEventListener("dragover", shuffleOver, false);
      el.addEventListener("dragleave", shuffleLeave, false);
      el.addEventListener("drop", shuffleDrop, false);
      el.addEventListener("dragend", shuffleEnd, false);
      break;
    case "mobile":
      const CUBE_EL = document.querySelectorAll("ul.cube li");
      for (let i = 0; i < CUBE_EL.length; i++) {
        CUBE_EL[i].removeAttribute("draggable");
      }
      el.addEventListener("touchstart", shuffleTouchStart, false);
      el.addEventListener("touchmove", shuffleTouchMove, false);
      el.addEventListener("touchend", shuffleTouchEnd, false);
      break;
    default:
      break;
  }
};
