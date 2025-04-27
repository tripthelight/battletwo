// import scss
import '@/client/assets/scss/game/taptap/common';
// import common js
import '@/client/js/common/common';
import rtcPeer from '@/client/js/webRTC/rtcPeer';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorManagement';
import taptapGameState from '@/client/js/gameState/taptap';
import cowndown from '@/client/js/views/game/taptap/cowndown';
import countStyle from '@/client/js/views/game/taptap/countStyle';
import screenClickEvent from '@/client/js/views/game/taptap/screenClickEvent';
import { request } from '@/client/js/communication/taptap/request';
import reload from '@/client/js/module/reload';
import commErr from '@/client/js/communication/commErr';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { text } from '@/client/js/functions/language';
import reDrawPlaying from '@/client/js/views/game/taptap/reDraw/playing';
import reDrawGameResult from '@/client/js/views/game/taptap/reDraw/gameResult';

// onMounted
document.onreadystatechange = async () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    try {
      console.log('taptap init');
      console.log('reload >>> ', reload);

      // gameName을 sessionStorage에 저장
      const GAME_NAME = window.sessionStorage.getItem('gameName');
      if (!GAME_NAME || GAME_NAME !== 'taptap') {
        storageMethod('s', 'SET_ITEM', 'gameName', 'taptap');
      }

      // webRTC 공통
      await rtcPeer('taptap');

      // peerConnection/dataChannel error 감시
      // commErr();

      if (reload) {
        // 새로 고침 후 재연결인 경우
        switch (window.sessionStorage.getItem('gameState')) {
          case 'waitEnemy':
            // count
            taptapGameState.count();
            await cowndown.show(countStyle);

            // playing
            taptapGameState.playing();
            screenClickEvent.tap();
            break;
          case 'count':
            LOADING_EVENT.show(text.penalty);
            // 카운트 중 내가 새로고침 하면 나는 'waitCount'
            storageMethod('s', 'SET_ITEM', 'waitCount', 'true');
            request('waitCount', true);
            break;
          case 'playing':
            LOADING_EVENT.hide();
            reDrawPlaying();
            screenClickEvent.tap();
            break;
          case 'gameOver':
            LOADING_EVENT.hide();
            reDrawPlaying();
            // 결과 화면 다시 그려야 됨
            reDrawGameResult();
            break;
          default:
            break;
        }
      } else {
        // count
        taptapGameState.count();
        await cowndown.show(countStyle);

        // playing
        taptapGameState.playing();
        screenClickEvent.tap();
      }
    } catch (error) {
      errorManagement(error);
    }
  }
};
