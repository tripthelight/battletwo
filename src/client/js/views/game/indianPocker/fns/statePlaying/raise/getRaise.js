import { timeInterval_1 } from '@/client/js/functions/variable';
import EnemyBlockMoveBattingZone from '@/client/js/views/game/indianPocker/fns/common/EnemyBlockMoveBattingZone';
import betUserCheck from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/betUserCheck';
import saveBetCoinSession from '@/client/js/views/game/indianPocker/fns/common/saveBetCoinSession';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';

export const GET_RAISE = {
  receiveRaiseBet: (_data) => {
    window.sessionStorage.setItem('extFirstBet', true);
    GET_RAISE.sessionRaiseBet(_data);
  },
  sessionRaiseBet: (_data) => {
    window.sessionStorage.setItem('betUser', true);
    window.sessionStorage.setItem('coinsEnemy', _data.coinCount);
    window.sessionStorage.setItem('coinsEnemyBet', _data.coinBet);
    window.sessionStorage.setItem('coinsEnemyExtBet', _data.extBet);
    GET_RAISE.drawRaiseEnemyBet(_data);
  },
  drawRaiseEnemyBet: (_data) => {
    EnemyBlockMoveBattingZone().then(() => {
      GET_RAISE.sessionRaiseBetCoinPos(_data);
    });
  },
  sessionRaiseBetCoinPos: (_data) => {
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
    const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    const COINS_ENEMY_NUM = Number(COINS_ENEMY) || 0;
    const COINS_ENEMY_EL = document.querySelector('.coins-enemy');
    if (!COINS_ENEMY_EL) return;
    let liEl = new Object();
    let minuteEl = new Object();
    let hourEl = new Object();
    for (let i = 0; i < COINS_ENEMY_NUM; i++) {
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
