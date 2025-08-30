let ws = null;
const ports = new Set();
let url = null;

function broadcast(msg) {
  const s = JSON.stringify(msg);
  ports.forEach(p => p.postMessage(s));
}

function ensureWS(u) {
  if (ws && ws.readyState <= 1 && url === u) return;
  url = u;
  if (ws) try { ws.close(); } catch {}
  ws = new WebSocket(url);
  ws.onopen = () => broadcast({ type: 'ws:open' });
  ws.onmessage = (ev) => broadcast({ type: 'ws:message', data: ev.data });
  ws.onerror = (ev) => broadcast({ type: 'ws:error' });
  ws.onclose = () => broadcast({ type: 'ws:close' });
}

onconnect = (e) => {
  const port = e.ports[0];
  ports.add(port);

  port.onmessage = (ev) => {
    const msg = (() => { try { return JSON.parse(ev.data); } catch { return ev.data; } })();
    if (!msg || typeof msg !== 'object') return;
    if (msg.type === 'init') {
      // 지연 연결(디바운스)도 여기서 수행 가능
      setTimeout(() => ensureWS(msg.url), msg.quietMs ?? 0);
    } else if (msg.type === 'send' && ws && ws.readyState === WebSocket.OPEN) {
      ws.send(msg.data);
    }
  };

  port.start();
  port.postMessage(JSON.stringify({ type: 'worker:ready' }));

  port.onmessageerror = () => {};
  port.onclose = () => { ports.delete(port); };
};
