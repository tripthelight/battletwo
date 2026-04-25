import { timeInterval_1 } from "@/client/js/functions/variable";
import deviceStateStore from '@/client/store/deviceStateStore';
import moveTouchStart from "@/client/js/views/game/findTheSamePicture/fns/common/moveTouchStart";
import moveTouchMove from "@/client/js/views/game/findTheSamePicture/fns/common/moveTouchMove";
import moveTouchEnd from "@/client/js/views/game/findTheSamePicture/fns/common/moveTouchEnd";
import moveDragStart from "@/client/js/views/game/findTheSamePicture/fns/common/moveDragStart";
import moveDrag from "@/client/js/views/game/findTheSamePicture/fns/common/moveDrag";
import moveDragEnd from "@/client/js/views/game/findTheSamePicture/fns/common/moveDragEnd";

export default (_icon) => {
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
  switch (deviceState) {
    case "pc":
      setTimeout(() => {
        _icon.addEventListener("dragstart", moveDragStart, false);
        _icon.addEventListener("drag", moveDrag, false);
        _icon.addEventListener("dragend", moveDragEnd, false);
      }, timeInterval_1);
      break;
    case "mobile":
      setTimeout(() => {
        _icon.addEventListener("touchstart", moveTouchStart, false);
        _icon.addEventListener("touchmove", moveTouchMove, false);
        _icon.addEventListener("touchend", moveTouchEnd, false);
      }, timeInterval_1);
      break;
    default:
      break;
  }
};
