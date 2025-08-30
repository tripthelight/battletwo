import drawPlayerBlock from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/drawPlayerBlock';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default () => {
  // element | seeeion 체크
  const BET_COIN_POS = window.sessionStorage.betCoinPos;

  if (!BET_COIN_POS) return drawPlayerBlock();
  const BETTING_ZONE = document.querySelector('.betting-zone');
  if (!BETTING_ZONE) throw throwObj('elementLoss', '.betting-zone element not found.');

  // 명령
  const BET_COIN_ARR = JSON.parse(BET_COIN_POS);
  if (!BET_COIN_ARR || BET_COIN_ARR.length <= 0) return drawPlayerBlock();
  const elem = document.createElement('ul');
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
    posClock(hourEl, minuteEl);
    if (BET_COIN_ARR[i].host === 'enemy') liEl.classList.add('e');
    liEl.style.transform = 'translate(' + BET_COIN_ARR[i].translateX + 'px, ' + BET_COIN_ARR[i].translateY + 'px)';
    elem.appendChild(liEl);
  }
  BETTING_ZONE.appendChild(elem);

  // 다음 함수 실행
  drawPlayerBlock();
};
