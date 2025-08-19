import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { request } from '@/client/js/network/indianPocker/request';
import gameEnd from '@/client/js/views/game/indianPocker/fns/common/gameEnd';
import sessionInit from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/sessionInit';
import indianPockerGameState from '@/client/js/gameState/indianPocker';
import basicBetMainCheck from '@/client/js/views/game/indianPocker/fns/common/basicBetMainCheck';

export default {
  main: () => {
    // basicBet
    // const encryptVal = findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]); // basicBet
    const encodeKey = [98, 97, 115, 105, 99, 66, 101, 116]; // basicBet
    storageMethod('s', 'REMOVE_ITEM', 'betResulting');
    if (basicBetMainCheck()) {
      return gameEnd();
    } else {
      const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
      const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
      const encryptKey2 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
      // if (window.sessionStorage.betState && window.sessionStorage.betState === 'basicBetting') {
      if (encryptVal1 !== null && encryptVal1 === encryptKey2) {
        sessionInit();
        LOADING_EVENT.hide();
        // 상대가 call, fold 애니메이션 중 새로고침 했고
        // 나는 새로고침 안했을 경우
        // 상대를 기본배팅 시키기 위해 request 보내야 됨
        // request('remoteReloadBasicBet', encryptVal);
        request('remoteReloadBasicBet', encodeKey);
      } else {
        // choiceCard 결과 안내팝업 누르고 여기로 진입함
        LOADING_EVENT.show();
        if (window.sessionStorage.basicBetReady && window.sessionStorage.basicBetReady === 'false') {
          storageMethod('s', 'SET_ITEM', 'roundEnd', false);
          sessionInit();
          LOADING_EVENT.hide();
        }
        // request('enterBasicBet', encryptVal);
        // choiceCard 결과 안내팝업 누르고 여기로 진입한 peer 둘 다 request 보냄

        request('enterBasicBet', encodeKey);
      };
    };
  },
  nextStep: () => {
    LOADING_EVENT.show();
    indianPockerGameState.playing();
  },
};
