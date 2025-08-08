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
import setCookies from '@/client/js/module/cookies/setCookies';
import getCookies from '@/client/js/module/cookies/getCookies';
import delCookies from '@/client/js/module/cookies/delCookies';
import waitPeer from '@/client/js/functions/waitPeer';
import findNickname from '@/client/js/functions/findNickname';
// import setCookies from '@/client/js/module/cookies/setCookies';
import login from '@/client/js/auth/login';
import logout from '@/client/js/auth/logout';

// onMounted
document.onreadystatechange = async () => {
  if (document.readyState !== 'complete') return;
  try {
    const GAME_NAME = 'indianPocker';

    // 새로고침 트리거
    if (reload) {
      // 아직 연결 안되어 대기중에 새로고침하면 여기를 탐
      // 이전에 두 Peer가 연결되었다가 새로고침한 peer는 여기를 탐
      // 게임 중, sessionStorage를 모두 지우고, cookie도 지우고 새로고침 하면 처음부터 새로운 Peer와 재연결 - 게임 나감 처리로 간주
      const refreshFailed = {
        // cookie: window.sessionStorage.length > 0 && ['gc_at'].some(name => !getCookies({ cookieName: name })),
        // storage: window.sessionStorage.length === 0 && ['gc_at'].some(name => getCookies({ cookieName: name }))
        cookie: window.sessionStorage.length > 0 && !getCookies({ cookieName: 'gc_at' }),
        storage: window.sessionStorage.length === 0 && getCookies({ cookieName: 'gc_at' })
      };
      if (refreshFailed.cookie || refreshFailed.storage) {
        throw { errCase: 'cookies', message: 'cookies failed' };
      };
    } else {
      await logout();
    };

    // 아예 처음 진입했거나,
    // 새로고침 했는데,
    // window.sessionStorage.length가 0보다 크고,
    // gc_at 쿠키가 있으면 이 단계로 진입

    LOADING_EVENT.show();

    await rtcPeer(GAME_NAME);

    // webRTC 연결 후,
    // gameState가 있으면 이 단계로 진입

    await makeCard();


  } catch (error) {
    console.log('error indianPocker.js >>>>>>>>>>>> ', error);
    errorManagement(error);
  }
};

// 디바운스로 새로고침 방지
/*
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
};

const handleRefresh = () => {
  console.log('마지막 새로고침만 실행');
};

window.addEventListener('beforeunload', debounce(handleRefresh, 500));
*/

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
