import { timeInterval_1 } from '@/client/js/functions/variable.js';
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
      el.removeEventListener("dragstart", shuffleStart, false);
      el.removeEventListener("dragenter", shuffleEnter, false);
      el.removeEventListener("dragover", shuffleOver, false);
      el.removeEventListener("dragleave", shuffleLeave, false);
      el.removeEventListener("drop", shuffleDrop, false);
      el.removeEventListener("dragend", shuffleEnd, false);
      break;
    case "mobile":
      el.removeEventListener("touchstart", shuffleTouchStart, false);
      el.removeEventListener("touchmove", shuffleTouchMove, false);
      el.removeEventListener("touchend", shuffleTouchEnd, false);
      break;
    default:
      break;
  }
};
