import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import { obfuscateInt32 as o } from '@/client/js/module/crypts/encryptNumber';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { getStyle } from '@/client/js/functions/comnExport';
import { reactiveState } from '@/client/js/views/game/indianPocker/fns/common/variable';
import { timeInterval_201 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import randomNumberMinMax from '@/client/js/views/game/indianPocker/fns/common/randomNumberMinMax.js';
import getTranslateMH from '@/client/js/views/game/indianPocker/fns/common/getTranslateMH.js';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import betCoinsData from '@/client/js/views/game/indianPocker/fns/common/betCoinsData/betCoinsData';

export default (_case) => {
  const BETTING_ZONE = document.querySelector('.betting-zone');
  if (!BETTING_ZONE) return errorManagement({ errCase: 'elementLoss', message: '.enemy-block에서 .betting-zone으로 칩을 옯길 때 .betting-zone 엘리먼트가 없습니다' });
  const ENEMY_BLOCK = document.querySelector('.enemy-block');
  if (!ENEMY_BLOCK) return errorManagement({ errCase: 'elementLoss', message: '.enemy-block에서 .betting-zone으로 칩을 옯길 때 .enemy-block 엘리먼트가 없습니다' });
  const ENEMY_COIN_WRAP = ENEMY_BLOCK.querySelector('.coins-enemy');
  if (!ENEMY_COIN_WRAP) return errorManagement({ errCase: 'elementLoss', message: '.enemy-block에서 .betting-zone으로 칩을 옯길 때 .coins-enemy 엘리먼트가 없습니다' });
  const COINS = ENEMY_COIN_WRAP.querySelectorAll('li');

  // const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet;
  const encryptKey1 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  const decryptVal1 = encryptVal1 !== null && encryptVal1 !== '' ? dec(encryptVal1) : 0; // coinsEnemyBet value number

  // const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet;
  const encryptKey2 = findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]); // coinsEnemyExtBet
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  const decryptVal2 = encryptVal2 !== null && encryptVal2 !== '' ? dec(encryptVal2) : 0; // coinsEnemyExtBet value number

  // BET COIN
  const encryptKey3 = findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]); // betCoin
  const encryptKey4 = findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]); // betCoinPos

  const K = [
    // _case === allin || _case !== allin
    // betCoin
    [
      findCharCode([80, 72, 83, 88, 76, 75, 78, 84, 65, 89]), // betState
      findCharCode([88, 79, 72, 75, 71, 83, 81, 85, 82, 84]), // host
      findCharCode([77, 75, 87, 70, 82, 88, 83, 74, 89, 80]), // index
      findCharCode([81, 80, 74, 86, 71, 77, 69, 90, 73, 79]), // translateX
      findCharCode([76, 80, 65, 82, 87, 69, 78, 74, 83, 90]), // translateY
      findCharCode([67, 69, 82, 79, 83, 88, 77, 84, 80, 75]), // offsetLeft
    ],
    // _case === allin
    // betCoin
    [
      findCharCode([85, 84, 89, 75, 71, 81, 69, 65, 72, 83]), // offsetTop
    ],
    // _case !== allin
    // betCoin
    [
      findCharCode([70, 86, 71, 87, 69, 84, 85, 89, 74, 66]), // tm
      findCharCode([83, 76, 69, 66, 75, 81, 84, 73, 90, 65]), // th
    ],
    // _case === allin
    // betCoinPos
    [
      findCharCode([66, 85, 87, 74, 79, 90, 86, 83, 72, 88]), // host
      findCharCode([85, 75, 72, 69, 71, 66, 74, 81, 87, 84]), // translateX
      findCharCode([80, 67, 90, 85, 82, 71, 70, 66, 84, 74]), // translateY
    ],
  ];
  const KS = [
    // betCoin
    findCharCode([75, 66, 87, 81, 71, 77, 89, 83, 85, 69]), // betState : end
    findCharCode([75, 69, 77, 85, 84, 73, 79, 66, 78, 86]), // host : enemy
    // betCoinPos
    findCharCode([89, 68, 86, 69, 84, 66, 77, 87, 65, 90]), // host : enemy
  ];

  if (_case === 'allin') {
    return new Promise((resolve, reject) => {
      const BET_COINS = document.querySelector('.bet-coins');
      if (!BET_COINS) return errorManagement({ errCase: 'elementLoss', message: '.enemy-block에서 .betting-zone으로 칩을 옯길 때 .bet-coins 엘리먼트가 없습니다' });
      // const MOVE_COINS_LEN = Number(COINS_ENEMY_EXT_BET) > 0 ? Number(COINS_ENEMY_EXT_BET) : 0;
      const MOVE_COINS_LEN = Number(decryptVal2) > 0 ? Number(decryptVal2) : 0;
      const BBT = getStyle(BETTING_ZONE, 'border-top-width');
      let aniTime = Number(MOVE_COINS_LEN) > 0 ? Number(reactiveState.allInintrtval / MOVE_COINS_LEN) : 0;
      let x = 0;
      let y = 0;
      let moveCoin;
      let moveArr = [];
      let liEl;
      let liX = 0;
      let liY = 0;
      let liIdx = 0;

      for (let i = 0; i < MOVE_COINS_LEN; i++) {
        const ENEMY_COIN_LOOP = ENEMY_BLOCK.querySelector('.coins-enemy');
        const COINS_LOOP = ENEMY_COIN_LOOP.querySelectorAll('li');
        moveCoin = COINS_LOOP[COINS_LOOP.length - 1 - i];
        x = 0;
        y = ENEMY_COIN_WRAP.clientHeight;
        moveCoin.style.transition = 'transform ' + Number(aniTime / 1000) + 's ease-in';
        moveCoin.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

        /* const DATA = {
          betState: 'end',
          host: 'enemy',
          index: COINS_LOOP.length - 1 - i,
          offsetLeft: moveCoin.offsetLeft,
          offsetTop: moveCoin.offsetTop,
          translateX: x,
          translateY: y,
        }; */

        const DATA = betCoinsData(K[0].concat(K[1]),
          [
            KS[0], // betState : end
            KS[1], // host : enemy
            o(COINS_LOOP.length - 1 - i), // index
            o(x), // translateX
            o(y), // translateY
            o(moveCoin.offsetLeft), // offsetLeft
            o(moveCoin.offsetTop), // offsetTop
          ]
        );

        // let betCoin = window.sessionStorage.betCoin;
        // let betCoinArr = JSON.parse(betCoin);
        const encryptVal3_1 = storageMethod("s", "GET_ITEM", encryptKey3); // betCoin
        let betCoinArr = JSON.parse(encryptVal3_1);
        betCoinArr.push(DATA);
        // storageMethod('s', 'SET_ITEM', 'betCoin', JSON.stringify(betCoinArr));
        storageMethod('s', 'SET_ITEM', encryptKey3, JSON.stringify(betCoinArr)); // betCoin
        moveArr.push({ x: x, y: y });
      }

      setTimeout(() => {
        let minuteEl = new Object();
        let hourEl = new Object();

        for (let i = 0; i < MOVE_COINS_LEN; i++) {
          const ENEMY_COIN_APPEND = ENEMY_BLOCK.querySelector('.coins-enemy');
          const COINS_APPEND = ENEMY_COIN_APPEND.querySelectorAll('li');
          moveCoin = COINS_APPEND[COINS_APPEND.length - 1];
          liX = moveCoin.offsetLeft + moveArr[liIdx].x;
          liY = moveCoin.offsetTop + moveArr[liIdx].y - ENEMY_COIN_WRAP.clientHeight - BBT;
          liEl = document.createElement('li');

          minuteEl = document.createElement('span');
          hourEl = document.createElement('span');
          minuteEl.classList.add('m');
          hourEl.classList.add('h');
          liEl.appendChild(minuteEl);
          liEl.appendChild(hourEl);
          posClock(hourEl, minuteEl);
          animateClock(hourEl, minuteEl, true);

          liEl.style.transform = 'translate(' + liX + 'px, ' + liY + 'px)';
          liEl.classList.add('e');

          BET_COINS.appendChild(liEl);

          /* const POS_DATA = {
            host: 'enemy',
            translateX: liX,
            translateY: liY,
          }; */
          const POS_DATA = betCoinsData(K[3],
            [
              KS[2], // host : enemy
              o(liX), // translateX
              o(liY), // translateY
            ]
          );

          // let betCoinPos = window.sessionStorage.betCoinPos;
          // let betCoinPosArr = JSON.parse(betCoinPos);
          const encryptVal4_1 = storageMethod("s", "GET_ITEM", encryptKey4); // betCoinPos
          let betCoinPosArr = JSON.parse(encryptVal4_1);
          betCoinPosArr.push(POS_DATA);
          // storageMethod('s', 'SET_ITEM', 'betCoinPos', JSON.stringify(betCoinPosArr));
          storageMethod('s', 'SET_ITEM', encryptKey4, JSON.stringify(betCoinPosArr));
          liIdx += 1;
          moveCoin.remove();
          if (i === MOVE_COINS_LEN - 1) resolve();
        }
      }, Number(aniTime));
    });
  } else {
    return new Promise((resolve, reject) => {
      // const NUMS = window.sessionStorage.gameState === 'playing' ? Number(COINS_ENEMY_EXT_BET) || 0 : Number(COINS_ENEMY_BET) || 0;
      // gameState: sessionStorage.getItem('gameState'),
      const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
      const decryptVal = window.sessionStorage.getItem(encryptKey);
      // playing
      const encryptVal = findCharCode([84, 88, 86, 66, 78, 73, 82, 81, 87, 71]); // playing
      // const NUMS = decryptVal === encryptVal ? Number(COINS_ENEMY_EXT_BET) || 0 : Number(COINS_ENEMY_BET) || 0;
      const NUMS = decryptVal === encryptVal ? Number(decryptVal2) || 0 : Number(decryptVal1) || 0;
      if (NUMS === 0) resolve();

      const PB = getStyle(ENEMY_COIN_WRAP, 'padding-bottom');
      const PL = getStyle(ENEMY_COIN_WRAP, 'padding-left');
      const PR = getStyle(ENEMY_COIN_WRAP, 'padding-right');
      let leftEl;
      let topEl;
      let x = 0;
      let y = 0;
      let wl = 0;
      let wr = 0;
      let hl = 0;
      let hr = 0;
      let tm = 0;
      let th = 0;

      const COINS_LENGTH = COINS.length - 1; // 1, 0
      const COINS_MAX = COINS_LENGTH - NUMS; // 0, -1 > 0보다 작을 경우가 있음

      if (COINS_LENGTH > 0) {
        // 기본 배팅 후 .coins-enemy에 남은 코인이 있는 경우
        for (let i = COINS_LENGTH; i > COINS_MAX; i--) {
          leftEl = COINS[i].offsetLeft || COINS[i].offsetX;
          topEl = COINS[i].offsetTop || COINS[i].offsetY;
          wl = -leftEl - PL;
          wr = BETTING_ZONE.clientWidth - PL - PR - leftEl - COINS[i].clientWidth;
          hl = ENEMY_COIN_WRAP.clientHeight - topEl + PB;
          hr = BETTING_ZONE.clientHeight - COINS[i].clientHeight;
          x = randomNumberMinMax(wl, wr);
          y = randomNumberMinMax(hl, hr);
          tm = getTranslateMH(COINS[i]).m;
          th = getTranslateMH(COINS[i]).h;
          COINS[i].style.transform = 'translate(' + x + 'px, ' + y + 'px)';

          /* const ACTIVE_COIN = {
            betState: 'end',
            host: 'enemy',
            index: COINS.length - 1,
            translateX: x,
            translateY: y,
            offsetLeft: leftEl,
            tm: tm,
            th: th,
          }; */
          const ACTIVE_COIN = betCoinsData(K[0].concat(K[2]),
            [
              KS[0], // betState : end
              KS[1], // host : enemy
              o(COINS.length - 1), // index
              o(x), // translateX
              o(y), // translateY
              o(leftEl), // offsetLeft
              o(tm), // tm
              o(th), // th
            ]
          );

          let arr = [];
          // if (window.sessionStorage.betCoin) {
          //   arr = JSON.parse(window.sessionStorage.betCoin);
          // }
          const encryptVal3_2 = storageMethod("s", "GET_ITEM", encryptKey3); // betCoin value
          if (encryptVal3_2 !== null && encryptVal3_2 !== "" && JSON.parse(encryptVal3_2).length > 0) {
            arr = JSON.parse(encryptVal3_2);
          }
          arr.push(ACTIVE_COIN);
          // storageMethod('s', 'SET_ITEM', 'betCoin', JSON.stringify(arr));
          storageMethod('s', 'SET_ITEM', encryptKey3, JSON.stringify(arr)); // betCoin
          setTimeout(() => {
            if (i === COINS.length - NUMS) resolve();
          }, timeInterval_201);
        }
      } else {
        // 기본 배팅 후 .coins-enemy에 남은 코인이 없는 경우
        const TARGET = COINS[0];
        leftEl = TARGET.offsetLeft || TARGET.offsetX;
        topEl = TARGET.offsetTop || TARGET.offsetY;
        wl = -leftEl - PL;
        wr = BETTING_ZONE.clientWidth - PL - PR - leftEl - TARGET.clientWidth;
        hl = ENEMY_COIN_WRAP.clientHeight - topEl + PB;
        hr = BETTING_ZONE.clientHeight - TARGET.clientHeight;
        x = randomNumberMinMax(wl, wr);
        y = randomNumberMinMax(hl, hr);
        tm = getTranslateMH(TARGET).m;
        th = getTranslateMH(TARGET).h;
        TARGET.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

        /* const ACTIVE_COIN = {
          betState: 'end',
          host: 'enemy',
          index: TARGET.length - 1,
          translateX: x,
          translateY: y,
          offsetLeft: leftEl,
          tm: tm,
          th: th,
        }; */
        const ACTIVE_COIN = betCoinsData(K[0].concat(K[2]),
          [
            KS[0], // betState : end
            KS[1], // host : enemy
            o(TARGET.length - 1), // index
            o(x), // translateX
            o(y), // translateY
            o(leftEl), // offsetLeft
            o(tm), // tm
            o(th), // th
          ]
        );

        let arr = [];
        // if (window.sessionStorage.betCoin) {
        //   arr = JSON.parse(window.sessionStorage.betCoin);
        // }
        const encryptVal3_3 = storageMethod("s", "GET_ITEM", encryptKey3); // betCoin value
        if (encryptVal3_3 !== null && encryptVal3_3 !== "" && JSON.parse(encryptVal3_3).length > 0) {
          arr = JSON.parse(encryptVal3_3);
        }
        arr.push(ACTIVE_COIN);
        // storageMethod('s', 'SET_ITEM', 'betCoin', JSON.stringify(arr));
        storageMethod('s', 'SET_ITEM', encryptKey3, JSON.stringify(arr)); // betCoin

        setTimeout(() => {
          resolve();
        }, timeInterval_201);
      }
    });
  }
};
