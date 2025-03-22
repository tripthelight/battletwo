import '@/client/assets/scss/game/taptap/common';
import '@/client/js/common/common';
import rtcPeer from '@/client/js/webRTC/rtcPeer';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorManagement';
import taptapGameState from '@/client/js/gameState/taptap';
import cowndown from '@/client/js/views/game/taptap/cowndown';
import countStyle from '@/client/js/views/game/taptap/countStyle';
import screenClickEvent from '@/client/js/views/game/taptap/screenClickEvent';
import { response } from '@/client/js/communication/taptap/response';

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

      // taptap dataChannel message 전송
      response();

      // count
      taptapGameState.count();
      await cowndown.show(countStyle);

      // playing
      taptapGameState.playing();
      screenClickEvent.tap();
    } catch (error) {
      errorManagement(error);
    }
  }
};
