const AUTO_HIDE_MS = 5000;

let autoHideTimer = null;
let timerOwner = null;

const clearAutoHideTimer = (elem = null) => {
  if (
    autoHideTimer !== null &&
    (elem === null || timerOwner === elem)
  ) {
    clearTimeout(autoHideTimer);
    autoHideTimer = null;
    timerOwner = null;
  }
};

export const dismissInnerSquareNotice = (
  elem = document.querySelector('.inner-square')
) => {
  if (!elem) return false;

  clearAutoHideTimer(elem);
  elem.classList.add('notice-hidden');
  return true;
};

export const ensureInnerSquareCloseButton = (elem) => {
  if (!elem) return null;

  const existing = elem.querySelector('.inner-square-close');
  if (existing) return existing;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'inner-square-close';
  button.setAttribute('aria-label', 'Close');
  button.textContent = '×';

  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    dismissInnerSquareNotice(elem);
  });

  elem.appendChild(button);
  return button;
};

/**
 * 안내 팝업을 보이고 5초 자동 숨김 타이머를 새로 시작한다.
 *
 * 자동/수동 숨김에서는 DOM을 제거하지 않는다. 그래야 같은 Round 안에서
 * 상대 Turn -> 내 Turn으로 바뀌거나 다음 Round가 시작될 때 같은 element를
 * 즉시 다시 노출할 수 있다. 실제 Cube 제출로 안내가 끝나는 경우에는
 * hideInnerSquare()가 clearInnerSquareNotice() 후 DOM을 제거한다.
 */
export const showInnerSquareNotice = (
  elem = document.querySelector('.inner-square')
) => {
  if (!elem || !elem.isConnected) return false;

  ensureInnerSquareCloseButton(elem);
  clearAutoHideTimer();

  elem.classList.remove('notice-hidden');

  timerOwner = elem;
  autoHideTimer = setTimeout(() => {
    if (timerOwner !== elem) return;

    autoHideTimer = null;
    timerOwner = null;

    if (!elem.isConnected) return;
    elem.classList.add('notice-hidden');
  }, AUTO_HIDE_MS);

  return true;
};

export const clearInnerSquareNotice = (
  elem = document.querySelector('.inner-square')
) => {
  if (!elem) {
    clearAutoHideTimer();
    return;
  }

  clearAutoHideTimer(elem);
};
