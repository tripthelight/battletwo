let touchDragState = null;

const HIT_EPSILON_PX = 1;

function findTouch(touchList, identifier) {
  if (!touchList) return null;

  for (let i = 0; i < touchList.length; i += 1) {
    const touch = touchList[i];
    if (touch.identifier === identifier) return touch;
  }

  return null;
}

function getTouchPoint(event, identifier) {
  return (
    findTouch(event?.targetTouches, identifier) ||
    findTouch(event?.touches, identifier) ||
    findTouch(event?.changedTouches, identifier) ||
    null
  );
}

function setGoalState(state, isInside) {
  state.isInside = isInside;
  state.blackSquare.classList.toggle('over', isInside);
  state.card.classList.toggle('in', isInside);
}

function updateStateFromPoint(state, point) {
  if (!state || !point) return state?.isInside ?? false;

  const moveX = point.clientX - state.startTouchX;
  const moveY = point.clientY - state.startTouchY;

  state.moveX = moveX;
  state.moveY = moveY;

  state.card.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;

  const cubeCenterX = state.startCubeCenterX + moveX;
  const cubeCenterY = state.startCubeCenterY + moveY;

  const isInside = Boolean(
    cubeCenterX >= state.goalCenterX - state.goalHalfWidth - HIT_EPSILON_PX &&
    cubeCenterX <= state.goalCenterX + state.goalHalfWidth + HIT_EPSILON_PX &&
    cubeCenterY >= state.goalCenterY - state.goalHalfHeight - HIT_EPSILON_PX &&
    cubeCenterY <= state.goalCenterY + state.goalHalfHeight + HIT_EPSILON_PX
  );

  setGoalState(state, isInside);
  return isInside;
}

/**
 * Mobile Cube drag를 시작한다.
 *
 * touchmove마다 offsetTop/offsetLeft를 다시 읽지 않도록 시작 시점에만
 * Cube/Goal의 viewport 좌표를 측정하고 이후에는 touch delta만 계산한다.
 * 부모 ul.cube에 translateY가 적용되어 있어도 getBoundingClientRect()는
 * 실제 화면 좌표를 반환하므로 정상 진입/새로고침 복구 모두 동일하다.
 *
 * @param {TouchEvent} event
 * @returns {boolean}
 */
export function startTouchDrag(event) {
  const card = event?.currentTarget;
  const point = event?.targetTouches?.[0] ?? event?.touches?.[0] ?? null;
  const blackSquare = document.querySelector('.black-square.active') ||
    document.querySelector('.black-square');

  if (!(card instanceof HTMLElement) || !point || !blackSquare) {
    touchDragState = null;
    return false;
  }

  const cubeRect = card.getBoundingClientRect();
  const goalRect = blackSquare.getBoundingClientRect();

  if (
    cubeRect.width <= 0 ||
    cubeRect.height <= 0 ||
    goalRect.width <= 0 ||
    goalRect.height <= 0
  ) {
    touchDragState = null;
    return false;
  }

  blackSquare.classList.remove('over');
  card.classList.remove('in');

  card.style.zIndex = '3000';
  card.style.willChange = 'transform';

  touchDragState = {
    identifier: point.identifier,
    card,
    blackSquare,
    startTouchX: point.clientX,
    startTouchY: point.clientY,
    startCubeCenterX: cubeRect.left + cubeRect.width / 2,
    startCubeCenterY: cubeRect.top + cubeRect.height / 2,
    goalCenterX: goalRect.left + goalRect.width / 2,
    goalCenterY: goalRect.top + goalRect.height / 2,
    // .over에서 black-square가 scale(1.2) 되어도 판정 범위가 커지지 않도록
    // 시각 rect가 아니라 원래 box 크기를 판정 범위로 고정한다.
    goalHalfWidth: blackSquare.clientWidth / 2,
    goalHalfHeight: blackSquare.clientHeight / 2,
    moveX: 0,
    moveY: 0,
    isInside: false,
  };

  return true;
}

/**
 * 현재 touch 위치로 Cube를 이동하고 Goal 판정을 갱신한다.
 * layout 측정 없이 숫자 연산만 수행한다.
 *
 * @param {TouchEvent} event
 * @returns {boolean}
 */
export function moveTouchDrag(event) {
  const state = touchDragState;
  if (!state) return false;

  const point = getTouchPoint(event, state.identifier);
  if (!point) return state.isInside;

  return updateStateFromPoint(state, point);
}

/**
 * touchend 최종 좌표를 한 번 더 반영한 뒤 drag 상태를 종료한다.
 *
 * @param {TouchEvent} event
 * @returns {{card: HTMLElement, blackSquare: HTMLElement, isInside: boolean}|null}
 */
export function finishTouchDrag(event) {
  const state = touchDragState;
  if (!state) return null;

  const point = getTouchPoint(event, state.identifier);
  if (point) updateStateFromPoint(state, point);

  state.blackSquare.classList.remove('over');
  state.card.classList.remove('in');
  state.card.style.willChange = '';
  state.card.style.zIndex = '1';

  const result = {
    card: state.card,
    blackSquare: state.blackSquare,
    isInside: state.isInside,
  };

  touchDragState = null;
  return result;
}

/**
 * 브라우저 touchcancel 등 제출이 아닌 종료 시 원래 위치로 복귀한다.
 *
 * @param {TouchEvent} event
 */
export function cancelTouchDrag(event) {
  const result = finishTouchDrag(event);
  if (!result) return;

  result.card.style.transform = '';
}
