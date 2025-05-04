import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
import drawBettingZonePlaying from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawBettingZonePlaying';

export default () => {
  // element | seeeion 체크
  const COINS_ENEMY = document.querySelector('.coins-enemy');
  if (COINS_ENEMY) return;
  const ENEMY_BLOCK = document.querySelector('.enemy-block');
  if (!ENEMY_BLOCK) return errorManagement({ errCase: 'errorComn', message: '.enemy-block 엘리먼트가 없습니다' });

  const BET_USER = window.sessionStorage.betUser;
  if (!BET_USER) return errorManagement({ errCase: 'errorComn', message: 'betUser not found' });
  const BET_STATE = BET_USER === 'true' ? true : false;

  // 명령
  setTimeout(() => {
    // 새로 고침 시 여기를 탐
    let elem = document.createElement('ul');
    let liEl = new Object();
    let minuteEl = new Object();
    let hourEl = new Object();
    elem.classList.add('coins');
    elem.classList.add('coins-enemy');
    let coinCount = Number(window.sessionStorage.coinsEnemy);
    for (let i = 0; i < coinCount; i++) {
      liEl = document.createElement('li');
      minuteEl = document.createElement('span');
      hourEl = document.createElement('span');
      minuteEl.classList.add('m');
      hourEl.classList.add('h');
      liEl.appendChild(minuteEl);
      liEl.appendChild(hourEl);
      elem.appendChild(liEl);
      // 내 차례면 enemy coin은 시간이 멈추고, 내 차례가 아니면 enemy coin은 시간이 감
      BET_STATE ? posClock(hourEl, minuteEl) : animateClock(hourEl, minuteEl, false);
    }
    ENEMY_BLOCK.appendChild(elem);

    // 다음 함수 실행
    setTimeout(drawBettingZonePlaying, timeInterval_1);
  }, timeInterval_1);
};
