import deviceStateStore from '@/client/store/deviceStateStore';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import selectDrop from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectDrop';
import selectDragover from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectDragover';
import selectDragleave from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectDragleave';
import selectDragStart from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectDragStart';
import selectDragEnd from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectDragEnd';
import selectTouchStart from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectTouchStart';
import selectTouchMove from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectTouchMove';
import selectTouchEnd from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectTouchEnd';

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

const handleDragStart = (event) => selectDragStart(event);
const handleDragOver = (event) => selectDragover(event);
const handleDragLeave = (event) => selectDragleave(event);
const handleDrop = (event) => selectDrop(event);
const handleDropEnd = (event) => selectDragEnd(event);
const handleTouchStart = (event) => selectTouchStart(event);
const handleTouchMove = (event) => selectTouchMove(event);
const handleTouchEnd = (event) => selectTouchEnd(event);

const onDragStart = withGuard(handleDragStart);
const onDragOver = withGuard(handleDragOver, { prevent: true });
const onDragLeave = withGuard(handleDragLeave, { prevent: true });
const onDrop = withGuard(handleDrop, { prevent: true });
const onDragEnd = withGuard(handleDropEnd);

// Mobile drag 중 browser pan/zoom gesture가 touchmove를 가로채지 않도록
// non-passive listener에서 기본 동작을 명시적으로 막는다.
const onTouchStart = withGuard(handleTouchStart, { prevent: true });
const onTouchMove = withGuard(handleTouchMove, { prevent: true });
const onTouchEnd = withGuard(handleTouchEnd, { prevent: true });

const DEFAULT_OPTS = false;
const TOUCH_OPTS = { passive: false };

const bindEvents = (bindState, bindings, opts = DEFAULT_OPTS) => {
  bindings.forEach(([target, type, handler]) => {
    if (!target) return;

    target.removeEventListener(type, handler, opts);

    if (bindState) {
      target.addEventListener(type, handler, opts);
    }
  });
};

/**
 * @param {HTMLElement} el Cube li
 * @param {boolean} bindState true: bind | false: unbind
 */
export default (el, bindState) => {
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;

  if (deviceState === 'pc') {
    const blackSquare = document.querySelector('.black-square');
    if (!blackSquare || !el) return;

    bindEvents(bindState, [
      [blackSquare, 'drop', onDrop],
      [blackSquare, 'dragover', onDragOver],
      [blackSquare, 'dragleave', onDragLeave],
      [el, 'dragstart', onDragStart],
      [el, 'dragend', onDragEnd],
    ]);

    return;
  }

  if (deviceState === 'mobile') {
    if (!el) return;

    bindEvents(
      bindState,
      [
        [el, 'touchstart', onTouchStart],
        [el, 'touchmove', onTouchMove],
        [el, 'touchend', onTouchEnd],
        [el, 'touchcancel', onTouchEnd],
      ],
      TOUCH_OPTS
    );
  }
};
