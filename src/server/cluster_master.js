import cluster from 'cluster';
import os from 'os';
import { randomUUID } from 'crypto';
import Redis from 'ioredis';

const numCPUs = os.cpus().length; // 시스템에서 사용할 수 있는 CPU 코어 수 - 6개

const clientLocation = new Map(); // clientId -> workerId
const waitingQueue = []; // clientId만 저장 (또는 { clientId, gameType })

const ROOMS = Object.create(null);
const PEERS = new WeakMap();

const now = () => Date.now();
const makeRoomId = () => `room-${Math.random().toString(36).slice(2, 10)}`;

function findWaitingRoom() {
  for (const id in ROOMS) {
    const room = ROOMS[id];
    if (room && !room.lockAfterLeave && room.clients.size === 1) {
      return room;
    }
  }
  return null;
}
function createRoom() {
  const id = makeRoomId();
  ROOMS[id] = {
    id,
    clients: new Map(),
    createdAt: now(),
  };
  return ROOMS[id];
}

function createWaitRoomQuery({ expectedWorkers, timeoutMs = 800 }) {
  const requestId = randomUUID();

  let done = false;
  let resolve;
  const p = new Promise((res) => (resolve = res));

  const responded = new Set(); // workerId 집계
  let hasTrue = false;

  const timer = setTimeout(() => {
    if (done) return;
    done = true;
    resolve({ requestId, hasTrue, reason: 'timeout', responded: responded.size });
  }, timeoutMs);

  return {
    requestId,

    // 워커 응답 들어올 때마다 호출
    onResponse({ workerId, waitRoom }) {
      if (done) return;

      // 워커별 1회만 카운트(중복 응답 방지)
      if (responded.has(workerId)) return;
      responded.add(workerId);

      if (waitRoom === true) {
        hasTrue = true;
        // true면 조기 종료(원하시면 주석 처리하고 끝까지 모아오 됨)
        done = true;
        clearTimeout(timer);
        resolve({ requestId, hasTrue: true, reason: 'early-true', responded: responded.size });
        return;
      }

      // 전부 응답했는데 true가 없으면 종료
      if (responded.size >= expectedWorkers) {
        done = true;
        clearTimeout(timer);
        resolve({ requestId, hasTrue, reason: 'all-responded', responded: responded.size });
      }
    },

    done() {
      return p;
    },
  };
}

if (cluster.isPrimary) {
  console.log(`Primary process is running. Forking ${numCPUs} workers...`);

  // numCPUs 만큼 워커를 생성합니다.
  for (let i = 0; i < numCPUs; i++) {
    // const workerType = i % 2 === 0 ? 'webrtc' : 'websocket'; // 짝수는 WebRTC, 홀수는 WebSocket
    const workerType = i % 2 === 0 ? 'signalingServer' : 'jwt'; // 짝수는 WebRTC, 홀수는 Signaling Server
    cluster.fork({ WORKER_TYPE: workerType });
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

      const { type } = message.data;

      switch (type) {
        case 'GET_FIND_WAITING_WORKER_ROOM': {
          // 다른 워커에 메시지 전달
          for (const id in cluster.workers) {
            if (cluster.workers.hasOwnProperty(id)) {
              cluster.workers[id].send({
                type: 'SET_FIND_WAITING_WORKER_ROOM',
                workerId: worker.id,
              });
            }
          }
          break;
        }
        case 'SEND_WAITING_WORKER_ROOM': {
          const { waitRoom, workerId } = message.data;

          cluster.workers[workerId].send({
            type: 'FIND_WAITING_WORKER_ROOM',
            data: {
              waitRoom,
              workerId: worker.id, // workerId: 방이 있다고 응답한 peer가 속해있는 worker.id
            },
          });

          /* if (waitRoom) {
            // cluster.workers[workerId]: 처음 room을 찾으려고 요청했던 peer가 속해있는 worker.id
            cluster.workers[workerId].send({
              type: 'FIND_WAITING_WORKER_ROOM',
              data: {
                workerId: worker.id, // workerId: 방이 있다고 응답한 peer가 속해있는 worker.id
              },
            });
          } */
          break;
        }

        /* case 'REGISTER_CLIENT': {
          const { peerId } = message.data;
          clientLocation.set(peerId, worker.id);
          let room = findWaitingRoom();
          if (!room) room = createRoom();

          room.clients.set(peerId, worker.id);

          const role = room.clients.size === 1 ? 'impolite' : 'polite';

          cluster.workers[worker.id].send({
            type: 'ROOM_ASSIGNED',
            data: {
              peerId,
              roomId: room.id,
              role,
            },
          });

          if (room.clients.size === 2) {
            const peers = Array.from(room.clients.keys());
            const [impolitePeerId, politePeerId] = peers; // 먼저 들어온 순
            const rolesByPeer = {
              [impolitePeerId]: 'impolite',
              [politePeerId]: 'polite',
            };

            for (const [peerId, workerId] of room.clients) {
              const partnerId = peerId === impolitePeerId ? politePeerId : impolitePeerId;

              cluster.workers[workerId].send({
                type: 'PAIRED',
                data: {
                  peerId,
                  roomId: room.id,
                  you: { peerId: peerId, role: rolesByPeer[peerId] },
                  partner: { peerId: partnerId, role: rolesByPeer[partnerId] },
                },
              });
            }
          }
          break;
        } */
        /* case 'DELIVER_SIGNAL': {
          const { peerId, partnerId, sdp } = message.data;
          const target = clientLocation.get(partnerId);
          if (target) {
            cluster.workers[target].send({
              type: 'SEND_SIGNAL',
              data: {
                peerId,
                partnerId,
                sdp,
              },
            });
          }
          break;
        } */
        /* case 'JOIN_WAITING': {
          const { peerId } = message.data;
          waitingQueue.push(peerId);

          if (waitingQueue.length >= 2) {
            const a = waitingQueue.shift(); // waitingQueue 배열에서 첫번째 peerId 가져오기
            const b = waitingQueue.shift();

            const workerA = clientLocation.get(a); // worker.id 가져오기
            const workerB = clientLocation.get(b);

            const roomId = makeRoomId();

            // 각 worker에게 "너희 둘이 방이야" 라고 통보
            cluster.workers[workerA].send({
              type: 'MATCH_FOUND',
              roomId,
              peerId: a,
              partnerId: b,
              role: 'impolite',
            });
            cluster.workers[workerB].send({
              type: 'MATCH_FOUND',
              roomId,
              peerId: b,
              partnerId: a,
              role: 'polite',
            });
          }
          break;
        } */
      }
    }
  });

  // 워커 종료 이벤트 처리
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork(worker.env); // 워커 환경을 유지하면서 재시작
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
