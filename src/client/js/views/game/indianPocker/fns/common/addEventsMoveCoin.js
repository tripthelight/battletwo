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
const withGuard = (fn, { prevent = false } = {}) => {
  return (event) => {
    if (prevent) event?.preventDefault();
    try {
      return fn(event);
    } catch (error) {
      errorManager(error, true);
    }
  };
};

// ✅ 실제 로직(try/catch, preventDefault 제거한 "순수 핸들러")
const handleDrop = () => moveDrop();
const handleDragover = () => moveDragover();
const handleDragleave = () => moveDragleave();
const handleDragStart = (event) => moveDragStart(event);
const handleDrag = (event) => moveDrag(event);
const handleDragEnd = () => moveDragEnd();
const handleTouchStart = (event) => moveTouchStart(event);
const handleTouchMove = (event) => moveTouchMove(event);
const handleTouchEnd = (event) => moveTouchEnd(event);

// ✅ 이벤트에 붙일 최종 핸들러(옵션 적용)
const onDrop = withGuard(handleDrop, { prevent: true });
const onMoveDragover = withGuard(handleDragover, { prevent: true });
const onMoveDragleave = withGuard(handleDragleave, { prevent: true });
const onMoveDragStart = withGuard(handleDragStart);
const onMoveDrag = withGuard(handleDrag);
const onMoveDragEnd = withGuard(handleDragEnd);
const onMoveTouchStart = withGuard(handleTouchStart);
const onMoveTouchMove = withGuard(handleTouchMove);
const onMoveTouchEnd = withGuard(handleTouchEnd);

// ────────────────────────────────────────────────────────
// 바인딩 중복 제거 유틸
const DEFAULT_OPTS = false;

const bindEvents = (bindings, opts = DEFAULT_OPTS) => {
  bindings.forEach(([target, type, handler]) => {
    if (!target) return;
    target.removeEventListener(type, handler, opts);
    target.addEventListener(type, handler, opts);
  });
};

export default (el) => {
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
  const BATTING_ZONE = document.querySelector('.betting-zone');

  if (deviceState === 'pc') {
    if (!BATTING_ZONE || !el) return;

    bindEvents([
      [BATTING_ZONE, 'drop', onDrop],
      [BATTING_ZONE, 'dragover', onMoveDragover],
      [BATTING_ZONE, 'dragleave', onMoveDragleave],
      [el, 'dragstart', onMoveDragStart],
      [el, 'drag', onMoveDrag],
      [el, 'dragend', onMoveDragEnd],
    ]);
    return;
  }

  if (deviceState === 'mobile') {
    if (!el) return;

    bindEvents([
      [el, 'touchstart', onMoveTouchStart],
      [el, 'touchmove', onMoveTouchMove],
      [el, 'touchend', onMoveTouchEnd],
    ]);
  }
};
