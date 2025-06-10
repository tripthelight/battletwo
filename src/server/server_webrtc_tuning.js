import dotenv from 'dotenv';
dotenv.config();
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { WebSocketServer } from 'ws';
import { MAKE_STORAGE } from './functions/encryption/makeStorage.js';

// WebSocket 서버 생성
const PORT = process.env.RTC_PORT || 8081;
const WSS = new WebSocketServer({ port: PORT });
const REDIS = new Redis(); // 6379 단일 redis server
const ROOMS_MAP = {}; // room name과 WebSocket 인스턴스를 매핑할 Map
const STANDBY_MAP = {}; // standby 상태인 사용자만 저장

// 연결된 클라이언트 처리
WSS.on('connection', async (socket) => {
  console.log('WebSocket connection');

  socket.on('message', async (data) => {
    const parsedData = JSON.parse(data); // 메시지 파싱

    if (parsedData.type === 'requestStorage') {
      const STORAGE_DATA = await MAKE_STORAGE.findGame(parsedData.gameName);
      socket.send(
        JSON.stringify({
          type: 'responseStorage',
          ...STORAGE_DATA,
        }),
      );
    }
  });

  socket.on('close', () => {
    console.log('WebSocket close');
  });
});

console.log(`WebRTC server ${process.pid} running on port ${PORT}`);
