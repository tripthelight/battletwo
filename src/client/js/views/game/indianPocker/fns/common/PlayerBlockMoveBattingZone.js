import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import { obfuscateInt32 as o } from '@/client/js/module/crypts/encryptNumber';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { getStyle } from '@/client/js/functions/comnExport';
import { reactiveState } from '@/client/js/views/game/indianPocker/fns/common/variable';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock.js';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import betCoinsData from '@/client/js/views/game/indianPocker/fns/common/betCoinsData/betCoinsData';

export default (_coins, _coinsRes, _coinsDelete) => {
  return new Promise((resolve, reject) => {
    if (_coinsDelete > 0) return resolve({ ep: _coins, epeb: _coinsRes, rc: _coinsDelete });

    // if (_coins < 1) return resolve({ ep: 0, epeb: Number(window.sessionStorage.coinsPlayerExtBet), rc: _coinsDelete });
    if (_coins < 1) {
      const encryptKey1 = findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]); // coinsPlayerExtBet
      const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
      const decryptVal1 = dec(encryptVal1); // coinsPlayerExtBet value number
      return resolve({
        ep: 0,
        epeb: decryptVal1,
        rc: _coinsDelete
      });
    };

    const BETTING_ZONE = document.querySelector('.betting-zone');
    if (!BETTING_ZONE) return errorManagement({ errCase: 'elementLoss', message: 'all in 버튼 클릭 시 .betting-zone 엘리먼트가 없습니다' });
    const BET_COINS = BETTING_ZONE.querySelector('.bet-coins');
    if (!BET_COINS) return errorManagement({ errCase: 'elementLoss', message: 'all in 버튼 클릭 시 .bet-coins 엘리먼트가 없습니다' });
    const COINS_PLAYER = document.querySelector('.coins-player');
    if (!COINS_PLAYER) return errorManagement({ errCase: 'elementLoss', message: 'all in 버튼 클릭 시 .coins-player 엘리먼트가 없습니다' });
    const COINS_PLAYER_LI = COINS_PLAYER.querySelectorAll('li');

    const encryptKey2 = findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]); // betCoin
    const K = [
      findCharCode([80, 72, 83, 88, 76, 75, 78, 84, 65, 89]), // betState
      findCharCode([88, 79, 72, 75, 71, 83, 81, 85, 82, 84]), // host
      findCharCode([77, 75, 87, 70, 82, 88, 83, 74, 89, 80]), // index
      findCharCode([81, 80, 74, 86, 71, 77, 69, 90, 73, 79]), // translateX
      findCharCode([76, 80, 65, 82, 87, 69, 78, 74, 83, 90]), // translateY
      findCharCode([67, 69, 82, 79, 83, 88, 77, 84, 80, 75]), // offsetLeft
      findCharCode([85, 84, 89, 75, 71, 81, 69, 65, 72, 83]), // offsetTop
    ];
    const KS = [
      findCharCode([75, 66, 87, 81, 71, 77, 89, 83, 85, 69]), // betState : end
      findCharCode([87, 68, 88, 70, 85, 89, 73, 71, 86, 84]), // host : pleyer
    ];

    const BBT = getStyle(BETTING_ZONE, 'border-top-width');
    const CW = COINS_PLAYER_LI.length > 0 ? COINS_PLAYER_LI[0].clientWidth : 0;
    const CY = COINS_PLAYER_LI.length > 0 ? COINS_PLAYER_LI[0].clientHeight : 0;
    let aniTime = Number(reactiveState.allInintrtval / _coins);
    let x = 0;
    let y = 0;
    let xMin = 0;
    let xMax = 0;
    let yMin = 0;
    let yMax = 0;
    let xyArr = [];
    let moveCoin;
    let liEl = new Object();
    let minuteEl = new Object();
    let hourEl = new Object();
    let liX = 0;
    let liY = 0;

    for (let i = 1; i <= _coins; i++) {
      const LOOP_EL = document.querySelectorAll('.coins-player li');
      // console.log("LOOP_EL.length - i :: ", LOOP_EL.length - i);
      moveCoin = LOOP_EL[LOOP_EL.length - i];
      x = 0;
      y = 0 - COINS_PLAYER.clientHeight;
      moveCoin.style.transition = 'transform ' + Number(aniTime / 1000) + 's ease-in';
      moveCoin.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

      /* const DATA = {
        betState: 'end',
        host: 'player',
        index: COINS_PLAYER_LI.length - i,
        offsetLeft: moveCoin.offsetLeft,
        offsetTop: moveCoin.offsetTop,
        translateX: x,
        translateY: y,
      }; */
      const DATA = betCoinsData(K,
        [
          KS[0], // betState : end
          KS[1], // host : player
          o(COINS_PLAYER_LI.length - i), // index
          o(x), // translateX
          o(y), // translateY
          o(moveCoin.offsetLeft), // offsetLeft
          o(moveCoin.offsetTop), // offsetTop
        ]
      );

      // let betCoin = window.sessionStorage.betCoin;
      // let betCoinArr = JSON.parse(betCoin);
      const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);
      let betCoinArr = JSON.parse(encryptVal2);
      betCoinArr.push(DATA);
      // storageMethod('s', 'SET_ITEM', 'betCoin', JSON.stringify(betCoinArr));
      storageMethod('s', 'SET_ITEM', encryptKey2, JSON.stringify(betCoinArr)); // betCoin
      xyArr.push({ x: x, y: y });
    }
    setTimeout(() => {
      let appendIdx = 0;
      for (let i = 1; i <= _coins; i++) {
        const APPEND_EL = document.querySelectorAll('.coins-player li');
        moveCoin = APPEND_EL[APPEND_EL.length - 1];
        liX = moveCoin.offsetLeft + xyArr[appendIdx].x;
        liY = moveCoin.offsetTop + xyArr[appendIdx].y + BETTING_ZONE.clientHeight + BBT;
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
        BET_COINS.appendChild(liEl);

        const POS_DATA = {
          host: 'player',
          translateX: liX,
          translateY: liY,
        };

        // let betCoinPos = window.sessionStorage.betCoinPos;
        // let betCoinPosArr = JSON.parse(betCoinPos);
        // betCoinPosArr.push(POS_DATA);
        // storageMethod('s', 'SET_ITEM', 'betCoinPos', JSON.stringify(betCoinPosArr));

        const encryptKey3 = findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]); // betCoinPos
        const encryptVal3 = storageMethod("s", "GET_ITEM", encryptKey3);
        let betCoinPosArr = JSON.parse(encryptVal3);
        betCoinPosArr.push(POS_DATA);
        storageMethod('s', 'SET_ITEM', encryptKey3, JSON.stringify(betCoinPosArr)); // betCoinPos
        moveCoin.remove();
        appendIdx += 1;
        if (i === _coins) resolve({ ep: _coins, epeb: _coinsRes, rc: _coinsDelete });
      }
    }, Number(aniTime));
  });
};
