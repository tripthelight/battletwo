import '@/client/assets/scss/game/indianPocker/common';
import '@/client/js/common/common';

import reload from '@/client/js/module/reload';
import { errorManagement } from '@/client/js/module/errorManagement';
import rtcPeer from '@/client/js/webRTC/rtcPeer';
import indianPockerGameState from '@/client/js/gameState/indianPocker';
import makeCard from '@/client/js/views/game/indianPocker/fns/common/makeCard/makeCard';
import findCharCode from '@/client/js/functions/findCharCode';

import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import getCookies from '@/client/js/module/cookies/getCookies';
import logout from '@/client/js/auth/logout';
import { request } from '@/client/js/network/indianPocker/request';

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

    if (reload) {
      const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
      const decryptVal = window.sessionStorage.getItem(encryptKey);

      switch (decryptVal) {
        // case 'choiceCard':
        case findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]):
          indianPockerGameState.choiceCard();
          break;
        default:
          throw { errCase: 'errorComn', message: '새로고침 했는데 gameState가 없음' };
      };
    } else {
      // choiceCard
      indianPockerGameState.choiceCard();
    };

    // console.log('playerFirstNumber :::: ', findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]));
    // console.log('enemyFirstNumber ::::: ', findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]));

  } catch (error) {
    console.log('error indianPocker.js >>>>>>>>>>>> ', error);

    request('opponentFouls', { message: error && error.sendMsg ? error.sendMsg : 'remote player error' });
    errorManagement(error);
  }
};
