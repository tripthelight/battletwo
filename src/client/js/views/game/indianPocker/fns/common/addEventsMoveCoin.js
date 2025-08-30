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
// ────────────────────────────────────────────────────────
// PC *****************************
function onDrop(event) {
  event.preventDefault();
  try {
    moveDrop();
  } catch (error) {
    console.log('error moveDrop : ');
    errorManager(error, true);
  };
};
function onMoveDragover(event) {
  event.preventDefault();
  try {
    moveDragover();
  } catch (error) {
    console.log('error onMoveDragover : ');
    errorManager(error, true);
  };
};
function onMoveDragleave(event) {
  event.preventDefault();
  try {
    moveDragleave();
  } catch (error) {
    console.log('error onMoveDragleave : ');
    errorManager(error, true);
  };
};
function onMoveDragStart(event) {
  try {
    moveDragStart(event);
  } catch (error) {
    console.log('error onMoveDragStart : ');
    errorManager(error, true);
  };
};
function onMoveDrag(event) {
  try {
    moveDrag(event);
  } catch (error) {
    console.log('error onMoveDrag : ');
    errorManager(error, true);
  };
};
function onMoveDragEnd(event) {
  try {
    moveDragEnd();
  } catch (error) {
    console.log('error onMoveDragEnd : ');
    errorManager(error, true);
  };
};
// ────────────────────────────────────────────────────────
// MOBILE *************************
function onMoveTouchStart(event) {
  try {
    moveTouchStart(event);
  } catch (error) {
    console.log('error onMoveTouchStart : ');
    errorManager(error, true);
  };
};
function onMoveTouchMove(event) {
  try {
    moveTouchMove(event);
  } catch (error) {
    console.log('error onMoveTouchMove : ');
    errorManager(error, true);
  };
};
function onMoveTouchEnd(event) {
  try {
    moveTouchEnd(event);
  } catch (error) {
    console.log('error onMoveTouchEnd : ');
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
      // BATTING_ZONE.addEventListener('dragover', moveDragover, false);
      BATTING_ZONE.removeEventListener('dragover', onMoveDragover);
      BATTING_ZONE.addEventListener('dragover', onMoveDragover, false);
      // BATTING_ZONE.addEventListener('dragleave', moveDragleave, false);
      BATTING_ZONE.removeEventListener('dragleave', onMoveDragleave);
      BATTING_ZONE.addEventListener('dragleave', onMoveDragleave, false);
      // el.addEventListener('dragstart', moveDragStart, false);
      el.removeEventListener('dragstart', onMoveDragStart);
      el.addEventListener('dragstart', onMoveDragStart, false);
      // el.addEventListener('drag', moveDrag, false);
      el.removeEventListener('drag', onMoveDrag);
      el.addEventListener('drag', onMoveDrag, false);
      // el.addEventListener('dragend', moveDragEnd, false);
      el.removeEventListener('dragend', onMoveDragEnd);
      el.addEventListener('dragend', onMoveDragEnd, false);
      break;
    case 'mobile':
      // el.addEventListener('touchstart', moveTouchStart, false);
      el.removeEventListener('touchstart', onMoveTouchStart);
      el.addEventListener('touchstart', onMoveTouchStart, false);
      // el.addEventListener('touchmove', moveTouchMove, false);
      el.removeEventListener('touchmove', onMoveTouchMove);
      el.addEventListener('touchmove', onMoveTouchMove, false);
      // el.addEventListener('touchend', moveTouchEnd, false);
      el.removeEventListener('touchend', onMoveTouchEnd);
      el.addEventListener('touchend', onMoveTouchEnd, false);
      break;
    default:
      break;
  }
};
