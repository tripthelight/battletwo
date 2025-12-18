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

const ROOM_TTL_MS = 15_000; // 15초 안에 돌아오면 같은 room 재활용
const TOMBSTONES = new Map(); // roomId -> { roomId, expiredAt, lastSeenAt }
const KEYPAIR = new Map(); // roomId -> { keypair }

const ROOMS = Object.create(null);
const PEERS = new WeakMap();

const now = () => Date.now();
const makeRoomId = () => `room-${Math.random().toString(36).slice(2, 10)}`;
const keypairCode = (key) =>
  key
    .replace(/\s+/g, '') // 띄어쓰기 제거
    .replace(/[^a-zA-Z0-9가-힣]/g, '') // 특수문자 제거
    .split('') // 문자열 → 배열
    .reverse() // 배열 역순
    .join(''); // 배열 → 문자열

function safeSend(ws, obj) {
  if (ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify(obj));
  }
}
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
    keypair: keypairCode(id),
  };
  return ROOMS[id];
}
function createRoomWithId(roomId) {
  ROOMS[roomId] = {
    id: roomId,
    clients: new Map(),
    keypair: keypairCode(roomId),
    paired: true,
    lockAfterLeave: true,
  };
  return ROOMS[roomId];
}
function broadcast(room, obj) {
  for (const [, sock] of room.clients) {
    safeSend(sock, obj);
  }
}

function attachToRoom(ws, meta, room, pairedDataChannel) {
  room.clients.set(meta.peerId, ws);
  meta.roomId = room.id;

  if (!meta.keypair) {
    meta.keypair = randomUUID();
  }

  // 역할 부여
  const role = room.clients.size === 1 ? 'impolite' : 'polite';
  safeSend(ws, {
    type: 'room-assigned',
    roomId: room.id,
    peerId: meta.peerId,
    role,
    pairedDataChannel,
    keypair: meta.keypair
      .replace(/\s+/g, '') // 1. 띄어쓰기 제거
      .replace(/[^a-zA-Z0-9가-힣]/g, '') // 2. 특수문자 제거
      .slice(-10), // 3. 맨 뒤 10자리));,
  });

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
function handleJoin(ws, meta, msg) {
  // msg: { type:'join', roomHint?: string }
  const requested = typeof msg.roomHint === 'string' ? msg.roomHint : null;

  // - 한 peer가 처음 진입 후 새로고침 - requested 있음
  // - 두 peer 연결된 후 한 peer가 새로고침 - requested 있음
  // - 두 peer 연결된 후 두 peer가 새로고침 난타 - requested 있다없다
  // - 두 peer 연결된 후 한 peer가 나가고 남은 peer가 새로고침 - requested 있음

  // 1) roomHint가 있고, 그 방이 현재 살아있다면 그 방으로
  // 두 peer가 나가지 않은 상태에서 한 peer가 새로고침하면 새로고침 한 peer는 여기를 탐
  if (requested && ROOMS[requested] && ROOMS[requested].clients.size < 2) {
    if (KEYPAIR.has(requested)) {
      meta.keypair = KEYPAIR.get(requested);
      KEYPAIR.delete(requested);
    }

    attachToRoom(ws, meta, ROOMS[requested]);
    return;
  }

  // 2) roomHint가 무덤에 있고(아직 TTL 안 지남) → 둘 다 나가서 ROOMS에서 방 삭제되었지만 → 방 부활
  if (requested && TOMBSTONES.has(requested)) {
    // 부활
    TOMBSTONES.delete(requested);
    const revivedRoom = createRoomWithId(requested);

    if (KEYPAIR.has(requested)) {
      meta.keypair = KEYPAIR.get(requested);
      KEYPAIR.delete(requested);
    }

    attachToRoom(ws, meta, revivedRoom, true);
    return;
  }

  /* // 쓰레기 KEYPAIR 제거
  for (const roomId of KEYPAIR.keys()) {
    if (!(roomId in ROOMS)) {
      KEYPAIR.delete(roomId);
    }
  }
  console.log('KEYPAIR handleJoin : ', KEYPAIR);

  // 쓰레기 TOMBSTONES 제거
  for (const roomId of TOMBSTONES.keys()) {
    if (!(roomId in ROOMS)) {
      TOMBSTONES.delete(roomId);
    }
  }
  console.log('TOMBSTONES handleJoin : ', TOMBSTONES); */

  // 3) roomHint가 없거나, 사용할 수 없다면 "일반 매칭"
  let room = findWaitingRoom();
  if (!room) room = createRoom();
  attachToRoom(ws, meta, room);
}

function cbConnection(ws, req) {
  // const ip = req?.socket?.remoteAddress;
  // console.log('클라이언트 IP:', ip);
  const peerId = randomUUID();

  // "바로 배정"하지 않고, 클라의 'join' 메시지를 기다립니다.
  PEERS.set(ws, { peerId, roomId: null, keypair: null });

  ws.on('message', async (buf) => {
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

    if (msg?.type === 'requestStorage' && msg?.gameName) {
      const room = ROOMS[meta.roomId];
      if (!room) return;
      const localPeer = room.clients.get(meta.peerId);

      if (localPeer) {
        // 각 게임에 필요한 암호화된 sessionStorage 생성
        const STORAGE_DATA = await MAKE_STORAGE.findGame(msg.gameName, meta.keypair);
        safeSend(localPeer, {
          type: 'responseStorage',
          storageData: STORAGE_DATA,
        });
      }
    }
  });

  ws.on('close', () => {
    const meta = PEERS.get(ws);
    if (!meta) return;
    const { peerId, roomId, keypair } = meta;
    const room = ROOMS[roomId];

    if (room) {
      if (room.clients.size === 2) {
        // 두 peer 모두 있음
        room.clients.delete(peerId);
        broadcast(room, { type: 'partner-left', roomId, peerId });
        room.lockAfterLeave = true;

        KEYPAIR.set(roomId, keypair); // 최초 진입시 할당받은 keypair 저장
      } else if (room.clients.size === 1) {
        if (room.paired) {
          // 이전에 연결된 적 있음
          room.lockAfterLeave = true;
          TOMBSTONES.set(roomId, { roomId, expiredAt: now() + ROOM_TTL_MS, lastSeenAt: now() });

          KEYPAIR.set(roomId, keypair); // 최초 진입시 할당받은 keypair 저장
        } else {
          // 내가 처음 진입하고 아직 상대 peer 없음
        }
        room.clients.delete(peerId);
        delete ROOMS[roomId];
      }
    }
    PEERS.delete(ws);

    /* // 쓰레기 KEYPAIR 제거
    for (const roomId of KEYPAIR.keys()) {
      if (!(roomId in ROOMS)) {
        KEYPAIR.delete(roomId);
      }
    }
    console.log('KEYPAIR close : ', KEYPAIR);

    // 쓰레기 TOMBSTONES 제거
    for (const roomId of TOMBSTONES.keys()) {
      if (!(roomId in ROOMS)) {
        TOMBSTONES.delete(roomId);
      }
    }
    console.log('TOMBSTONES close : ', TOMBSTONES); */
  });
}

wss.on('connection', cbConnection);
