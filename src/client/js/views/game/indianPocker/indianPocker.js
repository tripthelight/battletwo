import '@/client/assets/scss/game/indianPocker/common';
import '@/client/js/common/common';
import { debug } from '@/client/js/module/debug';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import rtcPeer from '@/client/js/webRTC/rtcPeer';
import reload from '@/client/js/module/reload';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorManagement';
import indianPockerGameState from '@/client/js/gameState/indianPocker';
import makeCard from '@/client/js/views/game/indianPocker/fns/common/makeCard/makeCard';

import { BCRYPY_STORAGE } from '@/client/js/module/bcryptStorage';

// onMounted
document.onreadystatechange = async () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    try {
      console.log('indianPocker init');
      console.log('reload >>> ', reload);
      // window.rtcChannels = {};

      // 카드 우선 생성
      makeCard();

      // gameName을 sessionStorage에 저장
      const encryptKey = await BCRYPY_STORAGE.encryption(process.env.KEY_GAME_NAME);
      const encryptValue = await BCRYPY_STORAGE.encryption('indianPocker');
      storageMethod('s', 'SET_ITEM', encryptKey, encryptValue);

      const decryptKey = await BCRYPY_STORAGE.decryptionKey(process.env.KEY_GAME_NAME);
      console.log('decryptKey ::::', decryptKey); // $2b$04$anhNEuSKAguuX8vLFJZtqeVALIdVC1YfYCcpYMNCPooGuNxxzjgWm
      const encryptedValue = sessionStorage.getItem(decryptKey);
      console.log('encryptedValue ::::', encryptedValue); // $2b$04$xRUvPrCPLYOSJUCKRNsTMu6Y39tJxfogEBm.zUBQ2iA4TXEybyte.

      const decryptValue = await BCRYPY_STORAGE.decryptionVal(encryptedValue, 'GN');
      console.log('decryptValue :::::: ', decryptValue); // indianPocker

      const GAME_NAME = window.sessionStorage.getItem('gameName');
      if (!GAME_NAME || GAME_NAME !== 'indianPocker') {
        storageMethod('s', 'SET_ITEM', 'gameName', 'indianPocker');
      }

      // webRTC 공통
      await rtcPeer('indianPocker');

      if (reload) {
        // 새로 고침 후 재연결인 경우
        switch (window.sessionStorage.getItem('gameState')) {
          case 'waitEnemy':
            // choiceCard
            indianPockerGameState.choiceCard();
            break;
          case 'choiceCard':
            indianPockerGameState.choiceCard();
            break;
          case 'basicBet':
            indianPockerGameState.basicBet();
            break;
          case 'playing':
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
          case 'gameOver':
            indianPockerGameState.gameOver();
            break;
          default:
            break;
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
