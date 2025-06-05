import { timeInterval_1 } from '@/client/js/functions/variable';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState.js';
import { comnText } from '@/client/js/functions/language';
import getLocalCardNum from '@/client/js/views/game/indianPocker/fns/common/getLocalCardNum';
import setSessionMakeZero from '@/client/js/views/game/indianPocker/fns/sessions/setSessionMakeZero.js';
import playerNumRes from '@/client/js/views/game/indianPocker/fns/common/playerNumRes.js';
import allInClickEvent from '@/client/js/views/game/indianPocker/fns/common/allInClickEvent.js';
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
      setTimeout(setSessionMakeZero, timeInterval_1, 'coinsPlayerExtBet');
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
    const P_NUM_RES = getLocalCardNum();
    foldPreCalculation(P_NUM_RES);
    RULES.COMN(comnText.fold);
    SET_FOLD.setFold(P_NUM_RES);
    SOCKET_EVENT.SET.FOLD(P_NUM_RES);
  },
  ALLIN: () => {
    RULES.COMN();
    allInClickEvent();
  },
};
