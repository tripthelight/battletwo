import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
import drawPlayerBlock from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/drawPlayerBlock';
import drawPlayerBlockPlaying from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawPlayerBlockPlaying';

export default () => {
  // element | seeeion 체크
  const BET_COIN_POS = window.sessionStorage.betCoinPos;
  if (!BET_COIN_POS) return drawPlayerBlock();
  const BETTING_ZONE = document.querySelector('.betting-zone');
  if (!BETTING_ZONE) return errorManagement({ errCase: 'errorComn', message: '.betting-zone 엘리먼트가 없습니다' });

  const BET_USER = window.sessionStorage.betUser;
  if (!BET_USER) return errorManagement({ errCase: 'errorComn', message: 'betUser not found' });
  const BET_RES = BET_USER === 'true' ? true : false;

  // 명령
  setTimeout(() => {
    const BET_COIN_ARR = JSON.parse(BET_COIN_POS);
    if (!BET_COIN_ARR || BET_COIN_ARR.length <= 0) return drawPlayerBlock();
    let elem = document.createElement('ul');
    let liEl = new Object();
    let minuteEl = new Object();
    let hourEl = new Object();
    elem.classList.add('bet-coins');
    for (let i = 0; i < BET_COIN_ARR.length; i++) {
      liEl = document.createElement('li');
      minuteEl = document.createElement('span');
      hourEl = document.createElement('span');
      minuteEl.classList.add('m');
      hourEl.classList.add('h');
      liEl.appendChild(minuteEl);
      liEl.appendChild(hourEl);
      if (BET_COIN_ARR[i].host === 'player') {
        BET_RES ? animateClock(hourEl, minuteEl, false) : posClock(hourEl, minuteEl);
      }
      if (BET_COIN_ARR[i].host === 'enemy') {
        liEl.classList.add('e');
        BET_RES ? posClock(hourEl, minuteEl) : animateClock(hourEl, minuteEl, false);
      }
      liEl.style.transform = 'translate(' + BET_COIN_ARR[i].translateX + 'px, ' + BET_COIN_ARR[i].translateY + 'px)';
      elem.appendChild(liEl);
    }
    BETTING_ZONE.appendChild(elem);

    // 다음 함수 실행
    setTimeout(drawPlayerBlockPlaying, timeInterval_1);
  }, timeInterval_1);
};
