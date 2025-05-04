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
      PLAYER_BLOCK.removeEventListener('drop', moveSubtractDrop, false);
      PLAYER_BLOCK.removeEventListener('dragover', moveSubtractDragover, false);
      PLAYER_BLOCK.removeEventListener('dragleave', moveSubtractDragleave, false);
      el.removeEventListener('dragstart', moveSubtractDragStart, false);
      el.removeEventListener('drag', moveSubtractDrag, false);
      el.removeEventListener('dragend', moveSubtractDragEnd, false);
      break;
    case 'mobile':
      el.removeEventListener('touchstart', moveSubtractTouchStart, false);
      el.removeEventListener('touchmove', moveSubtractTouchMove, false);
      el.removeEventListener('touchend', moveSubtractTouchEnd, false);
      break;
    default:
      break;
  }
};
