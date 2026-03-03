import deviceStateStore from '@/client/store/deviceStateStore';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import selectDrop from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectDrop";
import selectDragover from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectDragover";
import selectDragleave from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectDragleave";
import selectDragStart from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectDragStart";
import selectDragEnd from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectDragEnd";
import selectTouchStart from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectTouchStart.js";
import selectTouchMove from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectTouchMove";
import selectTouchEnd from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectTouchEnd";

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
const handleDragStart = (event) => selectDragStart(event);
const handleDragOver = (event) => selectDragover(event);
const handleDragLeave = (event) => selectDragleave(event);
const handleDrop = (event) => selectDrop(event);
const handleDropEnd = (event) => selectDragEnd(event);
const handleTouchStart = (event) => selectTouchStart(event);
const handleTouchMove = (event) => selectTouchMove(event);
const handleTouchEnd = (event) => selectTouchEnd(event);

// ✅ 이벤트에 붙일 최종 핸들러(옵션 적용)
const onDragStart = withGuard(handleDragStart);
const onDragOver = withGuard(handleDragOver, { prevent: true });
const onDragLeave = withGuard(handleDragLeave, { prevent: true });
const onDrop = withGuard(handleDrop, { prevent: true });
const onDragEnd = withGuard(handleDropEnd);
const onTouchStart = withGuard(handleTouchStart);
const onTouchMove = withGuard(handleTouchMove);
const onTouchEnd = withGuard(handleTouchEnd);

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
  const BLACK_SQUARE = document.querySelector(".black-square");

  // PC
  if (deviceState === 'pc') {
    if (!BLACK_SQUARE || !el) return;

    bindEvents([
      [BLACK_SQUARE, 'drop', onDrop],
      [BLACK_SQUARE, 'dragover', onDragOver],
      [BLACK_SQUARE, 'dragleave', onDragLeave],
      [el, 'dragstart', onDragStart],
      [el, 'dragend', onDragEnd],
    ]);
    return;
  };

  // MOBILE
  if (deviceState === 'mobile') {
    bindEvents([
      [el, 'touchstart', onTouchStart],
      [el, 'touchmove', onTouchMove],
      [el, 'touchend', onTouchEnd],
    ]);
  };
};

/*
export default (el) => {
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
  switch (deviceState) {
    case "pc":
      // add ondrop, ondragover
      const BLACK_SQUARE = document.querySelector(".black-square");
      if (BLACK_SQUARE) {
        BLACK_SQUARE.addEventListener("drop", selectDrop, false);
        BLACK_SQUARE.addEventListener("dragover", selectDragover, false);
        BLACK_SQUARE.addEventListener("dragleave", selectDragleave, false);
        el.addEventListener("dragstart", selectDragStart, false);
        el.addEventListener("dragend", selectDragEnd, false);
      }
      break;
    case "mobile":
      el.addEventListener("touchstart", selectTouchStart, false);
      el.addEventListener("touchmove", selectTouchMove, false);
      el.addEventListener("touchend", selectTouchEnd, false);
      break;
    default:
      break;
  }
};
*/
