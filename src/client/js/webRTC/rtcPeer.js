import { debug } from '@/client/js/module/debug';
import webRTC from '@/client/js/webRTC/rtcConn';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import initNickName from '@/client/js/functions/initNickName';
import waitPeer from '@/client/js/functions/waitPeer';
import findNickname from '@/client/js/functions/findNickname';
import storageMethod from '@/client/js/module/storage/storageMethod';

export default async function rtcPeer(gameName) {
  return new Promise(async (resolve, reject) => {
    LOADING_EVENT.show();

    /**
     * 게임화면에 직접 진입 했는데,
     * localStorage에 localPlayer 가 없을 경우,
     * localPlayer를 만들 때 까지 대기 후 webRTC 연결
     */
    await initNickName();

    // waitEnemy
    if (!window.sessionStorage.getItem('gameState')) {
      storageMethod('s', 'SET_ITEM', 'gameState', 'waitEnemy');
    }

    if (window.sessionStorage.getItem('gameState') === 'waitEnemy') {
      waitPeer(1, findNickname('localPlayer'));
    }

    if (!window.rtcChannels) {
      window.rtcChannels = {};
    }

    await webRTC(gameName);

    if (window.sessionStorage.getItem('gameState') === 'waitEnemy') {
      waitPeer(2);
    }
    resolve();
  });
}
