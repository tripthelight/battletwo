import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import _t from '@/client/js/module/crypts/textDE';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import {GRS} from '@/client/js/module/crypts/generateRandomString';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import pcDraggableCheck from '@/client/js/views/game/indianPocker/fns/common/pcDraggableCheck.js';
import disabledMoveCoins from '@/client/js/views/game/indianPocker/fns/common/disabledMoveCoins.js';
import drewCheckInfo from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drewCheckInfo.js';

export default () => {
  // const DREW_CHECK = window.sessionStorage.drewState;
  // if (!DREW_CHECK || DREW_CHECK !== 'true') return;
  const encryptKey1 = findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]); // drewState
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  // drewState === true
  if (encryptVal1 !== null && encryptVal1 !== '' && X.dec(encryptVal1)) return;

  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!PLAYER_BLOCK) return errorManagement({ errCase: 'elementLoss', message: 'drew 상태에서 .player-block 엘리먼트가 없습니다 11' });
  const PLAYER_CARD = PLAYER_BLOCK.querySelector('.player-card');
  if (!PLAYER_CARD) return errorManagement({ errCase: 'elementLoss', message: 'drew 상태에서 .player-card 엘리먼트가 없습니다 11' });
  const ENEMY_CARD = document.querySelector('.enemy-card');
  if (!ENEMY_CARD) return errorManagement({ errCase: 'elementLoss', message: 'drew 상태에서 .enemy-card 엘리먼트가 없습니다' });

  // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
  // if (COINS_ENEMY === undefined || COINS_ENEMY === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'drew 상태에서 coinsEnemy 세션이 없습니다' });
  const encryptKey2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  if (encryptVal2 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'drew 상태에서 coinsEnemy 세션이 없습니다' });
  const decryptVal2 = dec(encryptVal2); // coinsEnemy value number

  // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  // if (COINS_PLAYER === undefined || COINS_PLAYER === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'drew 상태에서 coinsPlayer 세션이 없습니다' });
  const encryptKey3 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
  const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
  if (encryptVal3 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'drew 상태에서 coinsPlayer 세션이 없습니다' });
  const decryptVal3 = dec(encryptVal3); // coinsPlayer value number

  // const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet;
  // if (COINS_ENEMY_EXT_BET === undefined || COINS_PLAYER === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'drew 상태에서 coinsEnemyExtBet 세션이 없습니다' });
  const encryptKey4 = findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]); // coinsEnemyExtBet
  const encryptVal4 = window.sessionStorage.getItem(encryptKey4);
  if (encryptVal4 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'drew 상태에서 coinsEnemyExtBet 세션이 없습니다' });
  const decryptVal4 = encryptVal4 !== "" ? dec(encryptVal4) : ""; // coinsEnemyExtBet value number

  // const BET_USER = window.sessionStorage.betUser;
  // if (!BET_USER) return errorManagement({ errCase: 'sessionStorageLoss', message: 'drew 상태에서 betUser 세션이 없습니다' });
  // const BET_USER_FIRST = window.sessionStorage.betUserFirst;
  // if (!BET_USER_FIRST) return errorManagement({ errCase: 'sessionStorageLoss', message: 'drew 상태에서 betUserFirst 세션이 없습니다' });

  // const BET_USER_RES = BET_USER === 'true' ? true : BET_USER === 'false' ? false : errorManagement({ errCase: 'sessionStorageLoss', message: 'betUser 세션이 true나 false가 아닙니다' });
  // const decryptVal_1 = booleanReturn([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser - true or false or error
  // if (decryptVal_1 === '')  return errorManagement({ errCase: 'sessionStorageLoss', message: '코인 1 체크 중 betUser 세션이 없습니다.' });
  const encryptKey5 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
  const encryptVal5 = storageMethod("s", "GET_ITEM", encryptKey5);
  if (!encryptVal5) throw throwObj("sessionStorageLoss", "drewCheck - betUser not found");
  const decryptVal_1 = X.dec(encryptVal5); // betUser - true or false

  // const BET_USER_FIRST_RES = BET_USER_FIRST === 'true' ? true : BET_USER_FIRST === 'false' ? false : errorManagement({ errCase: 'sessionStorageLoss', message: 'betUserFirst 세션이 true나 false가 아닙니다' });
  // const decryptVal_2 = booleanReturn([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst - true or false or error
  // if (decryptVal_2 === '') return errorManagement({ errCase: 'sessionStorageLoss', message: 'betUserFirst 세션이 true나 false가 아닙니다' });
  const encryptKey6 = findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst
  const encryptVal6 = storageMethod("s", "GET_ITEM", encryptKey6);
  if (!encryptVal6) throw throwObj("sessionStorageLoss", "drewCheck - betUserFirst not found");
  const decryptVal_2 = X.dec(encryptVal6); // betUserFirst - true or false

  // if (BET_USER_FIRST_RES && !BET_USER_RES) return;
  // if (!BET_USER_FIRST_RES && BET_USER_RES) return;
  if (decryptVal_2 && !decryptVal_1) return;
  if (!decryptVal_2 && decryptVal_1) return;
  // playing 상태에서 BETTING을 받으면 여기 안탐
  // 기본배팅 이후 playing으로 넘어오면 두 PEER다 여기로 옴

  const compairCoins = encryptNumOfStr(GRS([_t([101]), _t([119])],parseInt(_t([52])))); // ex) "ewew" : 0

  // if (Number(COINS_ENEMY_EXT_BET) === 0 && (Number(COINS_ENEMY) === 0 || Number(COINS_PLAYER) === 0)) {
  if (
    // coinsEnemyExtBet === 0
    decryptVal4 === compairCoins &&
    (
      // coinsEnemy === 0
      decryptVal2 === compairCoins ||
      // coinsPlayer === 0
      decryptVal3 === compairCoins
    )
  ) {
    // storageMethod('s', 'SET_ITEM', 'drewFlipCardMode', true);
    storageMethod(
      's',
      'SET_ITEM',
      findCharCode([79, 76, 88, 84, 75, 65, 77, 73, 72, 86]), // drewFlipCardMode
      X.enc(decodeTF(_t([115, 119, 114, 97]))) // "swra" : true
    );
    ENEMY_CARD.classList.add('disabled');
    PLAYER_BLOCK.classList.remove('disabled');
    PLAYER_CARD.classList.add('drew-wait-card');
    const BOTTOM_BUTTONS = PLAYER_BLOCK.querySelector('.bottom-buttons');
    if (BOTTOM_BUTTONS) BOTTOM_BUTTONS.remove();
    const COINS_PLAYER_EL = PLAYER_BLOCK.querySelector('.coins-player');
    if (COINS_PLAYER_EL) {
      COINS_PLAYER_EL.classList.remove('active');
      COINS_PLAYER_EL.classList.add('disabled');
      if (COINS_PLAYER_EL.childNodes && COINS_PLAYER_EL.childNodes.length > 0)
        [...COINS_PLAYER_EL.childNodes].map((item) => {
          item.style.removeProperty('animation-delay');
          return item;
        });

      pcDraggableCheck('coins-player', false);
      disabledMoveCoins()
    }
    drewCheckInfo();
  }
};
