const QUIET_MS_BASE = 800; // 600~1200ms 사이로 시작, 필요시 튜닝
const isReload = (() => {
  const nav = performance.getEntriesByType('navigation')[0];
  return nav && nav.type === 'reload';
})();

// 리로드면 대기시간을 약간 더 준다
const delay = isReload ? QUIET_MS_BASE + 400 : QUIET_MS_BASE;

// 탭 비활성 상태면(백그라운드) WS 연결을 늦춘다 → 실제로 필요한 순간에만 업그레이드
function onVisibleOnce(fn) {
  if (document.visibilityState === 'visible') return fn();
  const h = () => { if (document.visibilityState === 'visible') { document.removeEventListener('visibilitychange', h); fn(); } };
  document.addEventListener('visibilitychange', h);
}

export function connectWithStartupDebounce(url, protocols) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      try {
        const ws = new WebSocket(url, protocols);
        ws.addEventListener('open', () => resolve(ws), { once: true });
        ws.addEventListener('error', (e) => reject(e), { once: true });
      } catch (e) { reject(e); }
    }, delay);

    // 페이지가 다시 숨겨지면 더 미룰 수도 있음(선택)
    if (document.visibilityState !== 'visible') {
      clearTimeout(timer);
      onVisibleOnce(() => connectWithStartupDebounce(url, protocols).then(resolve, reject));
    }
  });
}
