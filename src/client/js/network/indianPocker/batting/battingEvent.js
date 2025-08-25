import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { comnText } from '@/client/js/functions/language';
import { GET_BETTING } from '@/client/js/views/game/indianPocker/fns/statePlaying/betting/getBetting';
import { GET_ALLIN } from '@/client/js/views/game/indianPocker/fns/statePlaying/allin/getAllin';
import { GET_CALL } from '@/client/js/views/game/indianPocker/fns/statePlaying/call/getCall';
import { GET_RAISE } from '@/client/js/views/game/indianPocker/fns/statePlaying/raise/getRaise';
import { GET_FOLD } from '@/client/js/views/game/indianPocker/fns/statePlaying/fold/getFold';
import { requestBatting } from '@/client/js/network/indianPocker/batting/requestBatting';
import { request } from '@/client/js/network/indianPocker/request';

function bettingEventSetParams() {
  const encryptKey1 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]);  // coinsPlayer
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  const decryptVal1 = dec(encryptVal1); // coinsPlayer value number
  const encryptKey2 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]);  // coinsPlayerBet
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  const decryptVal2 = dec(encryptVal2); // coinsPlayerBet value number
  return {
    coinCount: decryptVal1,
    coinBet: decryptVal2,
    extBet: Number(window.sessionStorage.coinsPlayerExtBet),
  };
};

export default {
  SET: {
    FIRST_EXT_BET: () => {
      /* request('firstExtBet', {
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
        state: comnText.betting,
      }); */
      // storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', 0);
      request('firstExtBet', {
        ...bettingEventSetParams(),
        state: comnText.betting,
      });
    },
    ALL_IN: () => {
      /* request('allInBet', {
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
      }); */
      request('allInBet', bettingEventSetParams());
    },
    CALL: () => {
      const BATTLE_CARD_NUM = window.sessionStorage.getItem('battleCardNum');
      if (BATTLE_CARD_NUM === null) {
        return errorManagement({ errCase: 'errorComn', message: 'error CALL request !BATTLE_CARD_NUM' });
      }

      /* request('call', {
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
        playerCardNum: BATTLE_CARD_NUM,
      }); */
      request('call', {
        ...bettingEventSetParams(),
        playerCardNum: BATTLE_CARD_NUM,
      });
    },
    RAISE: () => {
      /* request('raise', {
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
      }); */
      request('raise', bettingEventSetParams());
    },
    FOLD: (_penalty) => {
      const BATTLE_CARD_NUM = window.sessionStorage.getItem('battleCardNum');
      if (BATTLE_CARD_NUM === null) {
        return errorManagement({ errCase: 'errorComn', message: 'error FOLD request !BATTLE_CARD_NUM' });
      }

      request('foldSend', {
        penalty: Number(_penalty) === 10 ? true : false,
        playerCardNum: BATTLE_CARD_NUM,
      });
    },
  },
  GET: {
    FIRST_EXT_BET_RESULT: (_data) => {
      const PROMISE = new Promise((resolve, reject) => {
        resolve(_data);
      });
      PROMISE
        .then((_data) => {
          storageMethod('s', 'SET_ITEM',
            findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), // extFirstBet
            X.enc(decodeTF(textDE([115, 102, 112, 97]))) // "sfpa" : true
          );
          GET_BETTING.sessionExtraBet(_data);
        })
        .catch((error) => {
          console.log('error - battingEvent.js - FIRST_EXT_BET_RESULT');
          return errorManagement({ errCase: 'errorComn' });
        });
    },
    ALL_IN_BET_RESULT: (_data) => {
      const PROMISE = new Promise((resolve, reject) => {
        resolve(_data);
      });
      PROMISE
        .then((_data) => {
          console.log('all in data >>>>>>>>> ', _data);

          GET_ALLIN.receiveAllinBet(_data);
        })
        .catch((error) => {
          console.log('error - battingEvent.js - ALL_IN_BET_RESULT');
          return errorManagement({ errCase: 'errorComn' });
        });
    },
    CALL_RESULT: (_data) => {
      const PROMISE = new Promise((resolve, reject) => {
        resolve(_data);
      });
      PROMISE
        .then((_data) => {
          // 새로고침 시 상대 카드번호 필요하여 storage에 저장
          // 한 라운드가 끝난 후 삭제 필요
          storageMethod('s', 'SET_ITEM', 'playCardNum', _data.playerCardNum);
          GET_CALL.receiveCallBet(_data);
        })
        .catch((error) => {
          console.log('error - battingEvent.js - CALL_RESULT');
          return errorManagement({ errCase: 'errorComn' });
        });
    },
    RAISE_RESULT: (_data) => {
      const PROMISE = new Promise((resolve, reject) => {
        resolve(_data);
      });
      PROMISE
        .then((_data) => {
          GET_RAISE.receiveRaiseBet(_data);
        })
        .catch((error) => {
          console.log('error - battingEvent.js - RAISE_RESULT');
          return errorManagement({ errCase: 'errorComn' });
        });
    },
    FOLD_RESULT: (_data) => {
      const PROMISE = new Promise((resolve, reject) => {
        resolve(_data);
      });
      PROMISE
        .then((_data) => {
          // 새로고침 시 상대 카드번호 필요하여 storage에 저장
          // 한 라운드가 끝난 후 삭제 필요
          storageMethod('s', 'SET_ITEM', 'playCardNum', _data.playerCardNum);
          GET_FOLD.receivefold(_data);
        })
        .catch((error) => {
          console.log('error - battingEvent.js - FOLD_RESULT');
          return errorManagement({ errCase: 'errorComn' });
        });
    },
    FOLD_ENEMY: (_data) => {
      const PROMISE = new Promise((resolve, reject) => {
        resolve(_data);
      });
      PROMISE
        .then((_data) => {
          GET_FOLD.sendFoldData(_data);
        })
        .catch((error) => {
          console.log('error - battingEvent.js - FOLD_ENEMY');
          return errorManagement({ errCase: 'errorComn' });
        });
    },
  },
};
