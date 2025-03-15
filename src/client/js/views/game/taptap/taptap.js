import '@/client/assets/scss/game/taptap/common';
import '@/client/js/common/common';
import addNickname from '@/client/js/functions/addNickname';
import webRTC from '@/client/js/webRTC/rtcConn';
import { errorManagement } from '@/client/js/module/errorManagement';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import initNickName from '@/client/js/functions/initNickName';
import waitPeer from '@/client/js/functions/waitPeer';
import findNickname from '@/client/js/functions/findNickname';
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

      LOADING_EVENT.show();

      /**
       * 게임화면에 직접 진입 했는데,
       * localStorage에 localPlayer 가 없을 경우,
       * localPlayer를 만들 때 까지 대기 후 webRTC 연결
       */
      await initNickName();

      // STEP1) waitEnemy
      taptapGameState.waitEnemy();
      waitPeer(1, findNickname('localPlayer'));
      const { onDataChannel, dataChannel } = await webRTC('taptap');
      // onDataChannel, dataChannel을 전역으로 저장
      window.rtcChannels = {
        onDataChannel,
        dataChannel,
      };
      response();
      waitPeer(2);

      // STEP2) count
      taptapGameState.count();
      await cowndown.show(countStyle);

      // STEP3) playing
      taptapGameState.playing();
      screenClickEvent.tap();
    } catch (error) {
      errorManagement(error);
    }
  }
};
