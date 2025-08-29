import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { request } from '@/client/js/network/indianPocker/request';
import gameEnd from '@/client/js/views/game/indianPocker/fns/common/gameEnd';
import sessionInit from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/sessionInit';
import basicBetMainCheck from '@/client/js/views/game/indianPocker/fns/common/basicBetMainCheck';

export default () => {
  const encodeKey = [98, 97, 115, 105, 99, 66, 101, 116]; // basicBet
  storageMethod('s', 'REMOVE_ITEM', 'betResulting');
  if (basicBetMainCheck()) {
    return gameEnd();
  } else {
    const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const encryptKey2 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
    if (encryptVal1 === encryptKey2) {
      sessionInit();
      LOADING_EVENT.hide();
      // 상대가 call, fold 애니메이션 중 새로고침 했고
      // 나는 새로고침 안했을 경우
      // 상대를 기본배팅 시키기 위해 request 보내야 됨
      request('remoteReloadBasicBet', encodeKey);
    } else {
      // choiceCard 결과 안내팝업 누르고 여기로 진입함
      LOADING_EVENT.show();
      const encryptKey3 = findCharCode([72, 81, 73, 79, 83, 70, 78, 80, 75, 88]); // basicBetReady
      const decryptVal3 = window.sessionStorage.getItem(encryptKey3);

      // basicBetReady === false
      if (decryptVal3 !== '' && !X.dec(decryptVal3)) {
        const encryptKey4 = findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]); // roundEnd
        storageMethod('s', 'SET_ITEM',
          encryptKey4, // roundEnd
          X.enc(decodeTF(textDE([100, 103, 98, 105, 110]))) // "dgbin" : false
        );
        // console.log('sessionInit 진입 - initLoad 단계에서 진입');
        // sessionInit();
        LOADING_EVENT.hide();
      };
      // choiceCard 결과 안내팝업 누르고 여기로 진입한 peer 둘 다 request 보냄
      request('enterBasicBet', encodeKey);
    };
  };
};
