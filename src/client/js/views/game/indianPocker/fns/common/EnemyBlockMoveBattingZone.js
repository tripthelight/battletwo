import { getStyle } from '@/client/js/functions/comnExport';
import { allInintrtval } from '@/client/js/views/game/indianPocker/fns/common/variable.js';
import { timeInterval_201 } from '@/client/js/functions/variable.js';
import { errorManagement } from '@/client/js/module/errorManagement';
import randomNumberMinMax from '@/client/js/views/game/indianPocker/fns/common/randomNumberMinMax.js';
import getTranslateMH from '@/client/js/views/game/indianPocker/fns/common/getTranslateMH.js';

export default (_case) => {
  const BETTING_ZONE = document.querySelector('.betting-zone');
  if (!BETTING_ZONE) return errorManagement({ errCase: 'errorComn', message: '.enemy-block에서 .betting-zone으로 칩을 옯길 때 .betting-zone 엘리먼트가 없습니다' });
  const ENEMY_BLOCK = document.querySelector('.enemy-block');
  if (!ENEMY_BLOCK) return errorManagement({ errCase: 'errorComn', message: '.enemy-block에서 .betting-zone으로 칩을 옯길 때 .enemy-block 엘리먼트가 없습니다' });
  const ENEMY_COIN_WRAP = ENEMY_BLOCK.querySelector('.coins-enemy');
  if (!ENEMY_COIN_WRAP) return errorManagement({ errCase: 'errorComn', message: '.enemy-block에서 .betting-zone으로 칩을 옯길 때 .coins-enemy 엘리먼트가 없습니다' });
  const COINS = ENEMY_COIN_WRAP.querySelectorAll('li');
  const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet;
  const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet;

  if (_case === 'allin') {
    return new Promise((resolve, reject) => {
      const BET_COINS = document.querySelector('.bet-coins');
      if (!BET_COINS) return errorManagement({ errCase: 'errorComn', message: '.enemy-block에서 .betting-zone으로 칩을 옯길 때 .bet-coins 엘리먼트가 없습니다' });
      const MOVE_COINS_LEN = Number(COINS_ENEMY_EXT_BET) > 0 ? Number(COINS_ENEMY_EXT_BET) : 0;
      const BBT = getStyle(BETTING_ZONE, 'border-top-width');
      let aniTime = Number(MOVE_COINS_LEN) > 0 ? Number(allInintrtval / MOVE_COINS_LEN) : 0;
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
        window.sessionStorage.setItem('betCoin', JSON.stringify(betCoinArr));
        moveArr.push({ x: x, y: y });
      }

      setTimeout(() => {
        for (let i = 0; i < MOVE_COINS_LEN; i++) {
          const ENEMY_COIN_APPEND = ENEMY_BLOCK.querySelector('.coins-enemy');
          const COINS_APPEND = ENEMY_COIN_APPEND.querySelectorAll('li');
          moveCoin = COINS_APPEND[COINS_APPEND.length - 1];
          liX = moveCoin.offsetLeft + moveArr[liIdx].x;
          liY = moveCoin.offsetTop + moveArr[liIdx].y - ENEMY_COIN_WRAP.clientHeight - BBT;
          liEl = document.createElement('li');
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
          window.sessionStorage.setItem('betCoinPos', JSON.stringify(betCoinPosArr));
          liIdx += 1;
          moveCoin.remove();
          if (i === MOVE_COINS_LEN - 1) resolve();
        }
      }, Number(aniTime));
    });
  } else {
    return new Promise((resolve, reject) => {
      const NUMS = window.sessionStorage.gameState === 'playing' ? Number(COINS_ENEMY_EXT_BET) || 0 : Number(COINS_ENEMY_BET) || 0;
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
      for (let i = COINS.length - 1; i > COINS.length - 1 - NUMS; i--) {
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
        window.sessionStorage.setItem('betCoin', JSON.stringify(arr));
        setTimeout(() => {
          if (i === COINS.length - NUMS) resolve();
        }, timeInterval_201);
      }
    });
  }
};
