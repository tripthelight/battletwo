import deviceStateStore from '@/client/store/deviceStateStore';
import moveSubtractDrop from '@/client/js/views/game/indianPocker/fns/common/moveSubtractDrop';
import moveSubtractDragover from '@/client/js/views/game/indianPocker/fns/common/moveSubtractDragover';
import moveSubtractDragleave from '@/client/js/views/game/indianPocker/fns/common/moveSubtractDragleave';
import moveSubtractDragStart from '@/client/js/views/game/indianPocker/fns/common/moveSubtractDragStart';
import moveSubtractDrag from '@/client/js/views/game/indianPocker/fns/common/moveSubtractDrag';
import moveSubtractDragEnd from '@/client/js/views/game/indianPocker/fns/common/moveSubtractDragEnd';
import moveSubtractTouchStart from '@/client/js/views/game/indianPocker/fns/common/moveSubtractTouchStart';
import moveSubtractTouchMove from '@/client/js/views/game/indianPocker/fns/common/moveSubtractTouchMove';
import moveSubtractTouchEnd from '@/client/js/views/game/indianPocker/fns/common/moveSubtractTouchEnd';

export default (el) => {
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
  switch (deviceState) {
    case 'pc':
      const PLAYER_BLOCK = document.querySelector('.player-block');
      if (!PLAYER_BLOCK) return;
      PLAYER_BLOCK.addEventListener('drop', moveSubtractDrop, false);
      PLAYER_BLOCK.addEventListener('dragover', moveSubtractDragover, false);
      PLAYER_BLOCK.addEventListener('dragleave', moveSubtractDragleave, false);
      el.addEventListener('dragstart', moveSubtractDragStart, false);
      el.addEventListener('drag', moveSubtractDrag, false);
      el.addEventListener('dragend', moveSubtractDragEnd, false);
      break;
    case 'mobile':
      el.addEventListener('touchstart', moveSubtractTouchStart, false);
      el.addEventListener('touchmove', moveSubtractTouchMove, false);
      el.addEventListener('touchend', moveSubtractTouchEnd, false);
      break;
    default:
      break;
  }
};
