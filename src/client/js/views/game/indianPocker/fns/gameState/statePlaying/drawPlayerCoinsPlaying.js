import deviceStateStore from '@/client/store/deviceStateStore';
import { timeInterval_1 } from '@/client/js/functions/variable';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
import refreshFindEnemyCardNumber from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/refreshFindEnemyCardNumber';

export default () => {
  // element | seeeion 체크
  const COINS_PLAYER = document.querySelector('.coins-player');
  if (COINS_PLAYER) return;
  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!PLAYER_BLOCK) return;

  const BET_USER = window.sessionStorage.betUser;
  if (!BET_USER) return errorComn('betUser not found');
  const BET_STATE = BET_USER === 'true' ? true : false;

  // 명령
  setTimeout(() => {
    // 새로 고침 시 여기를 탐
    let elem = document.createElement('ul');
    let liEl = new Object();
    let minuteEl = new Object();
    let hourEl = new Object();
    elem.classList.add('coins');
    elem.classList.add('coins-player');
    let coinCount = Number(window.sessionStorage.coinsPlayer);
    for (let i = 0; i < coinCount; i++) {
      liEl = document.createElement('li');
      minuteEl = document.createElement('span');
      hourEl = document.createElement('span');
      minuteEl.classList.add('m');
      hourEl.classList.add('h');
      liEl.appendChild(minuteEl);
      liEl.appendChild(hourEl);
      const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
      if (deviceState === 'pc') liEl.setAttribute('draggable', true);
      elem.appendChild(liEl);
      // 내 차례면 player coin은 시간이 가고고, 내 차례가 아니면 player coin은 시간이 멈춤
      BET_STATE ? animateClock(hourEl, minuteEl, false) : posClock(hourEl, minuteEl);
    }
    PLAYER_BLOCK.appendChild(elem);
    // 다음 함수 실행
    setTimeout(refreshFindEnemyCardNumber, timeInterval_1);
  }, timeInterval_1);
};
