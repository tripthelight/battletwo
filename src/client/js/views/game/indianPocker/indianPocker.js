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

// onMounted
document.onreadystatechange = async () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    try {
      LOADING_EVENT.show();

      await initNickName();

      const GAME_NAME = 'indianPocker';
      console.log(`${GAME_NAME} init`);
      const GAME_ARR = [68, 74, 69, 77, 70, 75, 76, 86, 68, 69]; // indianPocker

      // S : 모든 게임 공통 영역 (코드 동일) ======================================================
      const signalingSocket = new WebSocket(`${process.env.SOCKET_HOST}:${process.env.RTC_PORT}`);

      signalingSocket.onopen = () => {
        // STEP 1 - 서버에 암호화된 sessiongStorage 요청
        if (!document.cookie) {
          signalingSocket.send(
            JSON.stringify({
              type: 'requestStorage',
              gameName: GAME_NAME,
            }),
          );
        }
      };

      signalingSocket.onmessage = async (message) => {
        const msgData = JSON.parse(message.data);

        // STEP 1 - 서버에서 암호화된 sessiongStorage 받음
        if (msgData.type === 'responseStorage') {
          await insertStorageDate(msgData);

          const keyGameName = findCharCode([66, 86, 68, 73, 69, 65, 73, 66, 75, 69]); // gameName
          const encryptGameName = findCharCode(GAME_ARR);
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
      };
      // E : 모든 게임 공통 영역 (코드 동일) ======================================================
    } catch (error) {
      errorManagement(error);
    }
  }
};
