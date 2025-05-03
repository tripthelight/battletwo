import deviceStateStore from '@/client/store/deviceStateStore';
import { timeInterval_1 } from '@/client/js/functions/variable';
import moveDrop from '@/client/js/views/game/indianPocker/fns/common/moveDrop';
import moveDragover from '@/client/js/views/game/indianPocker/fns/common/moveDragover';
import moveDragleave from '@/client/js/views/game/indianPocker/fns/common/moveDragleave';
import moveDragStart from '@/client/js/views/game/indianPocker/fns/common/moveDragStart';
import moveDrag from '@/client/js/views/game/indianPocker/fns/common/moveDrag';
import moveDragEnd from '@/client/js/views/game/indianPocker/fns/common/moveDragEnd';
import moveTouchStart from '@/client/js/views/game/indianPocker/fns/common/moveTouchStart';
import moveTouchMove from '@/client/js/views/game/indianPocker/fns/common/moveTouchMove';
import moveTouchEnd from '@/client/js/views/game/indianPocker/fns/common/moveTouchEnd';

export default (el) => {
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
  switch (deviceState) {
    case 'pc':
      const BATTING_ZONE = document.querySelector('.betting-zone');
      if (!BATTING_ZONE) return;

      setTimeout(() => {
        BATTING_ZONE.addEventListener('drop', moveDrop, false);
        BATTING_ZONE.addEventListener('dragover', moveDragover, false);
        BATTING_ZONE.addEventListener('dragleave', moveDragleave, false);
        el.addEventListener('dragstart', moveDragStart, false);
        el.addEventListener('drag', moveDrag, false);
        el.addEventListener('dragend', moveDragEnd, false);
      }, timeInterval_1);
      break;
    case 'mobile':
      setTimeout(() => {
        el.addEventListener('touchstart', moveTouchStart, false);
        el.addEventListener('touchmove', moveTouchMove, false);
        el.addEventListener('touchend', moveTouchEnd, false);
      }, timeInterval_1);
      break;
    default:
      break;
  }
};
