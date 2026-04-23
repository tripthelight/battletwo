import cluster from 'cluster';
import Redis from 'ioredis';

const workerTypes = ['signalingServer', 'jwt'];
const workerTypeById = new Map();

function forkWorker(workerType) {
  const worker = cluster.fork({ WORKER_TYPE: workerType });
  workerTypeById.set(worker.id, workerType);
}

if (cluster.isPrimary) {
  console.log(`Primary process is running. Forking ${workerTypes.length} workers...`);

  for (let i = 0; i < workerTypes.length; i++) {
    forkWorker(workerTypes[i]);
  }

  // 워커 간 통신을 위한 메시지 핸들링
  cluster.on('message', (worker, message) => {
    // console.log(`Message from worker ${worker.process.pid}:`, message);
    // console.log(`Message type : `, message.type);
    // 메시지에 따라 다른 워커에게 전달
    // 예: WebSocket 서버끼리 연결, Signaling 서버끼리 연결
    if (message.type === 'websocket') {
      // WebSocket 서버들 간 통신 처리
    } else if (message.type === 'signalingServer') {
      // Signaling Server 서버들 간 통신 처리
      /* for (const id in cluster.workers) {
        if (cluster.workers.hasOwnProperty(id) && cluster.workers[id] !== worker) {
          cluster.workers[id].send(message); // 다른 워커에 메시지 전달
        }
      } */
    }
  });

  // 워커 종료 이벤트 처리
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    const workerType = workerTypeById.get(worker.id);
    workerTypeById.delete(worker.id);
    if (workerType) forkWorker(workerType);
  });
} else {
  // 각 워커 프로세스가 수행할 작업 결정
  if (process.env.WORKER_TYPE === 'signalingServer') {
    console.log('open Signaling Server');
    import('./signaling_server.js');
  } else if (process.env.WORKER_TYPE === 'jwt') {
    console.log('open server jwt');
    import('./server_jwt.js');
  }
}
