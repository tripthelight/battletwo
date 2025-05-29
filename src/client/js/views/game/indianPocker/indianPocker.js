import '@/client/assets/scss/game/indianPocker/common';
import '@/client/js/common/common';
import { debug } from '@/client/js/module/debug';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import reload from '@/client/js/module/reload';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorManagement';
import insertStorageWs from '@/client/js/functions/insertStorageWs';
import rtcPeer from '@/client/js/webRTC/rtcPeer';
import indianPockerGameState from '@/client/js/gameState/indianPocker';
import makeCard from '@/client/js/views/game/indianPocker/fns/common/makeCard/makeCard';
import findCharCode from '@/client/js/functions/findCharCode';
import { BCRYPT_STORAGE } from '@/client/js/module/bcryptStorage';
import generateSecretKey from '@/client/js/views/game/indianPocker/fns/common/generateSecretKey';

// onMounted
document.onreadystatechange = async () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    try {
      console.log('indianPocker init ', reload);

      // 먼저 webSocket에서 암호화된 sessionStorige를 받고,
      await insertStorageWs();

      // await BCRYPT_STORAGE.bcryptCardTest();

      // gameName을 sessionStorage에 저장
      const encryptKey = findCharCode([66, 86, 68, 73, 69, 65, 73, 66, 75, 69]);
      const encryptVal = findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]);

      const decryptVal = window.sessionStorage.getItem(encryptKey);
      if (decryptVal === null || (decryptVal !== null && decryptVal !== encryptVal)) {
        // sessionStorage gameName이 없음
        storageMethod('s', 'SET_ITEM', encryptKey, encryptVal);
      }

      /*
      const GAME_NAME = window.sessionStorage.getItem('gameName');
      if (!GAME_NAME || GAME_NAME !== 'indianPocker') {
        storageMethod('s', 'SET_ITEM', 'gameName', 'indianPocker');
      }
      */

      // webRTC 공통
      await rtcPeer('indianPocker');

      // 상대 peer의 secret key 생성
      await generateSecretKey();

      // 두 Peer가 연결 된 후 카드 우선 생성
      makeCard();

      if (reload) {
        const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]);
        const decryptVal = window.sessionStorage.getItem(encryptKey);

        // 새로 고침 후 재연결인 경우
        // switch (window.sessionStorage.getItem('gameState')) {
        switch (decryptVal) {
          // case 'waitEnemy':
          case findCharCode([74, 75, 71, 90, 87, 79, 85, 69, 65, 88]):
            // choiceCard
            indianPockerGameState.choiceCard();
            break;
          // case 'choiceCard':
          case findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]):
            console.log('새로고침 타냐 ????????????????? ');

            indianPockerGameState.choiceCard();
            break;
          // case 'basicBet':
          case findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]):
            indianPockerGameState.basicBet();
            break;
          // case 'playing':
          case findCharCode([84, 88, 86, 66, 78, 73, 82, 81, 87, 71]):
            // playing 중 새로고침 한 사용자
            storageMethod('s', 'SET_ITEM', 'playingReloadUser', true);
            const FOLD_STATE = window.sessionStorage.foldState;
            if (FOLD_STATE) {
              // 이전 판에서 FOLD animation 실행중 일 때 새로고침 한 경우
              if (FOLD_STATE === 'true') {
                // FOLD를 실행한 PLAYER
                const FOLD_USER = window.sessionStorage.foldUser;

                if (FOLD_USER) {
                  if (FOLD_USER === 'true') {
                    // FOLD를 실행한 PLAY가 새고로침
                    indianPockerGameState.basicBet('foldLocal');
                  } else if (FOLD_USER === 'false') {
                    // FOLD를 받은 PLAY가 새고로침
                    indianPockerGameState.basicBet('foldRemote');
                  }
                }
              }
            } else {
              indianPockerGameState.playing();
            }
            break;
          // case 'gameOver':
          case findCharCode([65, 70, 79, 73, 76, 85, 88, 87, 86, 75]):
            indianPockerGameState.gameOver();
            break;
          default:
            return errorManagement({ errCase: 'errorComn', message: '새로고침 했는데 gameState가 없음' });
        }
      } else {
        // choiceCard
        indianPockerGameState.choiceCard();
      }
    } catch (error) {
      errorManagement(error);
    }
  }
};
