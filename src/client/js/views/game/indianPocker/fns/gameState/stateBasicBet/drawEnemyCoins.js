import { dec } from '@/client/js/module/crypts/obf8lower';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import drawBettingZone from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/drawBettingZone';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
import removeUserCoins from '@/client/js/views/game/indianPocker/fns/common/removeUserCoins';

export default () => {
  // element | seeeion 체크
  const COINS_ENEMY = document.querySelector('.coins-enemy');
  // if (COINS_ENEMY) return drawBettingZone();
  // enemy 코인 모두 제거
  if (COINS_ENEMY) removeUserCoins(COINS_ENEMY);
  const ENEMY_BLOCK = document.querySelector('.enemy-block');
  if (!ENEMY_BLOCK) throw throwObj('elementLoss', '.enemy-block element not found.')

  const BET_COIN_POS = window.sessionStorage.betCoinPos;
  let betCoinPosArr = [];
  let enemyBet = [];
  let enemyBetState = false;
  if (BET_COIN_POS) {
    betCoinPosArr = JSON.parse(BET_COIN_POS);
    enemyBet = betCoinPosArr.filter((item) => item.host === 'enemy');
    enemyBetState = enemyBet.length > 0 ? true : false;
  }

  // 명령
  const elem = COINS_ENEMY ? COINS_ENEMY : document.createElement('ul');
  let liEl = new Object();
  let minuteEl = new Object();
  let hourEl = new Object();
  elem.classList.add('coins');
  elem.classList.add('coins-enemy');
  // const coinCount = Number(window.sessionStorage.coinsEnemy);
  const coinCount = dec(window.sessionStorage.getItem('coinsEnemy'));

  console.log('coinCount ENEMY ============ > ', coinCount);

  for (let i = 0; i < coinCount; i++) {
    liEl = document.createElement('li');
    minuteEl = document.createElement('span');
    hourEl = document.createElement('span');
    minuteEl.classList.add('m');
    hourEl.classList.add('h');
    liEl.appendChild(minuteEl);
    liEl.appendChild(hourEl);
    elem.appendChild(liEl);
    // 시, 분 animate()
    enemyBetState ? posClock(hourEl, minuteEl) : animateClock(hourEl, minuteEl, false);
  }
  ENEMY_BLOCK.appendChild(elem);

  // 다음 함수 실행
  drawBettingZone();
};
