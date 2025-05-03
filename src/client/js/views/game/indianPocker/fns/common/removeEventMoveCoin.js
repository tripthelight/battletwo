import { timeInterval_1 } from '@/client/js/functions/variable.js';
import deviceStateStore from '@/client/store/deviceStateStore.js';
import moveDrop from '@/client/js/views/game/indianPocker/fns/common/moveDrop.js';
import moveDragover from '@/client/js/views/game/indianPocker/fns/common/moveDragover.js';
import moveDragleave from '@/client/js/views/game/indianPocker/fns/common/moveDragleave.js';
import moveDragStart from '@/client/js/views/game/indianPocker/fns/common/moveDragStart.js';
import moveDrag from '@/client/js/views/game/indianPocker/fns/common/moveDrag.js';
import moveDragEnd from '@/client/js/views/game/indianPocker/fns/common/moveDragEnd.js';
import moveTouchStart from '@/client/js/views/game/indianPocker/fns/common/moveTouchStart.js';
import moveTouchMove from '@/client/js/views/game/indianPocker/fns/common/moveTouchMove.js';
import moveTouchEnd from '@/client/js/views/game/indianPocker/fns/common/moveTouchEnd.js';

export default (el) => {
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
  switch (deviceState) {
    case 'pc':
      const BATTING_ZONE = document.querySelector('.betting-zone');
      if (!BATTING_ZONE) return;
      setTimeout(() => {
        BATTING_ZONE.removeEventListener('drop', moveDrop, false);
        BATTING_ZONE.removeEventListener('dragover', moveDragover, false);
        BATTING_ZONE.removeEventListener('dragleave', moveDragleave, false);
        el.removeEventListener('dragstart', moveDragStart, false);
        el.removeEventListener('drag', moveDrag, false);
        el.removeEventListener('dragend', moveDragEnd, false);
      }, timeInterval_1);
      break;
    case 'mobile':
      setTimeout(() => {
        el.removeEventListener('touchstart', moveTouchStart, false);
        el.removeEventListener('touchmove', moveTouchMove, false);
        el.removeEventListener('touchend', moveTouchEnd, false);
      }, timeInterval_1);
      break;
    default:
      break;
  }
};
