import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import { deobfuscateInt32 as d } from '@/client/js/module/crypts/encryptNumber';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { comnText } from '@/client/js/functions/language';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import EnemyBlockMoveBattingZone from '@/client/js/views/game/indianPocker/fns/common/EnemyBlockMoveBattingZone';
import saveBetCoinSession from '@/client/js/views/game/indianPocker/fns/common/saveBetCoinSession';
import betUserCheck from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/betUserCheck';

export const GET_BETTING = {
  sessionExtraBet: (_data) => {
    const PROMISE = new Promise(function (resolve, reject) {
      resolve(_data);
    });
    PROMISE
      .then((_data) => {
        // storageMethod('s', 'SET_ITEM', 'betUser', Boolean(_data.bet));
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

        GET_BETTING.drawExtEnemyBet(_data);
      })
      .catch((error) => {
        console.log('error GET_BETTING.sessionExtraBet');
        errorManagement({ errCase: 'errorComn' });
      });
  },
  drawExtEnemyBet: (_data) => {
    console.log('firstExtBet >>>>>>>>>>>>> ', _data);
    EnemyBlockMoveBattingZone().then(() => {
      GET_BETTING.sessionExtBetCoinPos(_data);
    });
  },
  sessionExtBetCoinPos: (_data) => {
    // const ENEMY_POS = window.sessionStorage.betCoin;
    // if (!ENEMY_POS) return;
    // const BET_COIN_LIST = JSON.parse(window.sessionStorage.betCoin);
    const encryptKey2 = findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]); // betCoin
    const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);
    if (encryptVal2 === null) return;
    const BET_COIN_LIST = JSON.parse(encryptVal2);
    if (!BET_COIN_LIST || BET_COIN_LIST.length <= 0) return;

    // const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet;
    const encryptKey1 = findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]); // coinsEnemyExtBet
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const decryptVal1 = encryptVal1 !== null && encryptVal1 !== '' ? dec(encryptVal1) : 0; // coinsEnemyExtBet value number

    // const NUMS = Number(COINS_ENEMY_EXT_BET) || 0;
    const NUMS = Number(decryptVal1);

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
    setTimeout(GET_BETTING.removeExtEnemyCoins, timeInterval_1, _data);
  },
  removeExtEnemyCoins: (_data) => {
    const COINS_ENEMY = document.querySelector('.coins-enemy');
    if (!COINS_ENEMY) return;
    const ENEMY_COINS = COINS_ENEMY.querySelectorAll('li');
    if (ENEMY_COINS && ENEMY_COINS.length > 0) {
      for (let i = 0; i < ENEMY_COINS.length; i++) {
        ENEMY_COINS[i].remove();
      }
    }
    setTimeout(GET_BETTING.redrawCoinsEnemy, timeInterval_1, _data);
  },
  redrawCoinsEnemy: (_data) => {
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
    for (let i = 0; i < decryptVal1; i++) {
      liEl = document.createElement('li');
      minuteEl = document.createElement('span');
      hourEl = document.createElement('span');
      minuteEl.classList.add('m');
      hourEl.classList.add('h');
      liEl.appendChild(minuteEl);
      liEl.appendChild(hourEl);
      COINS_ENEMY_EL.appendChild(liEl);
    }
    setTimeout(GET_BETTING.removeCoinsEnemyBet, timeInterval_1, _data);
  },
  removeCoinsEnemyBet: (_data) => {
    const BET_COINS = document.querySelector('.bet-coins');
    if (!BET_COINS) return;
    const COINS = BET_COINS.querySelectorAll('li');
    if (COINS && COINS.length > 0) {
      for (let i = 0; i < COINS.length; i++) {
        COINS[i].remove();
      }
    }
    setTimeout(GET_BETTING.redrawCoinsEnemyBet, timeInterval_1, _data);
  },
  redrawCoinsEnemyBet: (_data) => {
    const BET_COINS = document.querySelector('.bet-coins');
    if (!BET_COINS) return;
    // const BET_COIN_POS = window.sessionStorage.betCoinPos;
    // if (!BET_COIN_POS) return;

    const BET_COIN_POS_KEY = findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]); // betCoinPos
    const BET_COIN_POS = storageMethod("s", "GET_ITEM", BET_COIN_POS_KEY);
    if (BET_COIN_POS === null) return;

    const POS_ARR = JSON.parse(BET_COIN_POS);
    if (!POS_ARR || POS_ARR.length <= 0) return;

    const K = [
      findCharCode([66, 85, 87, 74, 79, 90, 86, 83, 72, 88]), // betCoinPos : host
      findCharCode([85, 75, 72, 69, 71, 66, 74, 81, 87, 84]), // betCoinPos : translateX
      findCharCode([80, 67, 90, 85, 82, 71, 70, 66, 84, 74]), // betCoinPos : translateY
    ];
    const KS = [
      findCharCode([89, 68, 86, 69, 84, 66, 77, 87, 65, 90]), // betCoinPos : host : enemy
    ];

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
      // if (POS_ARR[i].host === 'enemy') liEl.classList.add('e');
      if (POS_ARR[i][K[0]] === KS[0]) // host === enemy
        liEl.classList.add('e');
      // liEl.style.transform = 'translate(' + POS_ARR[i].translateX + 'px, ' + POS_ARR[i].translateY + 'px)';
      const TX = d(POS_ARR[i][K[1]]); // translateX
      const TY = d(POS_ARR[i][K[2]]); // translateY
      liEl.style.transform = 'translate(' + TX + 'px, ' + TY + 'px)';
      BET_COINS.appendChild(liEl);
    }

    if (_data.state === comnText.call) {
    } else {
      setTimeout(betUserCheck, timeInterval_1);
    }
  },
};
