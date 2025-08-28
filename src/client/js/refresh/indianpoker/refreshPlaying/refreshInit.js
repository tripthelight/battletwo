import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import { GET_ROUND_END } from '@/client/js/views/game/indianPocker/fns/statePlaying/roundEnd/getRoundEnd';
import { request } from '@/client/js/network/indianPocker/request';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { STATE_PLAYING } from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/init';
import refreshDrawDrew from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/refreshDrawDrew';
import refreshDrewFlipCard from '@/client/js/refresh/indianpoker/refreshPlaying/refreshDrewFlipCard/refreshDrewFlipCard';
import playerNumRes from '@/client/js/views/game/indianPocker/fns/common/playerNumRes.js';
import refreshEnemyNumber from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/refreshEnemyNumber';
import playerNum from '@/client/js/views/game/indianPocker/fns/common/playerNum';

export default {
  main: () => {
    const BET_RESULTING = window.sessionStorage.betResulting;
    if (BET_RESULTING && BET_RESULTING === 'true') {
      /*
      const P_NUM = playerNumRes();
      const BATTLE_CARD_NUM = window.sessionStorage.battleCardNum;
      if (!BATTLE_CARD_NUM) return;
      const BATTLE_CARD_ARR = JSON.parse(BATTLE_CARD_NUM);
      if (!BATTLE_CARD_ARR || BATTLE_CARD_ARR.length < 1) return;
      const E_NUM = refreshEnemyNumber(BATTLE_CARD_ARR);
      */

      const PLAYER_CARD_NUM = window.sessionStorage.getItem('playCardNum');
      if (PLAYER_CARD_NUM === null || (PLAYER_CARD_NUM !== null && PLAYER_CARD_NUM === '')) {
        return errorManagement({ errCase: 'errorComn', message: 'error - refreshInit.js - playCardNum null' });
      }
      const BATTLE_CARD_NUM = window.sessionStorage.getItem('battleCardNum');
      if (BATTLE_CARD_NUM === null || (BATTLE_CARD_NUM !== null && BATTLE_CARD_NUM === '')) {
        return errorManagement({ errCase: 'errorComn', message: 'error - refreshInit.js - !battleCardNum' });
      }

      const P_NUM = playerNum(PLAYER_CARD_NUM);
      const E_NUM = playerNum(BATTLE_CARD_NUM);
      const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
      const encryptVal_2 = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false
      const encryptKey8 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
      const encryptVal8 = window.sessionStorage.getItem(encryptKey8);
      const encryptKey9 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]);  // coinsPlayer
      const encryptVal9 = window.sessionStorage.getItem(encryptKey9);

      if (Number(P_NUM) > Number(E_NUM) || Number(P_NUM) < Number(E_NUM)) {
        // const coinsEnemyBet = window.sessionStorage.coinsEnemyBet;
        const encryptKey1 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
        const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
        const decryptVal1_1 = encryptVal1 !== null && encryptVal1 !== '' ? dec(encryptVal1) : 0; // coinsEnemyBet value number

        // const coinsPlayerBet = window.sessionStorage.coinsPlayerBet;
        const encryptKey2 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
        const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
        const decryptVal2_1 = encryptVal2 !== null && encryptVal2 !== '' ? dec(encryptVal2) : 0; // coinsPlayerBet value number

        // const coinsEnemyBetRes = coinsEnemyBet && Number(coinsEnemyBet) > 0;
        const decryptVal1_2 = encryptVal1 !== null && encryptVal1 !== '' && Number(decryptVal1_1) > 0;

        // const coinsPlayerBetRes = coinsPlayerBet && Number(coinsPlayerBet) > 0;
        const decryptVal2_2 = encryptVal2 !== null && encryptVal2 !== '' && Number(decryptVal2_1) > 0;

        // const RESULT = Number(P_NUM) > Number(E_NUM) ? true : false;
        const RESULT =
          Number(P_NUM) > Number(E_NUM) ?
            X.enc(decodeTF(textDE([107, 102, 112, 97]))) : // "kfpa" : true
            X.enc(decodeTF(textDE([120, 113, 98, 101, 117]))); // "xqbeu" : false

        // if (coinsEnemyBetRes && coinsPlayerBetRes) {
        if (decryptVal1_2 && decryptVal2_2) {
          // const COINS_PLAYER = Number(window.sessionStorage.coinsPlayer);
          const COINS_PLAYER = dec(encryptVal9); // coinsPlayer value number
          // const COINS_ENEMY = Number(window.sessionStorage.coinsEnemy);
          const COINS_ENEMY = dec(encryptVal8); // coinsEnemy value number

          // const RES = Number(coinsEnemyBet) + Number(coinsPlayerBet);
          const RES = Number(decryptVal1_2) + Number(decryptVal2_1);

          const C_RES = X.dec(RESULT) ? COINS_PLAYER + RES : COINS_ENEMY + RES;
          // storageMethod('s', 'SET_ITEM', RESULT ? 'coinsPlayer' : 'coinsEnemy', Number(C_RES));
          storageMethod('s', 'SET_ITEM', X.dec(RESULT) ? encryptKey9 : encryptKey8, enc(Number(C_RES)));
        }

        storageMethod('s', 'SET_ITEM',
          findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]), // betUser
          X.dec(RESULT) ? encryptVal_1 : encryptVal_2
        ); // betUser
        storageMethod('s', 'SET_ITEM',
          findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]), // basicBettingState
          X.enc(decodeTF(textDE([120, 113, 98, 101, 110]))) // "xqben" : false
        );
        storageMethod('s', 'SET_ITEM',
          findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), // extFirstBet
          X.enc(decodeTF(textDE([120, 103, 98, 105, 110]))) // "xgbin" : false
        );
        storageMethod('s', 'SET_ITEM',
          encryptKey2, // coinsPlayerBet
          enc(encryptNumOfStr(textDE([119, 101, 101, 101]))) // "weee" : 0
        );
        storageMethod('s', 'SET_ITEM',
          encryptKey1, // 'coinsEnemyBet',
          enc(encryptNumOfStr(textDE([119, 119, 101, 119]))) // "wwew" : 0
        );
        storageMethod('s', 'SET_ITEM',
          findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]), // coinsPlayerExtBet
          enc(encryptNumOfStr(textDE([101, 119, 101, 101])) )// 'ewee' : 0
        );
        storageMethod('s', 'SET_ITEM',
          findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]), // coinsEnemyExtBet
          enc(encryptNumOfStr(textDE([101, 119, 101, 119])) )// 'ewew' : 0
        );
        storageMethod('s', 'SET_ITEM', 'betCoinPos', '');
        storageMethod('s', 'SET_ITEM', 'battleCardNum', '');
        storageMethod('s', 'SET_ITEM', 'betCoin', '');

        GET_ROUND_END.goNextRound(X.dec(RESULT) ? 'win' : 'lose');
      } else if (Number(P_NUM) === Number(E_NUM)) {
        // storageMethod('s', 'REMOVE_ITEM', 'drewReady');
        storageMethod('s', 'SET_ITEM', 'roundEndReload', true);
        storageMethod('s', 'SET_ITEM',
          findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]), // drewReady
          X.enc(decodeTF(textDE([99, 119, 114, 117]))) // "cwru" : true
        );
        storageMethod('s', 'SET_ITEM',
          findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]), // betUser
          booleanCheck([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]) // betUserFirst, true or false
        ); // betUser, betUserFirst
        storageMethod('s', 'SET_ITEM',
          findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]), // drewState
          X.enc(decodeTF(textDE([107, 119, 104, 110]))) // "kwhn" : true
        );
        storageMethod('s', 'SET_ITEM',
          findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]), // roundEnd
          X.enc(decodeTF(textDE([120, 113, 108, 101, 97]))) // "xqlea" : false
        );
        storageMethod('s', 'SET_ITEM',
          findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), // extFirstBet
          X.enc(decodeTF(textDE([106, 111, 98, 116, 117]))) // "jobtu" : false
        );
        storageMethod('s', 'SET_ITEM', 'battleCardNum', '');

        request('drewRefresh', true);

        // GET_ROUND_END.goNextRound("drew");
      }
    } else {
      const DREW_FLIP_CARD_MODE = window.sessionStorage.drewFlipCardMode;
      if (DREW_FLIP_CARD_MODE && DREW_FLIP_CARD_MODE === 'true') {
        // refreshDrawDrew();
        refreshDrewFlipCard();
      }
    }
  },
};
