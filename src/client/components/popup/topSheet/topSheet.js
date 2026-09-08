import '@/client/assets/scss/components/topSheet.scss';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import deviceStateStore from '@/client/store/deviceStateStore.js';

const TRANSITION_MS = 200;
let activeSheet = null;
let autoHideTimerId = null;
let cleanupTimerId = null;

function clearTimers() {
  if (autoHideTimerId) {
    clearTimeout(autoHideTimerId);
    autoHideTimerId = null;
  }

  if (cleanupTimerId) {
    clearTimeout(cleanupTimerId);
    cleanupTimerId = null;
  }
}

function removeSheet(sheet) {
  if (!sheet) return;

  if (sheet.isConnected) {
    sheet.remove();
  }

  if (activeSheet === sheet) {
    activeSheet = null;
  }
}

function hideSheet(immediate = false) {
  const sheet = activeSheet;

  clearTimers();

  if (!sheet) return;

  if (immediate) {
    removeSheet(sheet);
    return;
  }

  sheet.classList.remove('show');
  sheet.style.transform = 'translateX(-50%)';

  cleanupTimerId = setTimeout(() => {
    cleanupTimerId = null;
    removeSheet(sheet);
  }, TRANSITION_MS + 1);
}

function enableMobileDismiss(sheet) {
  const deviceState =
    deviceStateStore.getState().deviceStateState.deviceState;

  if (deviceState === 'pc') return;

  let startY = 0;
  let moveY = 0;

  sheet.addEventListener(
    'touchstart',
    (event) => {
      startY = event.targetTouches[0]?.clientY ?? 0;
      moveY = 0;
    },
    { passive: true },
  );

  sheet.addEventListener(
    'touchmove',
    (event) => {
      const currentY = event.targetTouches[0]?.clientY;

      if (!Number.isFinite(currentY)) return;

      moveY = currentY - startY;

      if (moveY < 0) {
        sheet.style.transform =
          `translate(-50%, ${moveY}px)`;
      }
    },
    { passive: true },
  );

  sheet.addEventListener(
    'touchend',
    () => {
      if (Math.abs(Math.min(moveY, 0)) > sheet.clientHeight / 2) {
        hideSheet(false);
        return;
      }

      sheet.style.transform = 'translateX(-50%)';
      startY = 0;
      moveY = 0;
    },
    { passive: true },
  );
}

function drawTopSheet(message, delay) {
  const container = document.getElementById('container');

  if (!container) {
    return errorManagement({
      errCase: 'elementLoss',
      message: 'top sheet를 그리는 중 #container 엘리먼트가 없습니다.',
    });
  }

  hideSheet(true);

  const sheet = document.createElement('div');
  const inner = document.createElement('span');
  const deviceState =
    deviceStateStore.getState().deviceStateState.deviceState;

  sheet.classList.add('top-sheet');
  inner.textContent = String(message ?? '');
  sheet.appendChild(inner);

  if (deviceState === 'pc') {
    const closeButton = document.createElement('a');

    closeButton.href = 'javascript:void(0);';
    closeButton.title = 'close popup';
    closeButton.classList.add('top-sheet-close');
    closeButton.textContent = '×';
    closeButton.addEventListener('click', (event) => {
      event.preventDefault();
      hideSheet(false);
    });

    sheet.appendChild(closeButton);
  }

  activeSheet = sheet;
  container.appendChild(sheet);
  enableMobileDismiss(sheet);

  // 시작 위치(top: -100%)를 한 번만 layout에 확정한 뒤
  // 다음 frame에서 show 상태로 전환해야 slide-down transition이 보장된다.
  void sheet.offsetWidth;

  window.requestAnimationFrame(() => {
    if (activeSheet !== sheet || !sheet.isConnected) return;

    sheet.classList.add('show');

    const duration = Number(delay);

    if (Number.isFinite(duration) && duration >= 0) {
      autoHideTimerId = setTimeout(() => {
        autoHideTimerId = null;
        hideSheet(false);
      }, duration);
    }
  });
}

/**
 * COMMON COMPONENT
 * top sheet
 */
export const topSheet = {
  show: (message, delay = 0) => {
    drawTopSheet(message, delay);
  },
  hide: (immediate = false) => {
    hideSheet(immediate);
  },
};
