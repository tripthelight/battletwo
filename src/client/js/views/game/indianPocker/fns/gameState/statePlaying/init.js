import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { request } from '@/client/js/network/indianPocker/request';
import sessionInitPlaying from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/sessionInitPlaying';
import refreshDrawDrew from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/refreshDrawDrew';
import indianPockerGameState from '@/client/js/gameState/indianPocker';
import dataHandler from '@/client/js/functions/dataVerification/load/dataHandler';
import createBattleCardNum from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/createBattleCardNum';
import {
  announceRoundResultStepReady,
  ROUND_RESULT_STEP,
} from '@/client/js/network/indianPocker/fns/roundResultReloadSync';

export const STATE_PLAYING = {
  main: () => {
    // dataHandler({
    //   p1: findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]), // indianPocker
    //   p2: findCharCode([84, 88, 86, 66, 78, 73, 82, 81, 87, 71]), // playing
    // });

    // ——————————————————————————————————————————————————————
    // TODO: dataHandler 이 후 실행할 명령들
    // ——————————————————————————————————————————————————————
    LOADING_EVENT.show();
    // TODO: 여기서 서로의 coinsEnemy, coinsPlayer 확인
    request('enterPlaying', [112, 108, 97, 121, 105, 110, 103]); // playing
    sessionInitPlaying();
    // ——————————————————————————————————————————————————————
  },
  drew: (options = {}) => {
    // 카드 비교 후, 같은 카드면 진입하는 곳
    // storageMethod('s', 'REMOVE_ITEM', 'betResulting');
    // if (window.sessionStorage.drewReady && window.sessionStorage.drewReady === "true") return refreshDrawDrew(); // refresh
    // if (window.sessionStorage.drewFlipCardMode && window.sessionStorage.drewFlipCardMode === 'true') return refreshDrawDrew();
    const encryptKey1 = findCharCode([79, 76, 88, 84, 75, 65, 77, 73, 72, 86]); // drewFlipCardMode
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
    if (encryptVal1 !== null && encryptVal1 !== '' && X.dec(encryptVal1)) return refreshDrawDrew();
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
    announceRoundResultStepReady(ROUND_RESULT_STEP.DREW);

    if (options.roundResultReload) {
      storageMethod('s', 'REMOVE_ITEM', findCharCode([65, 82, 73, 84, 83, 87, 74, 67, 89, 90])); // betResulting
      storageMethod('s', 'REMOVE_ITEM', 'roundEndReload');

      const encryptKey2 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
      const encryptVal2 = storageMethod('s', 'GET_ITEM', encryptKey2);
      if (encryptVal2 !== null && encryptVal2 !== '' && X.dec(encryptVal2)) createBattleCardNum();
    }
  },
  nextStep: () => {
    indianPockerGameState.gameOver();
  },
};
