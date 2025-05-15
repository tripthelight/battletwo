import deviceStateStore from '@/client/store/deviceStateStore.js';

// 모바일 브라우저에서 console log 표시
export const debug = {
  drew: () => {
    const BODY = document.body;
    if (!BODY) return;
    if (document.body.querySelector('.debug-block')) return; // 이미 있으면 중복 생성 방지
    const DEBUG_BLOCK = document.createElement('div');
    DEBUG_BLOCK.classList.add('debug-block');
    BODY.appendChild(DEBUG_BLOCK);
  },
  log: (_data) => {
    // 모바일에서만 실행
    const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
    if (deviceState === 'pc') return;

    debug.drew();
    const DEBUG_EL = document.body.querySelector('.debug-block');
    if (!DEBUG_EL) return;

    DEBUG_EL.innerHTML += `${_data}<br>`;
  },
};
