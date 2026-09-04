import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
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
// import { requestBatting } from '@/client/js/network/indianPocker/batting/requestBatting';
import { request } from '@/client/js/network/indianPocker/request';
import findRemoteCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/findRemoteCard';
import playingEndData from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/playingEndData';

function decodeBettingNumber(key, name) {
  const value = window.sessionStorage.getItem(key);

  if (value === null) {
    throw throwObj('sessionStorageLoss', `${name} sessionStorage key failed.`);
  }

  return value === '' ? 0 : dec(value);
}

function bettingEventSetParams() {
  const encryptKey1 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
  const encryptKey2 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
  const encryptKey3 = findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]); // coinsPlayerExtBet

  return {
    coinCount: decodeBettingNumber(encryptKey1, 'coinsPlayer'),
    coinBet: decodeBettingNumber(encryptKey2, 'coinsPlayerBet'),
    extBet: decodeBettingNumber(encryptKey3, 'coinsPlayerExtBet'),
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
      // const BATTLE_CARD_NUM = window.sessionStorage.getItem('battleCardNum');
      // if (BATTLE_CARD_NUM === null) {
      //   return errorManagement({ errCase: 'errorComn', message: 'error CALL request !BATTLE_CARD_NUM' });
      // }
      const encryptKey4 = findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]); // battleCardNum
      const encryptVal4 = window.sessionStorage.getItem(encryptKey4);
      if (encryptVal4 === null) {
        return errorManagement({ errCase: 'errorComn', message: 'error CALL request !BATTLE_CARD_NUM' });
      };

      // 여기서 내 화면의 battleCardNum과 publicCardNum과 매칭된 publicCard 코드를 전송
      const remoteCard = findRemoteCard(encryptVal4);

      /* request('call', {
        coinCount: Number(window.sessionStorage.coinsPlayer),
        coinBet: Number(window.sessionStorage.coinsPlayerBet),
        extBet: Number(window.sessionStorage.coinsPlayerExtBet),
        playerCardNum: BATTLE_CARD_NUM,
      }); */
      request('call', {
        ...bettingEventSetParams(),
        // playerCardNum: BATTLE_CARD_NUM,
        playerCardNum: remoteCard,
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
      // const BATTLE_CARD_NUM = window.sessionStorage.getItem('battleCardNum');
      // if (BATTLE_CARD_NUM === null) {
      //   return errorManagement({ errCase: 'errorComn', message: 'error FOLD request !BATTLE_CARD_NUM' });
      // }
      const encryptKey5 = findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]); // battleCardNum
      const encryptVal5 = window.sessionStorage.getItem(encryptKey5);
      if (encryptVal5 === null) {
        return errorManagement({ errCase: 'errorComn', message: 'error FOLD request !BATTLE_CARD_NUM' });
      };
      const remoteCard = findRemoteCard(encryptVal5);

      request('foldSend', {
        // penalty: Number(_penalty) === 10 ? true : false,
        penalty: _penalty, // _penalty : 내가 포기한 카드가 10이면 true
        // playerCardNum: BATTLE_CARD_NUM,
        // playerCardNum: encryptVal5,
        playerCardNum: remoteCard,
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
          // 상대가 call / fold 누름 -> 상대에게 card num 받음
          // 상대 PEER에게서 내 card num을 알아냈음
          // TODO: 여기서 sessstorage 정의
          /* playingEndData(_data.playerCardNum, "call", false)
            .then((_data) => {
              console.log("콜 받은 PEER 의 DATA : ", _data);

              // GET_CALL.receiveCallBet(_data);
            })
            .catch((error) => {
              errorManager(error, true);
            }); */


          // 새로고침 시 상대 카드번호 필요하여 storage에 저장
          // 한 라운드가 끝난 후 삭제 필요
          storageMethod('s',
            'SET_ITEM',
            findCharCode([77, 87, 85, 88, 83, 80, 79, 90, 65, 66]), // playCardNum
            _data.playerCardNum
          );
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
          storageMethod(
            's',
            'SET_ITEM',
            findCharCode([77, 87, 85, 88, 83, 80, 79, 90, 65, 66]), // playCardNum
            _data.playerCardNum
          );
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
