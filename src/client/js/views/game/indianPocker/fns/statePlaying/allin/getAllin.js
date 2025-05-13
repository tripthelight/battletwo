import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1, timeInterval_1001 } from '@/client/js/functions/variable.js';
import { errorManagement } from '@/client/js/module/errorManagement';
import EnemyBlockMoveBattingZone from '@/client/js/views/game/indianPocker/fns/common/EnemyBlockMoveBattingZone.js';
import { RULES } from '@/client/js/views/game/indianPocker/fns/rule/rules.js';
import pcDraggableCheck from '@/client/js/views/game/indianPocker/fns/common/pcDraggableCheck.js';
import moveCoins from '@/client/js/views/game/indianPocker/fns/common/moveCoins.js';
import subtractMoveCoin from '@/client/js/views/game/indianPocker/fns/common/subtractMoveCoin.js';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState.js';

export const GET_ALLIN = {
  receiveAllinBet: (_data) => {
    storageMethod('s', 'SET_ITEM', 'betUser', true);
    storageMethod('s', 'SET_ITEM', 'extFirstBet', true);
    storageMethod('s', 'SET_ITEM', 'coinsEnemy', _data.coinCount);
    storageMethod('s', 'SET_ITEM', 'coinsEnemyBet', _data.coinBet);
    storageMethod('s', 'SET_ITEM', 'coinsEnemyExtBet', _data.extBet);
    storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', 0);
    // all in text
    GET_ALLIN.roundResultDisplay();
    // emeny coins animation
    setTimeout(() => {
      EnemyBlockMoveBattingZone('allin').then(() => {
        const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet;
        const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet;
        if (Number(COINS_ENEMY_BET) === Number(COINS_PLAYER_BET)) {
          // PLAYER 올인을 받고 ENEMY 올인 함
          RULES.CALL();
        } else {
          // 상대의 올인을 받고 상대 코인 시간 stop 하고, 내 코인시간 start 해야 됨
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
      });
    }, timeInterval_1);
  },
  roundResultDisplay: () => {
    const BETTING_ZONE = document.querySelector('.betting-zone');
    if (!BETTING_ZONE) return errorManagement({ errCase: 'errorComn', message: 'fold 에서 .betting-zone 엘리먼트가 없습니다.' });
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
