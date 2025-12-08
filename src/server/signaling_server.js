import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { MAKE_STORAGE } from './functions/encryption/makeStorage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.RTC_PORT;
const HOST = process.env.RTC_HOST;
server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`, process.pid);
});

// ———————————————————————————————————————————————————

function procSend(type, obj) {
  switch (type) {
    case 'reqFindWaitingRoom': {
      process.send({ type: 'signalingServer', data: { type: 'reqFindWaitingRoom', pid: process.pid } });
      break;
    }
    case 'resFindWaitingRoom': {
      const { waitRoom } = obj;
      process.send({ type: 'signalingServer', data: { type: 'resFindWaitingRoom', pid: process.pid, waitRoom } });
      break;
    }
    default: {
      break;
    }
  }
}

const ROOM_TTL_MS = 15_000; // 15초 안에 돌아오면 같은 room 재활용
const TOMBSTONES = new Map(); // roomId -> { roomId, expiredAt, lastSeenAt }

const ROOMS = Object.create(null);
const PEERS = new WeakMap();
// const ROOMS = new Map(); // roomId -> { selfId, peerId }
// const CLIENTS = new Map(); // clientId -> ws

const now = () => Date.now();
const makeRoomId = () => `room-${Math.random().toString(36).slice(2, 10)}`;

function safeSend(ws, obj) {
  if (ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify(obj));
  }
}
function findWaitingRoom() {
  process.send({
    type: 'signalingServer',
    data: {
      type: 'FIND_WAITING_ROOM',
      workerId: process.pid, // 또는 cluster.worker.id
    },
  });
  /* for (const id in ROOMS) {
    const room = ROOMS[id];
    if (room && !room.lockAfterLeave && room.clients.size === 1) {
      return room;
    }
  }
  return null; */
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

function findWaitingWorkerRoom() {
  for (const id in ROOMS) {
    const room = ROOMS[id];
    if (room && !room.lockAfterLeave && room.clients.size === 1) {
      return room;
    }
  }
  return null;
}
function createWorkerRoom() {
  const id = makeRoomId();
  ROOMS[id] = {
    id,
    clients: new Map(),
    createdAt: now(),
  };
}
function broadcast(room, obj) {
  for (const [, sock] of room.clients) {
    safeSend(sock, obj);
  }
}
function deleteRoomIfEmpty(roomId) {
  const room = ROOMS[roomId];
  if (!room) return;
  if (room.clients.size === 0) {
    delete ROOMS[roomId];
  }
}
function attachToRoom(ws, meta, room, pairedDataChannel) {
  room.clients.set(meta.peerId, ws);
  meta.roomId = room.id;

  // 역할 부여
  const role = room.clients.size === 1 ? 'impolite' : 'polite';
  safeSend(ws, { type: 'room-assigned', roomId: room.id, peerId: meta.peerId, role, pairedDataChannel });

  if (room.clients.size === 2) {
    const peers = Array.from(room.clients.keys());
    const [impolitePeerId, politePeerId] = peers; // 먼저 들어온 순
    for (const [id, sock] of room.clients) {
      const partnerId = id === impolitePeerId ? politePeerId : impolitePeerId;
      const role = id === impolitePeerId ? 'impolite' : 'polite';
      safeSend(sock, {
        type: 'paired',
        roomId: room.id,
        you: { peerId: id, role },
        partner: { peerId: partnerId, role: role === 'impolite' ? 'polite' : 'impolite' },
      });
    }
    room.paired = true;
    if (room.lockAfterLeave) {
      delete room['lockAfterLeave'];
    }
  }
}
function createRoomWithId(roomId) {
  ROOMS[roomId] = {
    id: roomId,
    clients: new Map(),
    createdAt: now(),
    paired: true,
    lockAfterLeave: true,
  };
  return ROOMS[roomId];
}
function handleJoin(ws, meta, msg) {
  // msg: { type:'join', roomHint?: string }
  const requested = typeof msg.roomHint === 'string' ? msg.roomHint : null;

  // - 한 peer가 처음 진입 후 새로고침 - requested 있음
  // - 두 peer 연결된 후 한 peer가 새로고침 - requested 있음
  // - 두 peer 연결된 후 두 peer가 새로고침 난타 - requested 있다없다
  // - 두 peer 연결된 후 한 peer가 나가고 남은 peer가 새로고침 - requested 있음

  // 1) roomHint가 있고, 그 방이 현재 살아있다면 그 방으로
  // 두 peer가 나가지 않은 상태에서 한 peer가 새로고침하면 새로고침 한 peer는 여기를 탐
  /* if (requested && ROOMS[requested] && ROOMS[requested].clients.size < 2) {
    attachToRoom(ws, meta, ROOMS[requested]);
    return;
  } */

  // 2) roomHint가 무덤에 있고(아직 TTL 안 지남) → 방 부활
  /* if (requested && TOMBSTONES.has(requested)) {
    // 부활
    TOMBSTONES.delete(requested);
    const revivedRoom = createRoomWithId(requested);
    attachToRoom(ws, meta, revivedRoom, true);
    return;
  } */

  // 3) roomHint가 없거나, 사용할 수 없다면 "일반 매칭"
  // let room = findWaitingRoom();
  // if (!room) room = createRoom();
  // attachToRoom(ws, meta, room);
  // process.send({
  //   type: 'signalingServer',
  //   data: {
  //     type: 'REGISTER_CLIENT',
  //     peerId: meta.peerId,
  //   },
  // });

  // const room = createRoom();
  // room.clients.set(meta.peerId, ws);

  process.send({
    type: 'signalingServer',
    data: {
      type: 'GET_FIND_WAITING_WORKER_ROOM',
      workerId: process.pid, // 또는 cluster.worker.id
    },
  });
}

function cbConnection(ws, req) {
  // const ip = req?.socket?.remoteAddress;
  // console.log('클라이언트 IP:', ip);
  const peerId = randomUUID();

  // "바로 배정"하지 않고, 클라의 'join' 메시지를 기다립니다.
  PEERS.set(ws, { peerId, roomId: null });

  // CLIENTS.set(peerId, ws);

  /* process.send({
    type: 'signalingServer',
    data: {
      type: 'REGISTER_CLIENT',
      peerId,
      workerId: process.pid, // 또는 cluster.worker.id
    },
  }); */

  ws.on('message', (buf) => {
    let msg;
    try {
      msg = JSON.parse(buf.toString());
    } catch {
      return;
    }
    const meta = PEERS.get(ws);
    if (!meta) return;

    if (msg?.type === 'join') {
      // ★ 클라가 요청한 room 합류
      handleJoin(ws, meta, msg);
      return;
    }

    if (msg?.type === 'signal' && msg?.to) {
      const room = ROOMS[meta.roomId];
      if (!room) return;
      const target = room.clients.get(msg.to);
      if (target) {
        safeSend(target, { type: 'signal', from: meta.peerId, data: msg.data });
      }
      return;
    }
  });

  ws.on('close', () => {
    const meta = PEERS.get(ws);
    if (!meta) return;
    const { peerId, roomId } = meta;
    const room = ROOMS[roomId];

    if (room) {
      if (room.clients.size === 2) {
        // 두 peer 모두 있음
        room.clients.delete(peerId);
        broadcast(room, { type: 'partner-left', roomId, peerId });
        room.lockAfterLeave = true;
      } else if (room.clients.size === 1) {
        if (room.paired) {
          // 이전에 연결된 적 있음
          room.lockAfterLeave = true;
          TOMBSTONES.set(roomId, { roomId, expiredAt: now() + ROOM_TTL_MS, lastSeenAt: now() });
        } else {
          // 내가 처음 진입하고 아직 상대 peer 없음
        }
        room.clients.delete(peerId);
        delete ROOMS[roomId];
      }
    }
    PEERS.delete(ws);
  });
}

// 다른 프로세스에서 보내온 메시지를 처리
process.on('message', (message) => {
  switch (message.type) {
    case 'SET_FIND_WAITING_WORKER_ROOM': {
      // 내 worker를 순회하며 clients가 1명인 room 있으면 true | false
      const waitRoomState = () => {
        for (const id in ROOMS) {
          const room = ROOMS[id];
          if (room && !room.lockAfterLeave && room.clients.size === 1) {
            return true;
          }
        }
        return false;
      };
      // cluster에 보내야 할 data : { 대기중 방 여부, process.pid }
      process.send({
        type: 'signalingServer',
        data: {
          type: 'SEND_WAITING_WORKER_ROOM',
          waitRoom: waitRoomState(),
          workerId: message.workerId,
        },
      });
    }
    case 'FIND_WAITING_WORKER_ROOM': {
      //
    }

    /* case 'ROOM_ASSIGNED': {
      const { peerId, roomId, role } = message.data;
      const ws = CLIENTS.get(peerId);
      if (ws) {
        ws.send(
          JSON.stringify({
            type: 'room-assigned',
            roomId,
            peerId,
            role,
          }),
        );
      }
      break;
    } */
    /* case 'PAIRED': {
      const { peerId, roomId, you, partner } = message.data;
      const ws = CLIENTS.get(peerId);
      if (ws) {
        const meta = PEERS.get(ws);
        if (!meta) return;
        meta.roomId = roomId;
        ws.send(
          JSON.stringify({
            type: 'paired',
            roomId,
            you,
            partner,
          }),
        );
      }
      break;
    } */
    /* case 'SEND_SIGNAL': {
      const { peerId, partnerId, sdp } = message.data;
      const targetWs = CLIENTS.get(partnerId);
      if (targetWs) {
        safeSend(targetWs, {
          type: 'signal',
          from: peerId,
          data: sdp,
        });
      }
      break;
    } */
    default: {
      break;
    }
  }
});

wss.on('connection', cbConnection);
