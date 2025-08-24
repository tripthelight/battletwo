import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import booleanReturn from '@/client/js/functions/validation/booleanReturn';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import BattingZoneMovePlayerBlock from '@/client/js/views/game/indianPocker/fns/common/BattingZoneMovePlayerBlock.js';
import BattingZoneMoveEnemyBlock from '@/client/js/views/game/indianPocker/fns/common/BattingZoneMoveEnemyBlock.js';
import BettingZoneMoveComn from '@/client/js/views/game/indianPocker/fns/common/BettingZoneMoveComn.js';
import removeCardElemComn from '@/client/js/views/game/indianPocker/fns/common/removeCardElemComn.js';

export default () => {
  return new Promise((resolve, reject) => {
    // const BET_USER = window.sessionStorage.betUser;
    // if (!BET_USER) return errorManagement({ errCase: 'sessionStorageLoss', message: '코인 1 체크 중 betUser 세션이 없습니다.' });
    // const BET_USER_RES = BET_USER === 'true' ? true : BET_USER === 'false' ? false : errorManagement({ errCase: 'sessionStorageLoss', message: 'betUser 세션이 true나 false가 아닙니다' });
    const BET_USER_RES = booleanReturn([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser - true or false or error
    if (BET_USER_RES === '')  return errorManagement({ errCase: 'sessionStorageLoss', message: '코인 1 체크 중 betUser 세션이 없습니다.' });

    const BOTTOM_BUTTONS = document.querySelector('.bottom-buttons');
    const ENEMY_CARD = document.querySelector('.enemy-card');
    if (!ENEMY_CARD) return errorManagement({ errCase: 'elementLoss', message: '코인 1 체크 중 .enemy-card 엘리먼트가 없습니다.' });
    const PLAYER_CARD = document.querySelector('.player-card');
    if (!PLAYER_CARD) return errorManagement({ errCase: 'elementLoss', message: '코인 1 체크 중 .player-card 엘리먼트가 없습니다.' });

    // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    // if (!COINS_ENEMY) return errorManagement({ errCase: 'sessionStorageLoss', message: '코인 1 체크 중 coinsEnemy 세션이 없습니다.' });
    const encryptKey2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
    if (encryptVal2 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: '코인 1 체크 중 coinsEnemy 세션이 없습니다.' });
    const decryptVel2 = dec(encryptVal2); // coinsEnemy value number

    // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
    // if (!COINS_PLAYER) return errorManagement({ errCase: 'sessionStorageLoss', message: '코인 1 체크 중 coinsPlayer 세션이 없습니다.' });
    const encryptKey3 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
    const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
    if (encryptVal3 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: '코인 1 체크 중 coinsPlayer 세션이 없습니다.' });
    const decryptVel3 = dec(encryptVal3); // coinsPlayer value number

    // if (Number(COINS_ENEMY) === 0) {
    if (decryptVel2 === 0) {
      BattingZoneMovePlayerBlock('win').then((_state) => {
        BettingZoneMoveComn(_state).then(() => {
          removeCardElemComn(ENEMY_CARD, PLAYER_CARD, BOTTOM_BUTTONS, BET_USER_RES).then(() => {
            const encryptKey_1 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
            const encryptVal_1 = window.sessionStorage.getItem(encryptKey_1);
            const decryptVal_1 = dec(encryptVal_1); // coinsPlayer value number

            // storageMethod('s', 'SET_ITEM', 'coinsPlayer', Number(window.sessionStorage.coinsPlayer) + 2);
            storageMethod('s', 'SET_ITEM', encryptKey3, enc(Number(decryptVal_1) + 2));

            // storageMethod('s', 'SET_ITEM', 'coinsEnemy', 0);
            storageMethod('s', 'SET_ITEM', encryptKey2, enc(encryptNumOfStr(new TextDecoder().decode(new Uint8Array([119, 101, 101, 119]))))); // 'weew' : 0
            resolve();
          });
        });
      });
    // } else if (Number(COINS_PLAYER) === 0) {
    } else if (decryptVel3 === 0) {
      BattingZoneMoveEnemyBlock('lose').then((_state) => {
        BettingZoneMoveComn(_state).then(() => {
          removeCardElemComn(ENEMY_CARD, PLAYER_CARD, BOTTOM_BUTTONS, BET_USER_RES).then(() => {
            // storageMethod('s', 'SET_ITEM', 'coinsEnemy', Number(window.sessionStorage.coinsEnemy) + 2);
            const encryptKey_2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
            const encryptVal_2 = window.sessionStorage.getItem(encryptKey_2);
            const decryptVel_2 = dec(encryptVal_2); // coinsEnemy value number
            storageMethod('s', 'SET_ITEM', encryptKey2, enc(Number(decryptVel_2) + 2));

            // storageMethod('s', 'SET_ITEM', 'coinsPlayer', 0);
            storageMethod('s', 'SET_ITEM', encryptKey3, enc(encryptNumOfStr(new TextDecoder().decode(new Uint8Array([119, 119]))))); // 'ww' : 0
            resolve();
          });
        });
      });
    }
  });
};
