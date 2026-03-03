import deviceStateStore from '@/client/store/deviceStateStore';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import shuffleStart from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleStart";
import shuffleEnter from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleEnter";
import shuffleOver from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleOver";
import shuffleLeave from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleLeave";
import shuffleDrop from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleDrop";
import shuffleEnd from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleEnd";
import shuffleTouchStart from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleTouchStart";
import shuffleTouchMove from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleTouchMove";
import shuffleTouchEnd from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleTouchEnd";

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
const handleDragStart = (event) => shuffleStart(event);
const handleDragEnter = (event) => shuffleEnter(event);
const handleDragOver = (event) => shuffleOver(event);
const handleDragLeave = (event) => shuffleLeave(event);
const handleDrop = (event) => shuffleDrop(event);
const handleDropEnd = (event) => shuffleEnd(event);
const handleTouchStart = (event) => shuffleTouchStart(event);
const handleTouchMove = (event) => shuffleTouchMove(event);
const handleTouchEnd = (event) => shuffleTouchEnd(event);

// ✅ 이벤트에 붙일 최종 핸들러(옵션 적용)
const onDragStart = withGuard(handleDragStart);
const onDragEnter = withGuard(handleDragEnter);
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
  if (!el) return;
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;

  // PC
  if (deviceState === 'pc') {
    bindEvents([
      [el, 'dragstart', onDragStart],
      [el, 'dragenter', onDragEnter],
      [el, 'dragover', onDragOver],
      [el, 'dragleave', onDragLeave],
      [el, 'drop', onDrop],
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
      el.addEventListener("dragstart", shuffleStart, false);
      el.addEventListener("dragenter", shuffleEnter, false);
      el.addEventListener("dragover", shuffleOver, false);
      el.addEventListener("dragleave", shuffleLeave, false);
      el.addEventListener("drop", shuffleDrop, false);
      el.addEventListener("dragend", shuffleEnd, false);
      break;
    case "mobile":
      const CUBE_EL = document.querySelectorAll("ul.cube li");
      for (let i = 0; i < CUBE_EL.length; i++) {
        CUBE_EL[i].removeAttribute("draggable");
      }
      el.addEventListener("touchstart", shuffleTouchStart, false);
      el.addEventListener("touchmove", shuffleTouchMove, false);
      el.addEventListener("touchend", shuffleTouchEnd, false);
      break;
    default:
      break;
  }
};
*/
