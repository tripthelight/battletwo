import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1, timeInterval_5200 } from '@/client/js/functions/variable';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { request } from '@/client/js/network/indianPocker/request';
import sessionInitPlaying from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/sessionInitPlaying';
import refreshDrawDrew from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/refreshDrawDrew';
import indianPockerGameState from '@/client/js/gameState/indianPocker';

export const STATE_PLAYING = {
  main: () => {
    console.log('playing main 진입 >>>>>>>>>> ');
    LOADING_EVENT.show();
    // request('enterPlaying', 'playing');
    // TODO: 여기서 서로의 coinsEnemy, coinsPlayer 확인
    request('enterPlaying', [112, 108, 97, 121, 105, 110, 103]); // playing

    setTimeout(sessionInitPlaying, timeInterval_1);
  },
  drew: () => {
    // storageMethod('s', 'REMOVE_ITEM', 'betResulting');
    // if (window.sessionStorage.drewReady && window.sessionStorage.drewReady === "true") return refreshDrawDrew(); // refresh
    if (window.sessionStorage.drewFlipCardMode && window.sessionStorage.drewFlipCardMode === 'true') return refreshDrawDrew();
    LOADING_EVENT.show();
    console.log(' s: loading show loop test >>>>>>>>>>>>>>');
    storageMethod('s', 'REMOVE_ITEM', 'dropState');
    storageMethod('s', 'SET_ITEM', 'drewReady', true);
    request('enterDrew', true);
  },
  nextStep: () => {
    indianPockerGameState.gameOver();
  },
};
