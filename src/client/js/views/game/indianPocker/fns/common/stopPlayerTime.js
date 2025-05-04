import { errorManagement } from '@/client/js/module/errorManagement';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
/**
 * gameState playing에서 BETTING 버튼을 누를 때 만 실행
 * @param {string} _state : betting | call | raise
 */
export default (_state) => {
  const COINS_PLAYER = document.querySelector('.coins-player');
  if (!COINS_PLAYER) return errorManagement({ errCase: 'errorComn', message: '.coins-player not found' });
  const COINS = COINS_PLAYER.querySelectorAll('li');
  if (!COINS || COINS.length < 1) return;

  // coins player 코인 모두 지우기
  for (let i = 0; i < COINS.length; i++) {
    COINS[i].remove();
  }

  const PLAYER_COIN_LEN = window.sessionStorage.coinsPlayer;
  if (!PLAYER_COIN_LEN || parseInt(PLAYER_COIN_LEN) < 1) return;
  let liEl = new Object();
  let minuteEl = new Object();
  let hourEl = new Object();

  // coins player 코인 다시 그리기
  for (let i = 0; i < parseInt(PLAYER_COIN_LEN); i++) {
    liEl = document.createElement('li');
    minuteEl = document.createElement('span');
    hourEl = document.createElement('span');
    minuteEl.classList.add('m');
    hourEl.classList.add('h');
    liEl.appendChild(minuteEl);
    liEl.appendChild(hourEl);
    posClock(hourEl, minuteEl);
    COINS_PLAYER.appendChild(liEl);
  }

  const BET_COIN_POS = window.sessionStorage.betCoinPos;
  if (!BET_COIN_POS) return;
  const BET_POS_ARR = JSON.parse(BET_COIN_POS);
  const BETTING_ZONE = document.querySelector('.betting-zone');
  if (!BETTING_ZONE) errorManagement({ errCase: 'errorComn', message: '.betting-zone not found' });
  const BET_COIN = BETTING_ZONE.querySelector('.bet-coins');
  if (!BET_COIN) errorManagement({ errCase: 'errorComn', message: '.bet-coins not found' });
  const BET_COINS = BET_COIN.querySelectorAll('li');
  if (BET_COINS.length < 1) return;

  // betting zoin의 코인 모두 지우기
  for (let i = 0; i < BET_COINS.length; i++) {
    BET_COINS[i].remove();
  }

  // betting zoin의 코인 다시 그리기
  for (let i = 0; i < BET_POS_ARR.length; i++) {
    liEl = document.createElement('li');
    minuteEl = document.createElement('span');
    hourEl = document.createElement('span');
    minuteEl.classList.add('m');
    hourEl.classList.add('h');
    liEl.appendChild(minuteEl);
    liEl.appendChild(hourEl);
    liEl.style.transform = `translate(${BET_POS_ARR[i].translateX}px, ${BET_POS_ARR[i].translateY}px)`;

    if (BET_POS_ARR[i].host === 'enemy') {
      liEl.classList.add('e');
      // _state === "betting" ? animateClock(hourEl, minuteEl, false) : posClock(hourEl, minuteEl);
      if (_state === 'betting') {
        animateClock(hourEl, minuteEl, false);
      } else if (_state === 'call') {
        posClock(hourEl, minuteEl);
      } else if (_state === 'raise') {
        animateClock(hourEl, minuteEl, false);
      } else {
        errorManagement({ errCase: 'errorComn', message: '_state not found' });
      }
    } else if (BET_POS_ARR[i].host === 'player') {
      posClock(hourEl, minuteEl);
    } else {
      errorManagement({ errCase: 'errorComn', message: 'betCoinPos not found' });
    }
    BET_COIN.appendChild(liEl);
  }

  const COINS_ENEMY = document.querySelector('.coins-enemy');
  if (!COINS_ENEMY) return errorManagement({ errCase: 'errorComn', message: '.coins-enemy not found' });
  const COINS_E = COINS_ENEMY.querySelectorAll('li');
  if (!COINS_E || COINS_E.length < 1) return;

  // coins enemy 코인 모두 지우기
  for (let i = 0; i < COINS_E.length; i++) {
    COINS_E[i].remove();
  }

  const ENEMY_COIN_LEN = window.sessionStorage.coinsEnemy;
  if (!ENEMY_COIN_LEN || parseInt(ENEMY_COIN_LEN) < 1) return;

  // coins enemy 코인 다시 그리기
  for (let i = 0; i < parseInt(PLAYER_COIN_LEN); i++) {
    liEl = document.createElement('li');
    minuteEl = document.createElement('span');
    hourEl = document.createElement('span');
    minuteEl.classList.add('m');
    hourEl.classList.add('h');
    liEl.appendChild(minuteEl);
    liEl.appendChild(hourEl);
    if (_state === 'betting') {
      animateClock(hourEl, minuteEl, false);
    } else if (_state === 'call') {
      posClock(hourEl, minuteEl);
    } else if (_state === 'raise') {
      animateClock(hourEl, minuteEl, false);
    } else {
      errorManagement({ errCase: 'errorComn', message: '_state not found' });
    }
    COINS_ENEMY.appendChild(liEl);
  }
};
