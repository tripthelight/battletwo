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
// import setCookies from '@/client/js/module/cookies/setCookies';
import login from '@/client/js/auth/login';
import logout from '@/client/js/auth/logout';

// onMounted
document.onreadystatechange = async () => {
  if (document.readyState !== 'complete') return;
  try {
    // 새로고침 트리거
    if (reload) {
      console.log('COOKIE ________ ', document.cookie);
      // 아직 연결 안되어 대기중에 새로고침하면 여리를 탐
      // 이전에 두 Peer가 연결되었다가 새로고침한 peer는 여기를 탐
      if (['gc_at', 'gc_kp'].some(name => !getCookies({ cookieName: name }))) {
        throw { errCase: 'cookies', message: 'cookies failed' };
      };
    } else {
      await logout();
    };

    LOADING_EVENT.show();

    const GAME_NAME = 'indianPocker';

    await rtcPeer(GAME_NAME);

  } catch (error) {
    console.log('error indianPocker.js >>>>>>>>>>>> ', error);
    errorManagement(error);
  }
};

// 페이지가 언로드되기 직전!
/* window.addEventListener('pagehide', () => {
  if (
    window.rtcChannels &&
    window.rtcChannels.dataChannel &&
    window.rtcChannels.peerConnection
  ) {
    const peerConnection = window.rtcChannels.peerConnection;
    peerConnection.close();
    // 기존 연결 되어 있는 상태에서 새로고침
    storageMethod('s', 'SET_ITEM', 'reload', true);
  };
}); */
