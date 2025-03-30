import '@/client/assets/scss/game/taptap/common';
import '@/client/js/common/common';
import rtcPeer from '@/client/js/webRTC/rtcPeer';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorManagement';
import taptapGameState from '@/client/js/gameState/taptap';
import cowndown from '@/client/js/views/game/taptap/cowndown';
import countStyle from '@/client/js/views/game/taptap/countStyle';
import screenClickEvent from '@/client/js/views/game/taptap/screenClickEvent';
import { request } from '@/client/js/communication/taptap/request';
import { response } from '@/client/js/communication/taptap/response';
import reload from '@/client/js/module/reload';
import commErr from '@/client/js/communication/commErr';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';

// onMounted
document.onreadystatechange = async () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    try {
      console.log('taptap init');

      // gameName을 sessionStorage에 저장
      storageMethod('s', 'SET_ITEM', 'gameName', 'taptap');

      // webRTC 공통
      await rtcPeer('taptap');

      // peerConnection/dataChannel error 감시
      commErr();

      if (reload) {
        // 새로 고침 후 재연결인 경우
        switch (window.sessionStorage.getItem('gameState')) {
          case 'waitEnemy':
            // 이 단게에서 waitEnemy는 있을 수 없음
            break;
          case 'count':
            LOADING_EVENT.show();
            break;
          case 'playing':
            screenClickEvent.tap();
            break;
          case 'gameOver':
            // 결과 화면 다시 그려야 됨
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
