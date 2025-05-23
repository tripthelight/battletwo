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
import encryptionStore from '@/client/store/encryptionStore';

// onMounted
document.onreadystatechange = async () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    try {
      console.log('indianPocker init');

      // 먼저 webSocket에서 암호화된 sessionStorige를 받고,
      await insertStorageWs();

      // 카드 우선 생성
      makeCard();

      // gameName을 sessionStorage에 저장
      const GAME_NAME = window.sessionStorage.getItem('gameName');
      if (!GAME_NAME || GAME_NAME !== 'indianPocker') {
        storageMethod('s', 'SET_ITEM', 'gameName', 'indianPocker');
      }

      // webRTC 공통
      await rtcPeer('indianPocker');

      const storeState = encryptionStore.getState().encryptionState.compair;
      console.log('KEYS : ', Object.keys(storeState));

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
