import deviceStateStore from '@/client/store/deviceStateStore';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import moveDrop from '@/client/js/views/game/indianPocker/fns/common/moveDrop';
import moveDragover from '@/client/js/views/game/indianPocker/fns/common/moveDragover';
import moveDragleave from '@/client/js/views/game/indianPocker/fns/common/moveDragleave';
import moveDragStart from '@/client/js/views/game/indianPocker/fns/common/moveDragStart';
import moveDrag from '@/client/js/views/game/indianPocker/fns/common/moveDrag';
import moveDragEnd from '@/client/js/views/game/indianPocker/fns/common/moveDragEnd';
import moveTouchStart from '@/client/js/views/game/indianPocker/fns/common/moveTouchStart';
import moveTouchMove from '@/client/js/views/game/indianPocker/fns/common/moveTouchMove';
import moveTouchEnd from '@/client/js/views/game/indianPocker/fns/common/moveTouchEnd';

// addEventListener 내부에 화살표 함수로 삽입하면 매번 새로운 함수 객체를 만들어 등록하므로 중복 실행됨
// 핸들러를 바깥으로 빼 동일 참조 유지
function onDrop(event) {
  event.preventDefault();
  try {
    moveDrop();
  } catch (error) {
    console.log('error moveDrop() : ');
    errorManager(error, true);
  };
};

export default (el) => {
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;

  switch (deviceState) {
    case 'pc':
      const BATTING_ZONE = document.querySelector('.betting-zone');
      if (!BATTING_ZONE) return;

      // BATTING_ZONE.addEventListener('drop', moveDrop, false);
      BATTING_ZONE.removeEventListener('drop', onDrop);
      BATTING_ZONE.addEventListener('drop', onDrop, false);
      BATTING_ZONE.addEventListener('dragover', moveDragover, false);
      BATTING_ZONE.addEventListener('dragleave', moveDragleave, false);
      el.addEventListener('dragstart', moveDragStart, false);
      el.addEventListener('drag', moveDrag, false);
      el.addEventListener('dragend', moveDragEnd, false);
      break;
    case 'mobile':
      el.addEventListener('touchstart', moveTouchStart, false);
      el.addEventListener('touchmove', moveTouchMove, false);
      el.addEventListener('touchend', moveTouchEnd, false);
      break;
    default:
      break;
  }
};
