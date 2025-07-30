import deviceStateStore from '@/client/store/deviceStateStore.js';

// 모바일 브라우저에서 console log 표시
export const debug = {
  close: () => {
    const BODY = document.body;
    if (!BODY) return;
    const DEBUG_EL = BODY.querySelector('.debug-block');
    if (!DEBUG_EL) return;
    const BTN_CLOSE = DEBUG_EL.querySelector('.btn-close');
    if (!BTN_CLOSE) return;

    BTN_CLOSE.onclick = () => {
      DEBUG_EL.remove();
    };
  },
  drew: () => {
    const BODY = document.body;
    if (!BODY) return;
    if (BODY.querySelector('.debug-block')) return; // 이미 있으면 중복 생성 방지
    const BTN_CLOSE = document.createElement('button');
    BTN_CLOSE.classList.add('btn-close');
    const DEBUG_BLOCK = document.createElement('div');
    DEBUG_BLOCK.classList.add('debug-block');

    DEBUG_BLOCK.appendChild(BTN_CLOSE);
    BODY.appendChild(DEBUG_BLOCK);
  },
  log: (...data) => {
    // 모바일에서만 실행

    const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
    if (deviceState === 'pc') return;

    debug.drew();
    const DEBUG_EL = document.body.querySelector('.debug-block');
    if (!DEBUG_EL) return;

    data.forEach((msg) => {
      const msgType = typeof msg;
      const msgState = msgType === 'object' ? true : false;
      const message = msgState ? JSON.stringify(msg, null, 2) : msg;
      DEBUG_EL.innerHTML += `${message}<br>`;
      DEBUG_EL.scrollTop = DEBUG_EL.scrollHeight;
    });

    debug.close();

    return;
  },
};
