import dotenv from 'dotenv';
dotenv.config();
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { WebSocketServer } from 'ws';
import { MAKE_STORAGE } from './functions/encryption/makeStorage.js';

// 워커 고유 채널
const CHANNEL_NAME = `webrtc_worker_${process.pid}`; // 워커 고유 채널
const cryptPID = parseInt( // 브라우저로 보내는 pid 암호화
  parseInt(
    (process.pid).toString(8),  // 8진수 문자열
    8                           // 다시 숫자로
  ).toString(2),                // 2진수 문자열
  2                             // 다시 숫자로
).toString(16);

// WebSocket 서버 생성
const PORT = process.env.RTC_PORT || 8081;
const WSS = new WebSocketServer({ port: PORT });
const REDIS = new Redis(); // 6379 단일 redis server
const REDIS_PUB = new Redis();
const REDIS_SUB = new Redis();
const ROOMS_MAP = {}; // room name과 WebSocket 인스턴스를 매핑할 Map
const STANDBY_MAP = {}; // standby 상태인 사용자만 저장

/*
ROOMS_MAP = {
  "game-name-1" : {
    "room-name-1" : [socket, socket],
    "room-name-2" : [socket, socket],
    "room-name-3" : [socket, socket],
  },
  "game-name-2" : {
    "room-name-4" : [socket, socket],
    "room-name-5" : [socket, socket],
  },
}
STANDBY_MAP = {
  "game-name-1" : {
    "socketId-1" : socket,
    "socketId-2" : socket,
  },
  "game-name-2" : {
    "socketId-1" : socket,
    "socketId-2" : socket,
  }
}
*/

/**
 * roomName이 있는지 check
  - 최초 webRTC 접속 후 새로고침 했을 경우
  - parsedData.gameName, parsedData.roomName 있음
  - 새로고침 후 재접속이므로 socket.roomName은 없음
 * @typedef {Object} data
 * @property {string} parsedData client에서 보내준 gameName, roomName
 * @property {string} socket 새로고침 후 새로 생성된 socket
 * @returns
 */
async function roomsMapInit(data) {
  return new Promise((resolve, reject) => {
    const { parsedData, socket } = data;

    // 처음 새로고침 한 peer가 roomName을 조작해서 reject 난 후,
    // 바로 상대 peer가 새로고침 하면 ROOMS_MAP에 parsedData.roomName 없음
    // 처음 새로고침 한 peer가 roomName을 조작해서 reject 난 직후 상대 peer에게 경고 팝업 띄어야 함
    // if (parsedData.gameName && parsedData.roomName) {
    //   if (ROOMS_MAP[parsedData.gameName].get(parsedData.roomName)) {
    //     // 새로고침 한 peer가 roomName 조작 안함
    //   } else {
    //     // 새로고침 한 peer가 roomName 조작함
    //     reject({ type: 'foul' });
    //   }
    // }

    if (parsedData.roomName) {
      socket.roomName = parsedData.roomName;
      if (parsedData.gameName) {
        socket.gameName = parsedData.gameName;
        if (ROOMS_MAP[socket.gameName]) {
          if (ROOMS_MAP[socket.gameName].get(socket.roomName)) {
            ROOMS_MAP[socket.gameName].get(socket.roomName).push(socket);
          } else {
            ROOMS_MAP[socket.gameName].set(socket.roomName, [socket]);
          }
        } else {
          ROOMS_MAP[socket.gameName] = new Map();
          ROOMS_MAP[socket.gameName].set(socket.roomName, [socket]);
        }
      }
    }

    resolve();
  });
}

// 처음 입장
async function firstEntry(socket) {
  return new Promise(async (resolve, reject) => {

    // standby 상태 user 찾기
    const STANDBY_USER_LIST = [...STANDBY_MAP[socket.gameName]];
    if (STANDBY_USER_LIST.length > 0) {
      const diffSocketId = STANDBY_MAP[socket.gameName].keys().next().value; // 첫 번째 키
      const diffSocket = STANDBY_MAP[socket.gameName].values().next().value; // 첫 번째 값
      if (diffSocket) {
        STANDBY_MAP[socket.gameName].delete(diffSocketId);

        const NEW_ROOM_NAME = uuidv4();

        ROOMS_MAP[socket.gameName].set(NEW_ROOM_NAME, [socket, diffSocket]);
        socket.roomName = NEW_ROOM_NAME;
        diffSocket.roomName = socket.roomName;

        // REDIS_PUB.publish('roomChannel', JSON.stringify({ roomName: socket.roomName }));

        if (diffSocket && diffSocket.readyState === WebSocket.OPEN) {
          if (socket && socket.readyState === WebSocket.OPEN) {
            const params = {
              type: 'entryOrder',
              roomName: socket.roomName,
            };

            socket.send(
              JSON.stringify({
                ...params,
                pid: cryptPID,
                setOffer: 'true',
              }),
            );
            diffSocket.send(
              JSON.stringify({...params}),
            );
          } else {
            // 내 socket이 없음 : network 장애
            socket.send(JSON.stringify({ type: 'networkError' }));
          }
        } else {
          // 대기하고 있던 user 나감
          // 나는 대기 중 상태로 변경
          STANDBY_MAP[socket.gameName].set(socket.__customSocketId, socket);
        }
      } else {
        // 대기하고 있던 user 나감
        // 나는 대기 중 상태로 변경
        STANDBY_MAP[socket.gameName].set(socket.__customSocketId, socket);
      }
    } else {
      // 내 gameName에 standby 상태인 user 없음
      STANDBY_MAP[socket.gameName].set(socket.__customSocketId, socket);
    }

    resolve();
  });
}

async function watiRefreshUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

// 게임 중 새로고침
async function refreshDuringGame(data) {
  return new Promise(async (resolve, reject) => {
    const { socket, roomName } = data;

    if (ROOMS_MAP[socket.gameName] && ROOMS_MAP[socket.gameName].get(roomName)) {
      if (ROOMS_MAP[socket.gameName].get(roomName) && ROOMS_MAP[socket.gameName].get(roomName).length !== 2) {
        await watiRefreshUser();
      }
      if (ROOMS_MAP[socket.gameName].get(roomName) && ROOMS_MAP[socket.gameName].get(roomName).length === 2) {
        const DIFF_SOCKET = ROOMS_MAP[socket.gameName].get(roomName).find((ws) => ws !== socket);
        if (DIFF_SOCKET) {
          const params = {
            type: 'entryOrder',
            roomName: socket.roomName,
            refresh: true,
          };

          // 새로고침 한 peer
          socket.send(
            JSON.stringify({...params}),
          );
          // 새로고침 당한 peer
          DIFF_SOCKET.send(
            JSON.stringify({
              ...params,
              setOffer: 'true',
            }),
          );
        } else {
          socket.send(JSON.stringify({ type: 'otherLeaves', msg: 'r1' }));
        }
      } else {
        // 2) 게임 중 한 명이 나간 상태에서 나머지 한 명이 새로고침
        // 3) 양쪽이 동시에 새로고침
        socket.send(JSON.stringify({ type: 'otherLeaves', msg: 'r2' }));
      }
    } else {
      socket.send(JSON.stringify({ type: 'otherLeaves', msg: 'r3' }));
    }

    resolve();
  });
}

async function handleEntryOrder(data) {
  return new Promise(async (resolve, reject) => {
    const { socket, gameName, roomName } = data;

    socket.gameName = gameName;

    if (!ROOMS_MAP[socket.gameName]) ROOMS_MAP[socket.gameName] = new Map(); // gameName 에 따라 Map 생성
    if (!STANDBY_MAP[socket.gameName]) STANDBY_MAP[socket.gameName] = new Map(); // gameName 에 따라 standby 상태만 Map 생성

    if (roomName) {
      // 게임 중 새로고침
      await refreshDuringGame({ socket, roomName }).catch(() => {
        socket.send(JSON.stringify({ type: 'otherLeaves', msg: 'r4' }));
      });
    } else {
      // 처음 입장
      await firstEntry(socket);
    }
    resolve();
  });
}

async function offerAnserCandidateDataProcess(resData) {
  return new Promise(async (resolve, reject) => {
    const { parsedData, socket } = resData;

    if (parsedData.type === 'offer') {
      parsedData.roomName = socket.roomName;
      parsedData.pid = cryptPID;
    };

    if (parsedData && socket) {
      if (socket.gameName && socket.roomName && ROOMS_MAP[socket.gameName] && ROOMS_MAP[socket.gameName].get(socket.roomName) && ROOMS_MAP[socket.gameName].get(socket.roomName).length === 2) {
        const DIFF_SOCKET = ROOMS_MAP[socket.gameName].get(socket.roomName).find((ws) => ws !== socket);
        if (DIFF_SOCKET && DIFF_SOCKET.readyState === WebSocket.OPEN) {
          DIFF_SOCKET.send(
            /* JSON.stringify({
              type: parsedData.type,
              data: parsedData.data,
            }), */
            JSON.stringify(parsedData),
          );
          resolve();
        } else {
          reject();
        }
      } else {
        reject();
      }
    } else {
      reject();
    }
  });
}

// 연결된 클라이언트 처리
WSS.on('connection', async (socket) => {
  const connectionPromise = new Promise((resolve) => {
    resolve(socket);
  });

  connectionPromise.then((socket) => {
    socket.on('message', (data) => {
      const messagePromise = new Promise((resolve, reject) => {
        try {
          const parsedData = JSON.parse(data); // 메시지 파싱
          resolve(parsedData);
        } catch (error) {
          reject(error);
        }
      });

      messagePromise
        .then(async (parsedData) => {
          await roomsMapInit({ parsedData, socket });

          /**
           * 최초 진입 - insertStorageWs
           */
          if (parsedData.type === 'requestStorage') {
            // 각 게임에 필요한 암호화된 sessionStorage 생성
            const STORAGE_DATA = await MAKE_STORAGE.findGame(parsedData.gameName);

            if (Object.keys(STORAGE_DATA).length === 0) {
              console.log('사용자가 최초 진입 시 battleTwo에 없는 gameName을 보냄');
              socket.send(JSON.stringify({ type: 'requestStorageError' }));
            } else {
              socket.send(
                JSON.stringify({
                  type: 'responseStorage',
                  ...STORAGE_DATA,
                }),
              );
            }
          }

          /**
           * webRTC connect - rtcPeer > webRTC
           */
          if (parsedData.type === 'entryOrder') {
            // 두 peer가 webRTC 연결 시 socket에 고유한 id 주입
            if (!socket.__customSocketId) {
              const socketId = uuidv4();
              socket.__customSocketId = socketId;
              // REDIS.set(`SOCKET_TO_WORKER:${socketId}`, process.pid);
              // console.log(`[Worker ${process.pid}] socketId ${socketId} 등록 완료`);
            };

            await handleEntryOrder({
              socket,
              gameName: parsedData.gameName,
              roomName: parsedData.roomName,
            });
          }

          // if (parsedData.type === 'offer' || parsedData.type === 'answer' || parsedData.type === 'candidate') {
          if (['offer', 'answer', 'candidate'].includes(parsedData.type)) {
            await offerAnserCandidateDataProcess({ parsedData, socket }).catch(() => {
              socket.send(JSON.stringify({ type: 'otherLeaves', msg: '2' }));
            });
          };

          /* if (parsedData.type === 'connectEnd') {
            console.log('webRTC 연결 완료, socket 삭제');
            socket = null;
          }; */
        })
        .catch((err) => {
          if (err.type === 'foul') {
            socket.send(JSON.stringify({ type: 'foul', msg: '새로고침 한 peer가 sessstorage roomName key 조작' }));
          }
          if (err.type === 'otherLeaves') {
            socket.send(JSON.stringify({ type: 'otherLeaves', msg: err }));
          }
        });
    });
  });

  // 클라이언트 연결 종료 시
  socket.on('close', () => {
    const closePromise = new Promise((resolve) => {
      resolve(socket);
    });
    closePromise.then(async (socket) => {
      const roomsMapState =
        socket.gameName &&
        socket.roomName &&
        ROOMS_MAP[socket.gameName] &&
        ROOMS_MAP[socket.gameName].get(socket.roomName);

      if (roomsMapState) {
        const room = ROOMS_MAP[socket.gameName].get(socket.roomName);
        const index = room.indexOf(socket);

        // 한명이 새로고침 or 뒤로가기 : index: 1
        // 두명 모두 나감 : index: 0
        if (index !== -1) {
          room.splice(index, 1); // socket을 배열에서 삭제
        }
        if (ROOMS_MAP[socket.gameName].get(socket.roomName).length === 0) {
          ROOMS_MAP[socket.gameName].delete(socket.roomName);
        }
      }

      const standbyMapState =
        socket.gameName &&
        socket.__customSocketId &&
        STANDBY_MAP[socket.gameName] &&
        STANDBY_MAP[socket.gameName].get(socket.__customSocketId);

      if (standbyMapState) {
        STANDBY_MAP[socket.gameName].delete(socket.__customSocketId);
      }

      // console.log('ROOMS_MAP', JSON.stringify(ROOMS_MAP, null, 2));
      // console.log('STANDBY_MAP : ', JSON.stringify(STANDBY_MAP, null, 2));
    });
  });
});

console.log(`WebRTC server ${process.pid} running on port ${PORT}`);

// REDIS PUBLIC
/* REDIS_SUB.subscribe(CHANNEL_NAME, (err, count) => {
  if (err) {
    console.error(`Redis subscribe 실패: ${err.message}`);
  } else {
    console.log(`[Worker ${process.pid}] 채널 구독 시작: ${CHANNEL_NAME}`);
  }
}); */

/* REDIS_SUB.on('message', (channel, message) => {
  const data = JSON.parse(message);
  if (channel === CHANNEL_NAME) {
    // 자신에게 온 메시지만 처리
    console.log(`[Worker ${process.pid}] 메시지 수신:`, data);
    if (data.action === 'jwtGameRoom') {
      const { gameName, roomName } = data;
    };
  };
}); */
