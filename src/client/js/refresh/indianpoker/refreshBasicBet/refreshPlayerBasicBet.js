import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';

export default () => {
  const BASIC_BETTING_STATE = window.sessionStorage.basicBettingState;
  if (!BASIC_BETTING_STATE) return;
  const BASIC_BETTING_RES = BASIC_BETTING_STATE === 'true' ? true : false;

  // 기본 배팅을 한 상태에서 새로고침
  const COINS_PLAYER = document.querySelector('.coins-player');
  if (!COINS_PLAYER) return;
  const COINS = COINS_PLAYER.querySelectorAll('li');
  if (!COINS || COINS.length < 1) return;

  for (let i = 0; i < COINS.length; i++) {
    COINS[i].remove();
  }

  let liEl = new Object();
  let minuteEl = new Object();
  let hourEl = new Object();

  for (let i = 0; i < COINS.length; i++) {
    liEl = document.createElement('li');
    minuteEl = document.createElement('span');
    hourEl = document.createElement('span');
    minuteEl.classList.add('m');
    hourEl.classList.add('h');
    liEl.appendChild(minuteEl);
    liEl.appendChild(hourEl);
    posClock(hourEl, minuteEl);
    BASIC_BETTING_RES ? posClock(hourEl, minuteEl) : animateClock(hourEl, minuteEl, false);
    COINS_PLAYER.appendChild(liEl);
  }
};
