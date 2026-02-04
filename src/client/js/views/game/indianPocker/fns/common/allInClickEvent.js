import findCharCode from '@/client/js/functions/findCharCode';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import storageMethod from '@/client/js/module/storage/storageMethod';
import INDIANPOCKER_RULES from '@/client/js/views/game/indianPocker/fns/rules/rules';
import PlayerBlockMoveBattingZone from '@/client/js/views/game/indianPocker/fns/common/PlayerBlockMoveBattingZone.js';
import BattingZoneMovePlayerBlock from '@/client/js/views/game/indianPocker/fns/common/BattingZoneMovePlayerBlock.js';
import BettingZoneMoveAllin from '@/client/js/views/game/indianPocker/fns/common/BettingZoneMoveAllin.js';
import BattingZoneMoveAllinTime from '@/client/js/views/game/indianPocker/fns/common/BattingZoneMoveAllinTime';
// import { RULES } from '@/client/js/views/game/indianPocker/fns/rule/rules.js';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState';
import SOCKET_EVENT from '@/client/js/network/indianPocker/batting/battingEvent';

export default () => {
  // const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet;
  // const AI_CEEB = COINS_ENEMY_EXT_BET && Number(COINS_ENEMY_EXT_BET) > 0 ? Number(COINS_ENEMY_EXT_BET) : 0;

  // const encryptKey4 = findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]);  // coinsEnemyExtBet
  // const encryptVal4 = window.sessionStorage.getItem(encryptKey4);
  // const decryptVal4 = encryptVal4 !== null && encryptVal4 !== '' ? dec(encryptVal4) : 0; // coinsEnemyExtBet value number
  // const AI_CEEB = encryptVal4 !== null && encryptVal4 !== '' && Number(decryptVal4) > 0 ? Number(decryptVal4) : 0;

  let resSend = INDIANPOCKER_RULES.ALLIN().RES_SEND; // 상대가 받는 올인 개수
  let resDelete = INDIANPOCKER_RULES.ALLIN().RES_DELETE; // 배팅존에서 빼야하는 내 코인 개수
  let res = INDIANPOCKER_RULES.ALLIN().RES; // 내가 올일 할 수 있는 개수

  PlayerBlockMoveBattingZone(res, resSend, resDelete).then((_resultCoins) => {
    // console.log("PLAYER의 올인 모션 끝 :: ", _resultCoins);
    BattingZoneMovePlayerBlock(_resultCoins).then((_aiCoins) => {
      BettingZoneMoveAllin(_aiCoins).then((_aiCoinsRes) => {
        BattingZoneMoveAllinTime(_aiCoinsRes).then((_aiCoinsRes) => {
          const encryptKey1 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]);  // coinsPlayer
          const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
          const decryptVal1 = dec(encryptVal1); // coinsPlayer value number

          // const COINS_PLAYER_RES = window.sessionStorage.coinsPlayer;
          // const CP_RES = Number(COINS_PLAYER_RES) - _aiCoinsRes.ep + _aiCoinsRes.rc;
          const CP_RES = Number(decryptVal1) - _aiCoinsRes.ep + _aiCoinsRes.rc;

          // const COINS_PLAYER_BET_RES = window.sessionStorage.coinsPlayerBet;
          const encryptKey2 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]);  // coinsPlayerBet
          const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
          const decryptVal2_1 = encryptVal2 !== null && encryptVal2 !== '' ? dec(encryptVal2) : 0; // coinsPlayerBet value number

          // const CPB_RES = COINS_PLAYER_BET_RES && Number(COINS_PLAYER_BET_RES) > 0 ? Number(COINS_PLAYER_BET_RES) : 0;
          const CPB_RES = encryptVal2 !== null && encryptVal2 !== '' && Number(decryptVal2_1) > 0 ? Number(decryptVal2_1) : 0;

          // storageMethod('s', 'SET_ITEM', 'coinsPlayer', Number(CP_RES));
          storageMethod('s', 'SET_ITEM', encryptKey1, enc(Number(CP_RES))); // coinsPlayer

          const decryptVal2_2 = Number(CPB_RES) + _aiCoinsRes.ep - _aiCoinsRes.rc;
          // storageMethod('s', 'SET_ITEM', 'coinsPlayerBet', Number(CPB_RES) + _aiCoinsRes.ep - _aiCoinsRes.rc);
          storageMethod('s', 'SET_ITEM', encryptKey2, enc(decryptVal2_2)); // coinsPlayerBet

          // storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', _aiCoinsRes.epeb);
          storageMethod('s', 'SET_ITEM',
            findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]), // coinsPlayerExtBet
            enc(_aiCoinsRes.epeb)
          );

          const encryptKey3 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]);  // coinsEnemyBet
          const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
          const decryptVal3_1 = dec(encryptVal3); // coinsEnemyBet value number

          // if (Number(window.sessionStorage.coinsPlayerBet) === Number(window.sessionStorage.coinsEnemyBet)) {
          // coinsPlayerBet === coinsEnemyBet
          if (Number(decryptVal2_2) === Number(decryptVal3_1)) {
            // ENEMY 올인을 받고, PLAYER도 올인
            // RULES.CALL();
            BTN_STATE.HANDLER('call');
          } else {
            // PLAYER의 첫 올인
            SOCKET_EVENT.SET.ALL_IN();
          }
        });
      });
    });
  });
};
