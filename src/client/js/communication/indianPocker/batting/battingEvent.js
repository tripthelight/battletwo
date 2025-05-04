import { errorManagement } from '@/client/js/module/errorManagement';
import { comnText } from '@/client/js/functions/language';
import { GET_BETTING } from '@/client/js/views/game/indianPocker/fns/statePlaying/betting/getBetting';
import { GET_ALLIN } from '@/client/js/views/game/indianPocker/fns/statePlaying/allin/getAllin';
import { GET_CALL } from '@/client/js/views/game/indianPocker/fns/statePlaying/call/getCall';
import { GET_RAISE } from '@/client/js/views/game/indianPocker/fns/statePlaying/raise/getRaise';
import { GET_FOLD } from '@/client/js/views/game/indianPocker/fns/statePlaying/fold/getFold';
import { requestBatting } from '@/client/js/communication/indianPocker/batting/requestBatting';

export default {
  SET: {
    FIRST_EXT_BET: () => {
      requestBatting('firstExtBet', {
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
        state: comnText.betting,
      });
      // window.sessionStorage.setItem("coinsPlayerExtBet", 0);
    },
    ALL_IN: () => {
      requestBatting('allInBet', {
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
      });
    },
    CALL: () => {
      requestBatting('call', {
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
      });
    },
    RAISE: () => {
      requestBatting('raise', {
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
      });
    },
    FOLD: (_penalty) => {
      requestBatting('foldSend', {
        penalty: Number(_penalty) === 10 ? true : false,
      });
    },
  },
  GET: {
    FIRST_EXT_BET_RESULT: (_data) => {
      const promise = new Promise((resolve, reject) => {
        resolve(_data);
      });
      promise
        .then((_data) => {
          window.sessionStorage.setItem('extFirstBet', true);
          GET_BETTING.sessionExtraBet(_data);
        })
        .catch((error) => {
          return errorManagement({ errCase: 'errorComn' });
        });
    },
    ALL_IN_BET_RESULT: (_data) => {
      let promise = new Promise((resolve, reject) => {
        resolve(_data);
      });
      promise
        .then((_data) => {
          GET_ALLIN.receiveAllinBet(_data);
        })
        .catch((error) => {
          return errorManagement({ errCase: 'errorComn' });
        });
    },
    CALL_RESULT: (_data) => {
      let promise = new Promise((resolve, reject) => {
        resolve(_data);
      });
      promise
        .then((_data) => {
          GET_CALL.receiveCallBet(_data);
        })
        .catch((error) => {
          return errorManagement({ errCase: 'errorComn' });
        });
    },
    RAISE_RESULT: (_data) => {
      let promise = new Promise((resolve, reject) => {
        resolve(_data);
      });
      promise
        .then((_data) => {
          GET_RAISE.receiveRaiseBet(_data);
        })
        .catch((error) => {
          return errorManagement({ errCase: 'errorComn' });
        });
    },
    FOLD_RESULT: (_data) => {
      let promise = new Promise((resolve, reject) => {
        resolve(_data);
      });
      promise
        .then((_data) => {
          GET_FOLD.receivefold(_data);
        })
        .catch((error) => {
          return errorManagement({ errCase: 'errorComn' });
        });
    },
  },
};
