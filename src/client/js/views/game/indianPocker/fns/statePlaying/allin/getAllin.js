import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1, timeInterval_1001 } from '@/client/js/functions/variable.js';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState';
import { RULES } from '@/client/js/views/game/indianPocker/fns/rule/rules.js';
import pcDraggableCheck from '@/client/js/views/game/indianPocker/fns/common/pcDraggableCheck.js';
import moveCoins from '@/client/js/views/game/indianPocker/fns/common/moveCoins.js';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import EnemyBlockMoveBattingZone from '@/client/js/views/game/indianPocker/fns/common/EnemyBlockMoveBattingZone.js';
import subtractMoveCoin from '@/client/js/views/game/indianPocker/fns/common/subtractMoveCoin.js';

export const GET_ALLIN = {
  receiveAllinBet: (_data) => {
    storageMethod('s', 'SET_ITEM',
      findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]), // betUser
      X.enc(decodeTF(_t([115, 119, 104, 117]))) // "swhu" : true
    );
    storageMethod('s', 'SET_ITEM',
      findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), // extFirstBet
      X.enc(decodeTF(_t([99, 119, 112, 110]))) // "cwpn" : true
    );
    storageMethod('s', 'SET_ITEM',
      findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]), // coinsEnemy
      enc(_data.coinCount) // enc의 인자는 number나 string 가능
    );
    storageMethod('s', 'SET_ITEM',
      findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]), // coinsEnemyBet
      enc(_data.coinBet) // X.enc의 인자는 string
    );
    storageMethod('s', 'SET_ITEM',
      findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]), // coinsEnemyExtBet
      enc(_data.extBet)
    );
    storageMethod('s', 'SET_ITEM',
      findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]), // coinsPlayerExtBet
      enc(encryptNumOfStr(_t([101, 101, 119, 101]))) // 'eewe' : 0000
    );
    // all in text
    GET_ALLIN.roundResultDisplay();
    // emeny coins animation
    setTimeout(() => {
      EnemyBlockMoveBattingZone('allin').then(() => {
        // const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet;
        const encryptKey7 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
        const encryptVal7 = window.sessionStorage.getItem(encryptKey7);
        const decryptVal7 = dec(encryptVal7); // coinsEnemyBet value number

        // const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet;
        const encryptKey8 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
        const encryptVal8 = window.sessionStorage.getItem(encryptKey8);
        const decryptVal8 = dec(encryptVal8); // coinsPlayerBet value number

        // if (Number(COINS_ENEMY_BET) === Number(COINS_PLAYER_BET)) {
        // coinsEnemyBet === coinsPlayerBet
        if (Number(decryptVal7) === Number(decryptVal8)) {
          // PLAYER 올인을 받고 ENEMY 올인 함
          // RULES.CALL();
          BTN_STATE.HANDLER('call');
        } else {
          // 상대의 첫 올인을 받음
          const COINS_ENEMY = document.querySelector('.coins-enemy');
          COINS_ENEMY.classList.remove('active');
          const ENEMY_CARD = document.querySelector('.enemy-card');
          ENEMY_CARD.classList.add('disabled');
          const BETTING_ZONE = document.querySelector('.betting-zone');
          BETTING_ZONE.classList.remove('disabled');
          const PLAYER_BLOCK = document.querySelector('.player-block');
          PLAYER_BLOCK.classList.remove('disabled');
          const COINS_PLAYER = document.querySelector('.coins-player');
          COINS_PLAYER.classList.remove('disabled');
          COINS_PLAYER.classList.add('active');
          pcDraggableCheck('bet-coins', true);
          pcDraggableCheck('coins-player', true);
          setTimeout(moveCoins, timeInterval_1);
          setTimeout(subtractMoveCoin, timeInterval_1);
          BTN_STATE.SHOW();
        }

        setTimeout(() => {
          /**
           * 상대의 올인을 받고 상대 코인 시간 stop 하고, 내 코인시간 start 해야 됨
           */

          // 상대가 올인한 후 상대의 코인 시간을 멈춰야 함
          const COINS_ENEMY_WRAP = document.querySelector('.coins-enemy');
          if (!COINS_ENEMY_WRAP) return;
          const COINS_ENEMY = COINS_ENEMY_WRAP.querySelectorAll('li');
          if (!COINS_ENEMY || COINS_ENEMY.length < 1) return;

          COINS_ENEMY.forEach((liElem) => {
            liElem.querySelectorAll('span.m, span.h').forEach((spanEl) => {
              spanEl.getAnimations().forEach((animation) => animation.cancel());
            });
          });

          // 상대가 올인한 후 나의 코인 시간을 가게 만들어야 함
          const COINS_PLAYER_WRAP = document.querySelector('.coins-player');
          if (!COINS_PLAYER_WRAP) return;
          const COINS_PLAYER = COINS_PLAYER_WRAP.querySelectorAll('li');
          if (!COINS_PLAYER || COINS_PLAYER.length < 1) return;

          COINS_PLAYER.forEach((liElem) => {
            const hEl = liElem.querySelector('span.h');
            const mEl = liElem.querySelector('span.m');

            if (hEl && mEl) {
              animateClock(hEl, mEl, false);
            }
          });

          // 배팅존에 있는 나의 코인 시간 start
          // 배팅존에 있는 상대 코인 시간 stop
          const BAT_COINS_WRAP = document.querySelector('.bet-coins');
          if (!BAT_COINS_WRAP) return;
          const BAT_COINS = BAT_COINS_WRAP.querySelectorAll('li');
          if (!BAT_COINS || BAT_COINS.length < 1) return;
          const PLAYER_BET_COINS = Array.from(BAT_COINS).filter((li) => !li.classList.contains('e'));
          if (!PLAYER_BET_COINS || PLAYER_BET_COINS.length < 1) return;
          const ENEMY_BET_COINS = Array.from(BAT_COINS).filter((li) => li.classList.contains('e'));
          if (!ENEMY_BET_COINS || ENEMY_BET_COINS.length < 1) return;

          // 배팅존에 있는 상대 코인 시간 stop
          ENEMY_BET_COINS.forEach((liElem) => {
            liElem.querySelectorAll('span.m, span.h').forEach((spanEl) => {
              spanEl.getAnimations().forEach((animation) => animation.cancel());
            });
          });

          // 배팅존에 있는 나의 코인 시간 start
          PLAYER_BET_COINS.forEach((liElem) => {
            const hEl = liElem.querySelector('span.h');
            const mEl = liElem.querySelector('span.m');

            if (hEl && mEl) {
              animateClock(hEl, mEl, false);
            }
          });
        }, timeInterval_1);
      });
    }, timeInterval_1);
  },
  roundResultDisplay: () => {
    const BETTING_ZONE = document.querySelector('.betting-zone');
    if (!BETTING_ZONE) return errorManagement({ errCase: 'elementLoss', message: 'fold 에서 .betting-zone 엘리먼트가 없습니다.' });
    let txtArr = ['ALL IN'];
    let resultEl = document.createElement('div');
    resultEl.classList.add('round-result');
    resultEl.innerHTML = txtArr[0];
    BETTING_ZONE.appendChild(resultEl);
    setTimeout(() => {
      resultEl.remove();
    }, timeInterval_1001);
  },
};
