const ch = new BroadcastChannel('ws-leader');
let isLeader = false;
let ws = null;
let heartbeatTimer = null;

function becomeLeader(url) {
  if (isLeader) return;
  isLeader = true;
  ws = new WebSocket(url);
  ws.onopen = () => ch.postMessage({ t: 'state', s: 'open' });
  ws.onmessage = (e) => ch.postMessage({ t: 'msg', d: e.data });
  ws.onclose = () => { ch.postMessage({ t: 'state', s: 'close' }); resign(); };
  ws.onerror = () => ch.postMessage({ t: 'state', s: 'error' });

  // 하트비트로 리더 생존 공지
  heartbeatTimer = setInterval(() => ch.postMessage({ t: 'hb' }), 1000);
}

function resign() {
  isLeader = false;
  if (ws) try { ws.close(); } catch {}
  ws = null;
  clearInterval(heartbeatTimer);
  heartbeatTimer = null;
}

function tryElect(url, quietMs = 800) {
  // 조용한 구간 뒤 리더 자원
  const timer = setTimeout(() => {
    if (!isLeader) becomeLeader(url);
  }, quietMs);

  // 다른 탭이 이미 리더라면 내가 포기
  let lastHb = Date.now();
  ch.onmessage = (ev) => {
    const m = ev.data;
    if (m?.t === 'hb') lastHb = Date.now();
  };
  // 최근 하트비트가 들리면 리더가 있음 → 타이머 취소
  const watcher = setInterval(() => {
    if (Date.now() - lastHb < 1500) { clearTimeout(timer); clearInterval(watcher); }
  }, 300);
}

export function initLeaderWS(url) {
  tryElect(url, 800);
  // 내가 리더가 아니면 메시지는 BroadcastChannel로 리더에게 위임
  return {
    send: (data) => ch.postMessage({ t: 'send', d: data })
  };
}

// 리더가 받은 프록시 송신
ch.onmessage = (ev) => {
  const m = ev.data;
  if (isLeader && m?.t === 'send' && ws?.readyState === WebSocket.OPEN) {
    ws.send(m.d);
  }
};
