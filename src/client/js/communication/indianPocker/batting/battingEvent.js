import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorManagement';
import { comnText } from '@/client/js/functions/language';
import { GET_BETTING } from '@/client/js/views/game/indianPocker/fns/statePlaying/betting/getBetting';
import { GET_ALLIN } from '@/client/js/views/game/indianPocker/fns/statePlaying/allin/getAllin';
import { GET_CALL } from '@/client/js/views/game/indianPocker/fns/statePlaying/call/getCall';
import { GET_RAISE } from '@/client/js/views/game/indianPocker/fns/statePlaying/raise/getRaise';
import { GET_FOLD } from '@/client/js/views/game/indianPocker/fns/statePlaying/fold/getFold';
import { requestBatting } from '@/client/js/communication/indianPocker/batting/requestBatting';
import { request } from '@/client/js/communication/indianPocker/request';

export default {
  SET: {
    FIRST_EXT_BET: () => {
      request('firstExtBet', {
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
        state: comnText.betting,
      });
      // storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', 0);
    },
    ALL_IN: () => {
      console.log('coinCount >>>>>>>> ', window.sessionStorage.coinsPlayer);
      console.log('coinBet >>>>>>>> ', window.sessionStorage.coinsPlayerBet);
      console.log('extBet >>>>>>>> ', window.sessionStorage.coinsPlayerExtBet);

      request('allInBet', {
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
      });
    },
    CALL: () => {
      const BATTLE_CARD_NUM = window.sessionStorage.getItem('battleCardNum');
      if (BATTLE_CARD_NUM === null) {
        return errorManagement({ errCase: 'errorComn', message: 'error CALL request !BATTLE_CARD_NUM' });
      }

      request('call', {
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
        playerCardNum: BATTLE_CARD_NUM,
      });
    },
    RAISE: () => {
      request('raise', {
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
      });
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
      const promise = new Promise((resolve, reject) => {
        resolve(_data);
      });
      promise
        .then((_data) => {
          storageMethod('s', 'SET_ITEM', 'extFirstBet', true);
          GET_BETTING.sessionExtraBet(_data);
        })
        .catch((error) => {
          console.log('error - battingEvent.js - FIRST_EXT_BET_RESULT');
          return errorManagement({ errCase: 'errorComn' });
        });
    },
    ALL_IN_BET_RESULT: (_data) => {
      let promise = new Promise((resolve, reject) => {
        resolve(_data);
      });
      promise
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
      const promise = new Promise((resolve, reject) => {
        resolve(_data);
      });
      promise
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
      let promise = new Promise((resolve, reject) => {
        resolve(_data);
      });
      promise
        .then((_data) => {
          GET_RAISE.receiveRaiseBet(_data);
        })
        .catch((error) => {
          console.log('error - battingEvent.js - RAISE_RESULT');
          return errorManagement({ errCase: 'errorComn' });
        });
    },
    FOLD_RESULT: (_data) => {
      const promise = new Promise((resolve, reject) => {
        resolve(_data);
      });
      promise
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
      const promise = new Promise((resolve, reject) => {
        resolve(_data);
      });
      promise
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
