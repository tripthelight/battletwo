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
import setCookies from '@/client/js/module/cookies/setCookies';
import login from '@/client/js/auth/login';
import logout from '@/client/js/auth/logout';

// onMounted
document.onreadystatechange = async () => {
  if (document.readyState !== 'complete') return;
  try {

    // JWT 요청
    /* const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameName: 'indianPocker', roomName: '' })
    });
    const data = await res.json();
    console.log('로그인 응답 : ', data); */

    // LOGIN COOKIE 확인 요청
    /* await fetch('/api/user-info', {
      method: 'GET',
      credentials: 'include', // 쿠키(authToken)를 함께 보냄
    })
      .then(response => {
        if (!response.ok) throw new Error('인증 실패');
        return response.json();
      })
      .then(data => {
        console.log('인증 성공:', data);
      })
      .catch(error => {
        console.error('에러:', error);
      }); */

    /* const auth = await fetch('/api/user-info', {
      method: 'GET',
      credentials: 'include', // 쿠키(authToken)를 함께 보냄
    });

    if (auth.ok) {
      const authData = await auth.json();
      if (authData.status === 'unauthorized') {
        console.log('처음 진입 : ', authData.message);
        await login();
      } else {
        console.log('새로고침 인증 성공 : ', authData);
      }
    } else {
      throw { errCase: 'auth', component: 'token', event: 'unauthorized', message: 'auth check failed' };
    }; */



    /* if (reload) {
      // 새로고침 했을 때
      if (window.sessionStorage.getItem('reload') === 'true') {
        // 기존 연결 되어 있는 상태에서 새로고침
        storageMethod('s', 'REMOVE_ITEM', 'reload');
        if (window.sessionStorage.getItem('roomName') === null) {
          // roomName 없으면 기존 Peer와 재연결 불가능
          // return errorManagement({ errCase: 'errorComn'});
          sessionStorage.clear();
          window.rtcChannels = {};
          throw { errCase: 'errorComn' };
        };
      }
    } else {
      await logout();
    }; */

    /*
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        // 사용자가 다른 페이지로 이동 중!
      }
    });
    */
    /*
    window.addEventListener('beforeunload', (event) => {
      // 여기서 실행할 로직 (예: 서버에 상태 저장)
      console.log('새로고침 직전 로직 실행!');

      // 경고 메시지를 사용자에게 보여줄 때
      event.preventDefault();
      event.returnValue = ''; // Chrome 등에서 필요
    });
    */

    // 브라우저 뒤로가기, 브라우저 새로고침 모두 동작
    /* window.addEventListener('beforeunload', () => {
      // WebRTC 연결 JWT LOGOUT 처리
      navigator.sendBeacon('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
    }); */

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
