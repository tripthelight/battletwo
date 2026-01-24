import findCharCode from '@/client/js/functions/findCharCode';
import findCharDecCode from '@/client/js/functions/findCharDecCode';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState.js';
import { comnText } from '@/client/js/functions/language';
// import getLocalCardNum from '@/client/js/views/game/indianPocker/fns/common/getLocalCardNum';
import setSessionMakeZero from '@/client/js/views/game/indianPocker/fns/sessions/setSessionMakeZero';
// import playerNumRes from '@/client/js/views/game/indianPocker/fns/common/playerNumRes.js';
import allInClickEvent from '@/client/js/views/game/indianPocker/fns/common/allInClickEvent';
import btnBettingCallRaiseComn from '@/client/js/views/game/indianPocker/fns/common/btnBettingCallRaiseComn';
import SOCKET_EVENT from '@/client/js/network/indianPocker/batting/battingEvent';
import { GET_ROUND_END } from '@/client/js/views/game/indianPocker/fns/statePlaying/roundEnd/getRoundEnd';
import { SET_FOLD } from '@/client/js/views/game/indianPocker/fns/statePlaying/fold/setFold';
import stopPlayerTime from '@/client/js/views/game/indianPocker/fns/common/stopPlayerTime';
import foldPreCalculation from '@/client/js/views/game/indianPocker/fns/common/foldPreCalculation';

export const RULES = {
  COMN: (_state) => {
    BTN_STATE.HIDE();
    btnBettingCallRaiseComn(_state);
    if (_state === comnText.betting || _state === comnText.call || _state === comnText.raise) {
      // setTimeout(setSessionMakeZero, timeInterval_1, 'coinsPlayerExtBet');
      setTimeout(
        setSessionMakeZero,
        timeInterval_1,
        findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]) // coinsPlayerExtBet
      );
    }
  },
  BETTING: () => {
    stopPlayerTime('betting');
    RULES.COMN(comnText.betting);
    SOCKET_EVENT.SET.FIRST_EXT_BET();
  },
  CALL: () => {
    stopPlayerTime('call');
    RULES.COMN(comnText.call);
    SOCKET_EVENT.SET.CALL();
    GET_ROUND_END.receiveRoundEnd();
  },
  RAISE: () => {
    stopPlayerTime('raise');
    RULES.COMN(comnText.raise);
    SOCKET_EVENT.SET.RAISE();
  },
  FOLD: () => {
    /*
    const P_NUM_RES = playerNumRes();
    */
    // const P_NUM_RES = getLocalCardNum();
    const encryptKey1 = findCharCode([77, 87, 85, 88, 83, 80, 79, 90, 65, 66]); // playCardNum
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    if (encryptVal1 === null || (encryptVal1 !== null && encryptVal1 === '')) {
      errorManagement({ errCase: 'errorComn', message: 'error - rules.js - playCardNum null' });
    };
    const P_NUM_RES = encryptVal1 === findCharDecCode([74, 82, 80, 70, 73, 71, 83, 66, 68, 78]); // FOLD 시 패널티 받는 카드 숫자 10
    foldPreCalculation(P_NUM_RES);
    RULES.COMN(comnText.fold);
    SET_FOLD.setFold({ _penalty: P_NUM_RES, _num: encryptVal1});
    SOCKET_EVENT.SET.FOLD(P_NUM_RES);
  },
  ALLIN: () => {
    RULES.COMN();
    allInClickEvent();
  },
};
