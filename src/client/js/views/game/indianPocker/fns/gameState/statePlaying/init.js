import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
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
    // storageMethod('s', 'REMOVE_ITEM', 'dropState');
    storageMethod('s', 'REMOVE_ITEM', findCharCode([81, 69, 71, 84, 85, 90, 82, 67, 77, 89])); // dropState
    // storageMethod('s', 'SET_ITEM', 'drewReady', true);
    storageMethod('s', 'SET_ITEM',
      findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]), // drewReady
      X.enc(decodeTF(textDE([115, 109, 112, 117]))) // "smpu" : true
    );
    request('enterDrew', true);
  },
  nextStep: () => {
    indianPockerGameState.gameOver();
  },
};
