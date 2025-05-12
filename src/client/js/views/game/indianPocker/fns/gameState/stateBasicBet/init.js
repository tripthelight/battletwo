import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { request } from '@/client/js/communication/indianPocker/request';
import gameEnd from '@/client/js/views/game/indianPocker/fns/common/gameEnd';
import sessionInit from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/sessionInit';
import indianPockerGameState from '@/client/js/gameState/indianPocker';
import basicBetMainCheck from '@/client/js/views/game/indianPocker/fns/common/basicBetMainCheck';

export default {
  main: () => {
    storageMethod('s', 'REMOVE_ITEM', 'betResulting');
    if (basicBetMainCheck()) {
      return gameEnd();
    } else {
      if (window.sessionStorage.betState && window.sessionStorage.betState === 'basicBetting') {
        // refresh
        setTimeout(sessionInit, timeInterval_1);
        LOADING_EVENT.hide();
      } else {
        LOADING_EVENT.show();
        if (window.sessionStorage.basicBetReady && window.sessionStorage.basicBetReady === 'false') {
          storageMethod('s', 'SET_ITEM', 'roundEnd', false);
          setTimeout(sessionInit, timeInterval_1);
          LOADING_EVENT.hide();
        }
        request('enterBasicBet', 'basicBet');
      }
    }
  },
  nextStep: () => {
    LOADING_EVENT.show();
    indianPockerGameState.playing();
  },
};
