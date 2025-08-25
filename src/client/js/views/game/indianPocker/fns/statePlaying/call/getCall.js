import findCharCode from '@/client/js/functions/findCharCode';
import { enc } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import EnemyBlockMoveBattingZone from '@/client/js/views/game/indianPocker/fns/common/EnemyBlockMoveBattingZone';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
import saveBetCoinSession from '@/client/js/views/game/indianPocker/fns/common/saveBetCoinSession';
import { GET_ROUND_END } from '@/client/js/views/game/indianPocker/fns/statePlaying/roundEnd/getRoundEnd';

export const GET_CALL = {
  receiveCallBet: (_data) => {
    if (document.querySelector('.check-drew-info')) document.querySelector('.check-drew-info').remove();
    storageMethod('s', 'SET_ITEM',
      findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), // extFirstBet
      X.enc(decodeTF(textDE([115, 102, 104, 97]))) // "sfha" : true
    );
    GET_CALL.sessionCallBet(_data);
  },
  sessionCallBet: (_data) => {
    const PROMISE = new Promise((resolve, reject) => {
      resolve(_data);
    });
    PROMISE
      .then((_data) => {
        const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
        const encryptKey1 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser
        const encryptKey2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]);  // coinsEnemy

        storageMethod('s', 'SET_ITEM', encryptKey1, encryptVal_1); // betUser, true
        storageMethod('s', 'SET_ITEM', encryptKey2, enc(_data.coinCount)); // coinsEnemy
        storageMethod('s', 'SET_ITEM', 'coinsEnemyBet', _data.coinBet);
        storageMethod('s', 'SET_ITEM', 'coinsEnemyExtBet', _data.extBet);
        GET_CALL.drawCallEnemyBet(_data);
      })
      .catch((error) => {
        console.log('error setCall');
        return errorManagement({ errCase: 'errorComn' });
      });
  },
  drawCallEnemyBet: (_data) => {
    console.log('call >>>>>>>>>>>>> ', _data);

    EnemyBlockMoveBattingZone().then(() => {
      GET_CALL.sessionCallCoinPos(_data);
    });
  },
  sessionCallCoinPos: (_data) => {
    const ENEMY_POS = window.sessionStorage.betCoin;
    if (!ENEMY_POS) return;
    const BET_COIN_LIST = JSON.parse(window.sessionStorage.betCoin);
    if (!BET_COIN_LIST || BET_COIN_LIST.length <= 0) return;
    const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet;
    const NUMS = Number(COINS_ENEMY_EXT_BET) || 0;
    const COINS_ENEMY = document.querySelector('.coins-enemy');
    if (!COINS_ENEMY) return;
    const COINS = COINS_ENEMY.querySelectorAll('li');
    const COINS_WIDTH = COINS && COINS.length > 0 ? COINS[0].clientWidth : 0;
    const COINS_HEIGHT = COINS && COINS.length > 0 ? COINS[0].clientHeight : 0;
    let x = 0;
    let y = 0;
    let xRes = 0;
    for (let i = BET_COIN_LIST.length - 1; i > BET_COIN_LIST.length - 1 - NUMS; i--) {
      xRes = BET_COIN_LIST[i].translateX < 0 ? BET_COIN_LIST[i].translateX + COINS_WIDTH : BET_COIN_LIST[i].translateX;
      x = BET_COIN_LIST[i].offsetLeft + xRes;
      y = BET_COIN_LIST[i].translateY - COINS_ENEMY.clientHeight + COINS_HEIGHT;
      saveBetCoinSession('enemy', x, y);
    }
    // enemy coins 모두 제거
    setTimeout(GET_CALL.removeCallEnemyCoins, timeInterval_1, _data);
  },
  removeCallEnemyCoins: (_data) => {
    const COINS_ENEMY = document.querySelector('.coins-enemy');
    if (!COINS_ENEMY) return;
    const ENEMY_COINS = COINS_ENEMY.querySelectorAll('li');
    if (ENEMY_COINS && ENEMY_COINS.length > 0) {
      for (let i = 0; i < ENEMY_COINS.length; i++) {
        ENEMY_COINS[i].remove();
      }
    }
    setTimeout(GET_CALL.redrawCoinsCallEnemy, timeInterval_1, _data);
  },
  redrawCoinsCallEnemy: (_data) => {
    // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    // const COINS_ENEMY_NUM = Number(COINS_ENEMY) || 0;
    const encryptKey2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
    const decryptVal2 = encryptVal2 ? dec(encryptVal2) : 0; // coinsEnemy value number



    const COINS_ENEMY_EL = document.querySelector('.coins-enemy');
    if (!COINS_ENEMY_EL) return;
    let liEl = new Object();
    let minuteEl = new Object();
    let hourEl = new Object();
    // for (let i = 0; i < COINS_ENEMY_NUM; i++) {
    for (let i = 0; i < Number(decryptVal2); i++) {
      liEl = document.createElement('li');
      minuteEl = document.createElement('span');
      hourEl = document.createElement('span');
      minuteEl.classList.add('m');
      hourEl.classList.add('h');
      liEl.appendChild(minuteEl);
      liEl.appendChild(hourEl);
      posClock(hourEl, minuteEl);
      COINS_ENEMY_EL.appendChild(liEl);
    }
    setTimeout(GET_CALL.removeCoinsCallEnemyBet, timeInterval_1, _data);
  },
  removeCoinsCallEnemyBet: (_data) => {
    const BET_COINS = document.querySelector('.bet-coins');
    if (!BET_COINS) return;
    const COINS = BET_COINS.querySelectorAll('li');
    if (COINS && COINS.length > 0) {
      for (let i = 0; i < COINS.length; i++) {
        COINS[i].remove();
      }
    }
    setTimeout(GET_CALL.redrawCoinsCallEnemyBet, timeInterval_1, _data);
  },
  redrawCoinsCallEnemyBet: (_data) => {
    const BET_COINS = document.querySelector('.bet-coins');
    if (!BET_COINS) return;
    const BET_COIN_POS = window.sessionStorage.betCoinPos;
    if (!BET_COIN_POS) return;
    const POS_ARR = JSON.parse(BET_COIN_POS);
    if (!POS_ARR || POS_ARR.length <= 0) return;
    let liEl = new Object();
    let minuteEl = new Object();
    let hourEl = new Object();
    for (let i = 0; i < POS_ARR.length; i++) {
      liEl = document.createElement('li');
      minuteEl = document.createElement('span');
      hourEl = document.createElement('span');
      minuteEl.classList.add('m');
      hourEl.classList.add('h');
      liEl.appendChild(minuteEl);
      liEl.appendChild(hourEl);
      posClock(hourEl, minuteEl);
      if (POS_ARR[i].host === 'enemy') liEl.classList.add('e');
      liEl.style.transform = 'translate(' + POS_ARR[i].translateX + 'px, ' + POS_ARR[i].translateY + 'px)';
      BET_COINS.appendChild(liEl);
    }
    // setTimeout(roundEnd, timeInterval_1);
    console.log('CALL GO GET_ROUND_END *****************');
    setTimeout(GET_ROUND_END.receiveRoundEnd, timeInterval_1);
  },
};
