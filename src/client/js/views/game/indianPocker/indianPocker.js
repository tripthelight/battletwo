import '@/client/assets/scss/game/indianPocker/common';
import '@/client/js/common/common';

import reload from '@/client/js/module/reload';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorManagement';
import insertStorageWs from '@/client/js/functions/insertStorageWs';
import rtcPeer from '@/client/js/webRTC/rtcPeer';
import indianPockerGameState from '@/client/js/gameState/indianPocker';
import makeCard from '@/client/js/views/game/indianPocker/fns/common/makeCard/makeCard';
import findCharCode from '@/client/js/functions/findCharCode';
import generateSecretKey from '@/client/js/views/game/indianPocker/fns/common/generateSecretKey';

import insertStorageDate from '@/client/js/functions/insertStorageDate';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import initNickName from '@/client/js/functions/initNickName';
import storageKeys from '@/client/js/functions/dataVerification/storageKeys';
import getCookies from '@/client/js/module/cookies/getCookies';
import waitPeer from '@/client/js/functions/waitPeer';
import findNickname from '@/client/js/functions/findNickname';

function initOnopen() {
  try {
    // sessionStorage gameName key 찾기
    const encryptKey1 = findCharCode([66, 86, 68, 73, 69, 65, 73, 66, 75, 69]);
    const encryptKey2 = findCharCode([74, 86, 88, 78, 80, 70, 85, 72, 87, 68]);
    signalingSocket.send(
      JSON.stringify({
        type: 'entryOrder',
        // gameName: sessionStorage.getItem('gameName'),
        gameName: sessionStorage.getItem(encryptKey1),
        // roomName: sessionStorage.getItem('roomName') ?? null,
        roomName: sessionStorage.getItem(encryptKey2) ?? null,
      }),
    );
  } catch (error) {
    // otherLeavesComn();
    // reject({ component: 'signalingSocket', event: 'send', message: 'Failed to send message', errorDetails: error });
  }
}

async function checkCookieAfter(gameEncryptKey, gameName) {
  const keyGameName = findCharCode([66, 86, 68, 73, 69, 65, 73, 66, 75, 69]); // gameName
  const encryptGameName = findCharCode(gameEncryptKey);
  const valGameName = window.sessionStorage.getItem(keyGameName);
  if (valGameName === null || (valGameName !== null && valGameName !== encryptGameName)) {
    // sessionStorage gameName이 없음
    storageMethod('s', 'SET_ITEM', keyGameName, encryptGameName);
  }

  const keyGameState = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
  const keyWaitEmeny = findCharCode([74, 75, 71, 90, 87, 79, 85, 69, 65, 88]); // waitEnemy
  const valGameState = window.sessionStorage.getItem(keyGameState);
  if (valGameState === null) {
    storageMethod('s', 'SET_ITEM', keyGameState, keyWaitEmeny);
  } else {
    const encryptKeys = storageKeys({
      p1: findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]), // indianPocker,
      p2: findCharCode([88, 66, 65, 72, 90, 68, 86, 75, 85, 73]), // gameStateAllKeys
    });

    if (encryptKeys.includes(valGameState)) {
      // 모든 gameState key 가 정상적으로 있음
    } else {
      throw new Error({ errCase: 'errorComn', message: 'gameState value error' });
    }
  }
}

// onMounted
document.onreadystatechange = async () => {
  if (document.readyState !== 'complete') return;
  try {
    LOADING_EVENT.show();

    await initNickName();

    const GAME_NAME = 'indianPocker';
    console.log(`${GAME_NAME} init : `, reload);
    const GAME_ENCRYPT_KEY = [68, 74, 69, 77, 70, 75, 76, 86, 68, 69]; // indianPocker

    /**
     * ***************************************************************************************
     * STEP 1 : signalingServer 연결
     */
    // S : 모든 게임 공통 영역 (코드 동일) ======================================================
    const signalingServer = new WebSocket(`${process.env.SOCKET_HOST}:${process.env.RTC_PORT}`);

    // signalingServer.onopen : 비동기 콜백 - try catch 에러가 상위로 전파되지 않음
    signalingServer.onopen = async () => {
      try {
        // SUB STEP 1 - 서버로 부터 secret key 받은 후 cookies에 등록
        if (reload) {
          // 최소 1번 이상 브라우저 새로고침
          const keypair = getCookies({ cookieName: 'gc:kp', cookieKey: 'kp' });
          if (keypair) {
            checkCookieAfter(GAME_ENCRYPT_KEY, GAME_NAME);

            // NEXT STEP ---------------------------------------------------------
            const keyGameState = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
            const keyWaitEmeny = findCharCode([74, 75, 71, 90, 87, 79, 85, 69, 65, 88]); // waitEnemy
            const valGameState = window.sessionStorage.getItem(keyGameState);
            if (valGameState === keyWaitEmeny) {
              waitPeer(1, findNickname('localPlayer'));
            }
          } else {
            // 사용자가 악의적으로 cookie 삭제
            signalingServer.close(1000, 'dataManipulation');
            throw new Error(JSON.stringify({ errCase: 'dataManipulation', target: 'local', message: 'cookie not found' }));
          }
        } else {
          // 최초 입장
          signalingServer.send(
            JSON.stringify({
              type: 'requestStorage',
              gameName: GAME_NAME,
            }),
          );
        }
      } catch (error) {
        errorManagement(JSON.parse(error.message));
      }
    };

    // signalingServer.onmessage : 비동기 콜백 - try catch 에러가 상위로 전파되지 않음
    signalingServer.onmessage = async (message) => {
      try {
        const msgData = JSON.parse(message.data);
        // SUB STEP 1 - 서버로 부터 secret key 받은 후 cookies에 등록
        if (msgData.type === 'responseStorage') {
          await insertStorageDate(msgData);
          checkCookieAfter(GAME_ENCRYPT_KEY, GAME_NAME);

          // NEXT STEP ---------------------------------------------------------
          const keyGameState = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
          const keyWaitEmeny = findCharCode([74, 75, 71, 90, 87, 79, 85, 69, 65, 88]); // waitEnemy
          const valGameState = window.sessionStorage.getItem(keyGameState);
          if (valGameState === keyWaitEmeny) {
            waitPeer(1, findNickname('localPlayer'));
          }
        }
      } catch (error) {
        errorManagement(error);
      }
    };
    // E : 모든 게임 공통 영역 (코드 동일) ======================================================

    signalingServer.onclose = async (event) => {
      try {
        console.log('signalingServer close : ', event);
        if (event.code === 1006) {
          // 사용자의 행동과 무관하게 서버가 닫힘
          throw new Error(JSON.stringify({ errCase: 'server', target: 'server', message: '서버에 문제가 생겨서 닫힘' }));
        } else if (event.code === 1000) {
          if (event.reason === 'dataManipulation') {
            // 사용자가 data를 조작
          }
        }
      } catch (error) {
        errorManagement(JSON.parse(error.message));
      }
    };
    signalingServer.onerror = async (event) => {
      console.log('signalingServer error : ', event);
    };

    /**
     * ***************************************************************************************
     * STEP 2 : 게임 로직 실행 단계
     */
  } catch (error) {
    errorManagement(error);
  }
};
