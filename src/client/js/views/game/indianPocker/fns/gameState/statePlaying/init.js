import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1, timeInterval_5200 } from '@/client/js/functions/variable';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { request } from '@/client/js/communication/indianPocker/request';
import sessionInitPlaying from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/sessionInitPlaying';
import refreshDrawDrew from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/refreshDrawDrew';
import indianPockerGameState from '@/client/js/gameState/indianPocker';

export const STATE_PLAYING = {
  main: () => {
    LOADING_EVENT.show();

    request('enterPlaying', 'playing');
    // TODO: 왜 기본배팅 코인이 1개면 battleCardNum을 못만들지?
    setTimeout(sessionInitPlaying, timeInterval_1);
  },
  drew: () => {
    // storageMethod('s', 'REMOVE_ITEM', 'betResulting');
    // if (window.sessionStorage.drewReady && window.sessionStorage.drewReady === "true") return refreshDrawDrew(); // refresh
    if (window.sessionStorage.drewFlipCardMode && window.sessionStorage.drewFlipCardMode === 'true') return refreshDrawDrew();
    LOADING_EVENT.show();
    storageMethod('s', 'REMOVE_ITEM', 'dropState');
    storageMethod('s', 'SET_ITEM', 'drewReady', true);
    request('enterDrew', true);
  },
  nextStep: () => {
    indianPockerGameState.gameOver();
  },
};
