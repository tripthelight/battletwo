import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import { deobfuscateInt32 as d } from '@/client/js/module/crypts/encryptNumber';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import EnemyBlockMoveBattingZone from '@/client/js/views/game/indianPocker/fns/common/EnemyBlockMoveBattingZone';
import betUserCheck from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/betUserCheck';
import saveBetCoinSession from '@/client/js/views/game/indianPocker/fns/common/saveBetCoinSession';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';

export const GET_RAISE = {
  receiveRaiseBet: (_data) => {
    storageMethod('s', 'SET_ITEM',
      findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), // extFirstBet
      X.enc(decodeTF(textDE([99, 102, 114, 117]))) // "cfru" : true
    );
    GET_RAISE.sessionRaiseBet(_data);
  },
  sessionRaiseBet: (_data) => {
    // storageMethod('s', 'SET_ITEM', 'betUser', true);
    storageMethod('s', 'SET_ITEM',
      findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]), // betUser
      findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]) // true
    );
    storageMethod('s', 'SET_ITEM',
      findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]), // coinsEnemy
      enc(_data.coinCount)
    );
    storageMethod('s', 'SET_ITEM',
      findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]), // coinsEnemyBet
      enc(_data.coinBet)
    );
    storageMethod('s', 'SET_ITEM',
      findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]), // coinsEnemyExtBet
      enc(_data.extBet)
    );

    GET_RAISE.drawRaiseEnemyBet(_data);
  },
  drawRaiseEnemyBet: (_data) => {
    EnemyBlockMoveBattingZone().then(() => {
      GET_RAISE.sessionRaiseBetCoinPos(_data);
    });
  },
  sessionRaiseBetCoinPos: (_data) => {
    // const ENEMY_POS = window.sessionStorage.betCoin;
    // if (!ENEMY_POS) return;
    // const BET_COIN_LIST = JSON.parse(window.sessionStorage.betCoin);
    const encryptKey3 = findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]); // betCoin
    const encryptVal3 = storageMethod("s", "GET_ITEM", encryptKey3);
    if (encryptVal3 === null) return;
    const BET_COIN_LIST = JSON.parse(encryptVal3);
    if (!BET_COIN_LIST || BET_COIN_LIST.length <= 0) return;

    // const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet;
    const encryptKey2 = findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]); // coinsEnemyExtBet
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
    const decryptVal2 = encryptVal2 !== null && encryptVal2 !== '' ? dec(encryptVal2) : 0; // coinsEnemyExtBet value number

    // const NUMS = Number(COINS_ENEMY_EXT_BET) || 0;
    const NUMS = Number(decryptVal2);

    const COINS_ENEMY = document.querySelector('.coins-enemy');
    if (!COINS_ENEMY) return;

    const K = [
      findCharCode([81, 80, 74, 86, 71, 77, 69, 90, 73, 79]), // translateX
      findCharCode([76, 80, 65, 82, 87, 69, 78, 74, 83, 90]), // translateY
      findCharCode([67, 69, 82, 79, 83, 88, 77, 84, 80, 75]), // offsetLeft
    ];

    const COINS = COINS_ENEMY.querySelectorAll('li');
    const COINS_WIDTH = COINS && COINS.length > 0 ? COINS[0].clientWidth : 0;
    const COINS_HEIGHT = COINS && COINS.length > 0 ? COINS[0].clientHeight : 0;
    let x = 0;
    let y = 0;
    let xRes = 0;
    for (let i = BET_COIN_LIST.length - 1; i > BET_COIN_LIST.length - 1 - NUMS; i--) {
      // xRes = BET_COIN_LIST[i].translateX < 0 ? BET_COIN_LIST[i].translateX + COINS_WIDTH : BET_COIN_LIST[i].translateX;
      const TX = d(BET_COIN_LIST[i][K[0]]);
      xRes = TX < 0 ? TX + COINS_WIDTH : TX;
      // x = BET_COIN_LIST[i].offsetLeft + xRes;
      x = d(BET_COIN_LIST[i][K[2]]) + xRes;
      // y = BET_COIN_LIST[i].translateY - COINS_ENEMY.clientHeight + COINS_HEIGHT;
      y = d(BET_COIN_LIST[i][K[1]]) - COINS_ENEMY.clientHeight + COINS_HEIGHT;
      saveBetCoinSession('enemy', x, y);
    }
    // enemy coins 모두 제거
    setTimeout(GET_RAISE.removeRaiseEnemyCoins, timeInterval_1, _data);
  },
  removeRaiseEnemyCoins: (_data) => {
    const COINS_ENEMY = document.querySelector('.coins-enemy');
    if (!COINS_ENEMY) return;
    const ENEMY_COINS = COINS_ENEMY.querySelectorAll('li');
    if (ENEMY_COINS && ENEMY_COINS.length > 0) {
      for (let i = 0; i < ENEMY_COINS.length; i++) {
        ENEMY_COINS[i].remove();
      }
    }
    setTimeout(GET_RAISE.redrawCoinsRaiseEnemy, timeInterval_1, _data);
  },
  redrawCoinsRaiseEnemy: (_data) => {
    // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    // const COINS_ENEMY_NUM = Number(COINS_ENEMY) || 0;
    const encryptKey1 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const decryptVal1 = encryptVal1 ? dec(encryptVal1) : 0; // coinsEnemy value number

    const COINS_ENEMY_EL = document.querySelector('.coins-enemy');
    if (!COINS_ENEMY_EL) return;
    let liEl = new Object();
    let minuteEl = new Object();
    let hourEl = new Object();
    // for (let i = 0; i < COINS_ENEMY_NUM; i++) {
    for (let i = 0; i < Number(decryptVal1); i++) {
      liEl = document.createElement('li');
      minuteEl = document.createElement('span');
      hourEl = document.createElement('span');
      minuteEl.classList.add('m');
      hourEl.classList.add('h');
      liEl.appendChild(minuteEl);
      liEl.appendChild(hourEl);
      posClock(hourEl, minuteEl, false);
      COINS_ENEMY_EL.appendChild(liEl);
    }
    setTimeout(GET_RAISE.removeCoinsRaiseEnemyBet, timeInterval_1, _data);
  },
  removeCoinsRaiseEnemyBet: (_data) => {
    const BET_COINS = document.querySelector('.bet-coins');
    if (!BET_COINS) return;
    const COINS = BET_COINS.querySelectorAll('li');
    if (COINS && COINS.length > 0) {
      for (let i = 0; i < COINS.length; i++) {
        COINS[i].remove();
      }
    }
    setTimeout(GET_RAISE.redrawCoinsRaiseEnemyBet, timeInterval_1, _data);
  },
  redrawCoinsRaiseEnemyBet: (_data) => {
    const BET_COINS = document.querySelector('.bet-coins');
    if (!BET_COINS) return;

    // const BET_COIN_POS = window.sessionStorage.betCoinPos;
    // if (!BET_COIN_POS) return;

    const BET_COIN_POS_KEY = findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]); // betCoinPos
    const BET_COIN_POS = storageMethod("s", "GET_ITEM", BET_COIN_POS_KEY);
    if (BET_COIN_POS === null) return;

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
      if (POS_ARR[i].host === 'enemy') {
        liEl.classList.add('e');
        posClock(hourEl, minuteEl, false);
      } else {
        animateClock(hourEl, minuteEl);
      }
      liEl.style.transform = 'translate(' + POS_ARR[i].translateX + 'px, ' + POS_ARR[i].translateY + 'px)';
      BET_COINS.appendChild(liEl);
    }
    setTimeout(betUserCheck, timeInterval_1);
  },
};
