import findCharCode from '@/client/js/functions/findCharCode';
import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import { dec } from '@/client/js/module/crypts/obf8lower';
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
      const encryptKey5 = findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]); // roundEnd
      const encryptKey6 = findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]); // extFirstBet
      const encryptKey7 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
      const encryptVal7 = booleanCheck([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst
      const encryptKey8 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
      const encryptVal8 = window.sessionStorage.getItem(encryptKey8);

      if (Number(P_NUM) > Number(E_NUM) || Number(P_NUM) < Number(E_NUM)) {
        const coinsEnemyBet = window.sessionStorage.coinsEnemyBet;
        const coinsPlayerBet = window.sessionStorage.coinsPlayerBet;
        const coinsEnemyBetRes = coinsEnemyBet && Number(coinsEnemyBet) > 0;
        const coinsPlayerBetRes = coinsPlayerBet && Number(coinsPlayerBet) > 0;
        const RESULT = Number(P_NUM) > Number(E_NUM) ? true : false;

        if (coinsEnemyBetRes && coinsPlayerBetRes) {
          const COINS_PLAYER = Number(window.sessionStorage.coinsPlayer);
          // const COINS_ENEMY = Number(window.sessionStorage.coinsEnemy);
          const COINS_ENEMY = dec(encryptVal8); // coinsEnemy value number
          const RES = Number(coinsEnemyBet) + Number(coinsPlayerBet);
          const C_RES = RESULT ? COINS_PLAYER + RES : COINS_ENEMY + RES;
          // storageMethod('s', 'SET_ITEM', RESULT ? 'coinsPlayer' : 'coinsEnemy', Number(C_RES));
          storageMethod('s', 'SET_ITEM', RESULT ? 'coinsPlayer' : encryptKey8, Number(C_RES));
        }

        storageMethod('s', 'SET_ITEM', encryptKey7, RESULT); // betUser
        storageMethod('s', 'SET_ITEM', 'basicBettingState', false);
        storageMethod('s', 'SET_ITEM', encryptKey6, encryptVal_2); // extFirstBet, false
        storageMethod('s', 'SET_ITEM', 'coinsPlayerBet', 0);
        storageMethod('s', 'SET_ITEM', 'coinsEnemyBet', 0);
        storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', 0);
        storageMethod('s', 'SET_ITEM', 'coinsEnemyBet', 0);
        storageMethod('s', 'SET_ITEM', 'betCoinPos', '');
        storageMethod('s', 'SET_ITEM', 'battleCardNum', '');
        storageMethod('s', 'SET_ITEM', 'betCoin', '');

        GET_ROUND_END.goNextRound(RESULT ? 'win' : 'lose');
      } else if (Number(P_NUM) === Number(E_NUM)) {
        // storageMethod('s', 'REMOVE_ITEM', 'drewReady');
        storageMethod('s', 'SET_ITEM', 'roundEndReload', true);
        storageMethod('s', 'SET_ITEM', 'drewReady', true);
        storageMethod('s', 'SET_ITEM', encryptKey7, encryptVal7); // betUser, betUserFirst
        storageMethod('s', 'SET_ITEM', 'drewState', true);
        storageMethod('s', 'SET_ITEM', encryptKey5, encryptVal_2);
        storageMethod('s', 'SET_ITEM', encryptKey6, encryptVal_2);
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
