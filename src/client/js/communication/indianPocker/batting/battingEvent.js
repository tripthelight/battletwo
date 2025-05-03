import { errorManagement } from '@/client/js/module/errorManagement';
import { comnText } from '@/client/js/functions/language';
import { GET_BETTING } from '../statePlaying/betting/getBetting.js';
import { GET_ALLIN } from '../statePlaying/allin/getAllin.js';
import { GET_CALL } from '../statePlaying/call/getCall.js';
import { GET_RAISE } from '../statePlaying/raise/getRaise.js';
import { GET_FOLD } from '../statePlaying/fold/getFold.js';

export default {
  SET: {
    FIRST_EXT_BET: () => {
      namespace.emit('firstExtBet', {
        room: window.sessionStorage.roomName,
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
        state: comnText.betting,
      });
      // window.sessionStorage.setItem("coinsPlayerExtBet", 0);
    },
    ALL_IN: () => {
      namespace.emit('allInBet', {
        room: window.sessionStorage.roomName,
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
      });
    },
    CALL: () => {
      namespace.emit('call', {
        room: window.sessionStorage.roomName,
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
      });
    },
    RAISE: () => {
      namespace.emit('raise', {
        room: window.sessionStorage.roomName,
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
      });
    },
    FOLD: (_penalty) => {
      namespace.emit('foldSend', {
        room: window.sessionStorage.roomName,
        penalty: Number(_penalty) === 10 ? true : false,
      });
    },
  },
  GET: {
    FIRST_EXT_BET_RESULT: (_data) => {
      let promise = new Promise((resolve, reject) => {
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
