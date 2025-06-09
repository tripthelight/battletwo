import { errorManagement } from '@/client/js/module/errorManagement';
import storageKeys from '@/client/js/functions/dataVerification/storageKeys';
import webRTC from '@/client/js/webRTC/rtcConn';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import findCharCode from '@/client/js/functions/findCharCode';
import initNickName from '@/client/js/functions/initNickName';
import waitPeer from '@/client/js/functions/waitPeer';
import findNickname from '@/client/js/functions/findNickname';
import storageMethod from '@/client/js/module/storage/storageMethod';

export default async function rtcPeer(gameName) {
  return new Promise(async (resolve, reject) => {
    try {
      LOADING_EVENT.show();

      /**
       * 게임화면에 직접 진입 했는데,
       * localStorage에 localPlayer 가 없을 경우,
       * localPlayer를 만들 때 까지 대기 후 webRTC 연결
       */
      await initNickName();

      // waitEnemy
      // if (!window.sessionStorage.getItem('gameState')) {
      //   storageMethod('s', 'SET_ITEM', 'gameState', 'waitEnemy');
      // }
      // waitEnemy
      // gameState: sessionStorage.getItem('gameState'),
      const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
      // waitEnemy
      const encryptVal = findCharCode([74, 75, 71, 90, 87, 79, 85, 69, 65, 88]); // waitEnemy
      const decryptVal = window.sessionStorage.getItem(encryptKey);
      if (decryptVal === null) {
        storageMethod('s', 'SET_ITEM', encryptKey, encryptVal);
      } else {
        const encryptKeys = storageKeys({
          p1: findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]), // indianPocker,
          p2: findCharCode([88, 66, 65, 72, 90, 68, 86, 75, 85, 73]), // gameStateAllKeys
        });

        if (encryptKeys.includes(decryptVal)) {
          // 모든 gameState key 가 정상적으로 있음
        } else {
          reject({ errCase: 'errorComn', message: 'gameState value error' });
          return;
        }
      }

      // if (window.sessionStorage.getItem('gameState') === 'waitEnemy') {
      //   waitPeer(1, findNickname('localPlayer'));
      // }
      if (window.sessionStorage.getItem(encryptKey) === encryptVal) {
        waitPeer(1, findNickname('localPlayer'));
      }

      if (!window.rtcChannels) {
        window.rtcChannels = {};
      }

      await webRTC(gameName);

      // if (window.sessionStorage.getItem('gameState') === 'waitEnemy') {
      //   waitPeer(2);
      // }
      if (window.sessionStorage.getItem(encryptKey) === encryptVal) {
        waitPeer(2);
      }
      resolve();
    } catch (error) {
      console.log('error >>>>>>>>>>>> ', error);

      reject(error);
    }
  });
}
