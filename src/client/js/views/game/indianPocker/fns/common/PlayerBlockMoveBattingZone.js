import { errorManagement } from '@/client/js/module/errorManagement';
import { getStyle } from '@/client/js/functions/comnExport';
import { allInintrtval } from '@/client/js/views/game/indianPocker/fns/common/variable.js';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock.js';

export default (_coins, _coinsRes, _coinsDelete) => {
  return new Promise((resolve, reject) => {
    if (_coinsDelete > 0) return resolve({ ep: _coins, epeb: _coinsRes, rc: _coinsDelete });
    if (_coins < 1) return resolve({ ep: 0, epeb: Number(window.sessionStorage.coinsPlayerExtBet), rc: _coinsDelete });
    const BETTING_ZONE = document.querySelector('.betting-zone');
    if (!BETTING_ZONE) return errorManagement({ errCase: 'errorComn', message: 'all in 버튼 클릭 시 .betting-zone 엘리먼트가 없습니다' });
    const BET_COINS = BETTING_ZONE.querySelector('.bet-coins');
    if (!BET_COINS) return errorManagement({ errCase: 'errorComn', message: 'all in 버튼 클릭 시 .bet-coins 엘리먼트가 없습니다' });
    const COINS_PLAYER = document.querySelector('.coins-player');
    if (!COINS_PLAYER) return errorManagement({ errCase: 'errorComn', message: 'all in 버튼 클릭 시 .coins-player 엘리먼트가 없습니다' });
    const COINS_PLAYER_LI = COINS_PLAYER.querySelectorAll('li');

    const BBT = getStyle(BETTING_ZONE, 'border-top-width');
    const CW = COINS_PLAYER_LI.length > 0 ? COINS_PLAYER_LI[0].clientWidth : 0;
    const CY = COINS_PLAYER_LI.length > 0 ? COINS_PLAYER_LI[0].clientHeight : 0;
    let aniTime = Number(allInintrtval / _coins);
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

      const DATA = {
        betState: 'end',
        host: 'player',
        index: COINS_PLAYER_LI.length - i,
        offsetLeft: moveCoin.offsetLeft,
        offsetTop: moveCoin.offsetTop,
        translateX: x,
        translateY: y,
      };
      let betCoin = window.sessionStorage.betCoin;
      let betCoinArr = JSON.parse(betCoin);
      betCoinArr.push(DATA);
      window.sessionStorage.setItem('betCoin', JSON.stringify(betCoinArr));
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
        liEl.style.transform = 'translate(' + liX + 'px, ' + liY + 'px)';
        BET_COINS.appendChild(liEl);
        const POS_DATA = {
          host: 'player',
          translateX: liX,
          translateY: liY,
        };
        let betCoinPos = window.sessionStorage.betCoinPos;
        let betCoinPosArr = JSON.parse(betCoinPos);
        betCoinPosArr.push(POS_DATA);
        window.sessionStorage.setItem('betCoinPos', JSON.stringify(betCoinPosArr));
        moveCoin.remove();
        appendIdx += 1;
        if (i === _coins) resolve({ ep: _coins, epeb: _coinsRes, rc: _coinsDelete });
      }
    }, Number(aniTime));
  });
};
