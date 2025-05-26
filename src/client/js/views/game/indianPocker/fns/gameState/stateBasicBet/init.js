import findCharCode from '@/client/js/functions/findCharCode';
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
    // basicBet
    const encryptVal = findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]);
    storageMethod('s', 'REMOVE_ITEM', 'betResulting');
    if (basicBetMainCheck()) {
      return gameEnd();
    } else {
      if (window.sessionStorage.betState && window.sessionStorage.betState === 'basicBetting') {
        setTimeout(sessionInit, timeInterval_1);
        LOADING_EVENT.hide();
        // 상대가 call, fold 애니메이션 중 새로고침 했고
        // 나는 새로고침 안했을 경우
        // 상대를 기본배팅 시키기 위해 request 보내야 됨
        // request('remoteReloadBasicBet', 'basicBet');
        request('remoteReloadBasicBet', encryptVal);
      } else {
        LOADING_EVENT.show();
        if (window.sessionStorage.basicBetReady && window.sessionStorage.basicBetReady === 'false') {
          storageMethod('s', 'SET_ITEM', 'roundEnd', false);
          setTimeout(sessionInit, timeInterval_1);
          LOADING_EVENT.hide();
        }
        // request('enterBasicBet', 'basicBet');
        request('enterBasicBet', encryptVal);
      }
    }
  },
  nextStep: () => {
    LOADING_EVENT.show();
    indianPockerGameState.playing();
  },
};
