import findCharCode from '@/client/js/functions/findCharCode';
import { timeInterval_1, timeInterval_2 } from '@/client/js/functions/variable';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { STATE_PLAYING } from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/init';
import REFRESH_STATE_PLAYING from '@/client/js/refresh/indianpoker/refreshPlaying/refreshInit';
import reload from '@/client/js/module/reload';

export default () => {
  // 이전 게임에서 FOLD 한 경우 playing 새로 진입 시 모두 제거
  // storageMethod('s', 'REMOVE_ITEM', 'coinsEnemyLocalFold');
  storageMethod('s', 'REMOVE_ITEM', findCharCode([86, 90, 81, 77, 74, 72, 88, 83, 65, 80])); // coinsEnemyLocalFold
  storageMethod('s', 'REMOVE_ITEM', findCharCode([80, 78, 65, 74, 82, 70, 66, 67, 81, 69])); // coinsPlayerLocalFold
  storageMethod('s', 'REMOVE_ITEM', 'coinsEnemyRemoteFold');
  storageMethod('s', 'REMOVE_ITEM', 'coinsPlayerRemoteFold');
  storageMethod('s', 'REMOVE_ITEM', 'foldUser');
  storageMethod('s', 'REMOVE_ITEM', 'foldState');

  const BET_RESULTING = window.sessionStorage.betResulting;
  if (BET_RESULTING && BET_RESULTING === 'true') {
    if (reload) {
      REFRESH_STATE_PLAYING.main();
    }
  } else {
    // if (window.sessionStorage.drewState && window.sessionStorage.drewState === "true") return STATE_PLAYING.drew();
    console.log('여기를 탔다는 건데....');
    STATE_PLAYING.main();
    LOADING_EVENT.show();
    // refresh event
    if (reload) {
      REFRESH_STATE_PLAYING.main();
    }
  }

  /* setTimeout(() => {
    const BET_RESULTING = window.sessionStorage.betResulting;
    if (BET_RESULTING && BET_RESULTING === 'true') {
      if (reload) {
        REFRESH_STATE_PLAYING.main();
      }
    } else {
      // if (window.sessionStorage.drewState && window.sessionStorage.drewState === "true") return STATE_PLAYING.drew();
      console.log('여기를 탔다는 건데....');
      STATE_PLAYING.main();
      LOADING_EVENT.show();
      // refresh event
      setTimeout(() => {
        if (reload) {
          REFRESH_STATE_PLAYING.main();
        }
      }, 200);
    }
  }, timeInterval_1); */
};
