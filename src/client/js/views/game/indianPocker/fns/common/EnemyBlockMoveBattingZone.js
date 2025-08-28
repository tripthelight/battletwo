import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { getStyle } from '@/client/js/functions/comnExport';
import { reactiveState } from '@/client/js/views/game/indianPocker/fns/common/variable';
import { timeInterval_201 } from '@/client/js/functions/variable.js';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import randomNumberMinMax from '@/client/js/views/game/indianPocker/fns/common/randomNumberMinMax.js';
import getTranslateMH from '@/client/js/views/game/indianPocker/fns/common/getTranslateMH.js';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';

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

        const DATA = {
          betState: 'end',
          host: 'enemy',
          index: COINS_LOOP.length - 1 - i,
          offsetLeft: moveCoin.offsetLeft,
          offsetTop: moveCoin.offsetTop,
          translateX: x,
          translateY: y,
        };

        let betCoin = window.sessionStorage.betCoin;
        let betCoinArr = JSON.parse(betCoin);
        betCoinArr.push(DATA);
        storageMethod('s', 'SET_ITEM', 'betCoin', JSON.stringify(betCoinArr));
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
          const POS_DATA = {
            host: 'enemy',
            translateX: liX,
            translateY: liY,
          };
          let betCoinPos = window.sessionStorage.betCoinPos;
          let betCoinPosArr = JSON.parse(betCoinPos);
          betCoinPosArr.push(POS_DATA);
          storageMethod('s', 'SET_ITEM', 'betCoinPos', JSON.stringify(betCoinPosArr));
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
      const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]);
      const decryptVal = window.sessionStorage.getItem(encryptKey);
      // playing
      const encryptVal = findCharCode([84, 88, 86, 66, 78, 73, 82, 81, 87, 71]);
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
      const COINS_MAX = COINS.length - 1 - NUMS; // 0, -1 > 0보다 작을 경우가 있음

      if (COINS_LENGTH > 0) {
        // 기본 배팅 후 남은 코인이 있는 경우
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

          const ACTIVE_COIN = {
            betState: 'end',
            host: 'enemy',
            index: COINS.length - 1,
            translateX: x,
            translateY: y,
            offsetLeft: leftEl,
            tm: tm,
            th: th,
          };

          let arr = [];
          if (window.sessionStorage.betCoin) {
            arr = JSON.parse(window.sessionStorage.betCoin);
          }
          arr.push(ACTIVE_COIN);
          storageMethod('s', 'SET_ITEM', 'betCoin', JSON.stringify(arr));
          setTimeout(() => {
            if (i === COINS.length - NUMS) resolve();
          }, timeInterval_201);
        }
      } else {
        // 기본 배팅 후 남은 코인이 없는 경우
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

        const ACTIVE_COIN = {
          betState: 'end',
          host: 'enemy',
          index: TARGET.length - 1,
          translateX: x,
          translateY: y,
          offsetLeft: leftEl,
          tm: tm,
          th: th,
        };

        let arr = [];
        if (window.sessionStorage.betCoin) {
          arr = JSON.parse(window.sessionStorage.betCoin);
        }
        arr.push(ACTIVE_COIN);
        storageMethod('s', 'SET_ITEM', 'betCoin', JSON.stringify(arr));

        setTimeout(() => {
          resolve();
        }, timeInterval_201);
      }
    });
  }
};
