import '@/client/assets/scss/game/findTheSamePicture/common';
import '@/client/js/common/common';
import rtcPeer from '@/client/js/webRTC/rtcPeer';
import reload from '@/client/js/module/reload';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorManagement';

import { request } from '@/client/js/communication/findTheSamePicture/request';

// onMounted
document.onreadystatechange = async () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    try {
      console.log('findTheSamePicture init');
      console.log('reload >>> ', reload);

      // gameName을 sessionStorage에 저장
      const GAME_NAME = window.sessionStorage.getItem('gameName');
      if (!GAME_NAME || GAME_NAME !== 'findTheSamePicture') {
        storageMethod('s', 'SET_ITEM', 'gameName', 'findTheSamePicture');
      }

      // webRTC 공통
      await rtcPeer('findTheSamePicture');

      if (reload) {
        // 새로 고침 후 재연결인 경우
      } else {
        //
      }
      document.body.onclick = () => {
        request('bodyClick');
      };
    } catch (error) {
      errorManagement(error);
    }
  }
};
