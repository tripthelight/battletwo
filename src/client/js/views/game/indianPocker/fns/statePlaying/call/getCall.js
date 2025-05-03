import { timeInterval_1 } from "../../../../../js/common/variable.js";
import errorComn from "../../../common/errorComn.js";
import EnemyBlockMoveBattingZone from "../../common/EnemyBlockMoveBattingZone.js";
import posClock from "../../common/posClock.js";
import saveBetCoinSession from "../../common/saveBetCoinSession.js";
import { GET_ROUND_END } from "../roundEnd/getRoundEnd.js";

export const GET_CALL = {
  receiveCallBet: (_data) => {
    if (document.querySelector(".check-drew-info")) document.querySelector(".check-drew-info").remove();
    window.sessionStorage.setItem("extFirstBet", true);
    GET_CALL.sessionCallBet(_data);
  },
  sessionCallBet: (_data) => {
    let promise = new Promise((resolve, reject) => {
      resolve(_data);
    });
    promise
      .then((_data) => {
        window.sessionStorage.setItem("betUser", true);
        window.sessionStorage.setItem("coinsEnemy", _data.coinCount);
        window.sessionStorage.setItem("coinsEnemyBet", _data.coinBet);
        window.sessionStorage.setItem("coinsEnemyExtBet", _data.extBet);
        GET_CALL.drawCallEnemyBet(_data);
      })
      .catch((error) => {
        return errorComn(error);
      });
  },
  drawCallEnemyBet: (_data) => {
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
    const COINS_ENEMY = document.querySelector(".coins-enemy");
    if (!COINS_ENEMY) return;
    const COINS = COINS_ENEMY.querySelectorAll("li");
    const COINS_WIDTH = COINS && COINS.length > 0 ? COINS[0].clientWidth : 0;
    const COINS_HEIGHT = COINS && COINS.length > 0 ? COINS[0].clientHeight : 0;
    let x = 0;
    let y = 0;
    let xRes = 0;
    for (let i = BET_COIN_LIST.length - 1; i > BET_COIN_LIST.length - 1 - NUMS; i--) {
      xRes = BET_COIN_LIST[i].translateX < 0 ? BET_COIN_LIST[i].translateX + COINS_WIDTH : BET_COIN_LIST[i].translateX;
      x = BET_COIN_LIST[i].offsetLeft + xRes;
      y = BET_COIN_LIST[i].translateY - COINS_ENEMY.clientHeight + COINS_HEIGHT;
      saveBetCoinSession("enemy", x, y);
    }
    // enemy coins 모두 제거
    setTimeout(GET_CALL.removeCallEnemyCoins, timeInterval_1, _data);
  },
  removeCallEnemyCoins: (_data) => {
    const COINS_ENEMY = document.querySelector(".coins-enemy");
    if (!COINS_ENEMY) return;
    const ENEMY_COINS = COINS_ENEMY.querySelectorAll("li");
    if (ENEMY_COINS && ENEMY_COINS.length > 0) {
      for (let i = 0; i < ENEMY_COINS.length; i++) {
        ENEMY_COINS[i].remove();
      }
    }
    setTimeout(GET_CALL.redrawCoinsCallEnemy, timeInterval_1, _data);
  },
  redrawCoinsCallEnemy: (_data) => {
    const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    const COINS_ENEMY_NUM = Number(COINS_ENEMY) || 0;
    const COINS_ENEMY_EL = document.querySelector(".coins-enemy");
    if (!COINS_ENEMY_EL) return;
    let liEl = new Object();
    let minuteEl = new Object();
    let hourEl = new Object();
    for (let i = 0; i < COINS_ENEMY_NUM; i++) {
      liEl = document.createElement("li");
      minuteEl = document.createElement("span");
      hourEl = document.createElement("span");
      minuteEl.classList.add("m");
      hourEl.classList.add("h");
      liEl.appendChild(minuteEl);
      liEl.appendChild(hourEl);
      posClock(hourEl, minuteEl);
      COINS_ENEMY_EL.appendChild(liEl);
    }
    setTimeout(GET_CALL.removeCoinsCallEnemyBet, timeInterval_1, _data);
  },
  removeCoinsCallEnemyBet: (_data) => {
    const BET_COINS = document.querySelector(".bet-coins");
    if (!BET_COINS) return;
    const COINS = BET_COINS.querySelectorAll("li");
    if (COINS && COINS.length > 0) {
      for (let i = 0; i < COINS.length; i++) {
        COINS[i].remove();
      }
    }
    setTimeout(GET_CALL.redrawCoinsCallEnemyBet, timeInterval_1, _data);
  },
  redrawCoinsCallEnemyBet: (_data) => {
    const BET_COINS = document.querySelector(".bet-coins");
    if (!BET_COINS) return;
    const BET_COIN_POS = window.sessionStorage.betCoinPos;
    if (!BET_COIN_POS) return;
    const POS_ARR = JSON.parse(BET_COIN_POS);
    if (!POS_ARR || POS_ARR.length <= 0) return;
    let liEl = new Object();
    let minuteEl = new Object();
    let hourEl = new Object();
    for (let i = 0; i < POS_ARR.length; i++) {
      liEl = document.createElement("li");
      minuteEl = document.createElement("span");
      hourEl = document.createElement("span");
      minuteEl.classList.add("m");
      hourEl.classList.add("h");
      liEl.appendChild(minuteEl);
      liEl.appendChild(hourEl);
      posClock(hourEl, minuteEl);
      if (POS_ARR[i].host === "enemy") liEl.classList.add("e");
      liEl.style.transform = "translate(" + POS_ARR[i].translateX + "px, " + POS_ARR[i].translateY + "px)";
      BET_COINS.appendChild(liEl);
    }
    // setTimeout(roundEnd, timeInterval_1);
    setTimeout(GET_ROUND_END.receiveRoundEnd, timeInterval_1);
  },
};
