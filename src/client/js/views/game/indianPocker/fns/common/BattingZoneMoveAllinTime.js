import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock.js';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';

export default (_removeCoins) => {
  return new Promise((resolve, reject) => {
    // 내가 올인한 후 상대방의 코인 시간을 가게 만들어야 함
    const COINS_ENEMY_WRAP = document.querySelector('.coins-enemy');
    if (!COINS_ENEMY_WRAP) return;
    const COINS_ENEMY = COINS_ENEMY_WRAP.querySelectorAll('li');
    if (!COINS_ENEMY || COINS_ENEMY.length < 1) return;

    let liEl = new Object();
    let minuteEl = new Object();
    let hourEl = new Object();

    for (let i = 0; i < COINS_ENEMY.length; i++) {
      COINS_ENEMY[i].remove();
    }

    for (let i = 0; i < COINS_ENEMY.length; i++) {
      liEl = document.createElement('li');
      minuteEl = document.createElement('span');
      hourEl = document.createElement('span');
      minuteEl.classList.add('m');
      hourEl.classList.add('h');
      liEl.appendChild(minuteEl);
      liEl.appendChild(hourEl);
      posClock(hourEl, minuteEl);
      animateClock(hourEl, minuteEl, false);
      COINS_ENEMY_WRAP.appendChild(liEl);
    }

    // 내가 올인한 후 나의 코인 시간을 가게 만들어야 함
    const COINS_PLAYER_WRAP = document.querySelector('.coins-player');
    if (!COINS_PLAYER_WRAP) return;
    const COINS_PLAYER = COINS_PLAYER_WRAP.querySelectorAll('li');
    if (!COINS_PLAYER || COINS_PLAYER.length < 1) return;

    for (let i = 0; i < COINS_PLAYER.length; i++) {
      COINS_PLAYER[i].remove();
    }

    for (let i = 0; i < COINS_PLAYER.length; i++) {
      liEl = document.createElement('li');
      minuteEl = document.createElement('span');
      hourEl = document.createElement('span');
      minuteEl.classList.add('m');
      hourEl.classList.add('h');
      liEl.appendChild(minuteEl);
      liEl.appendChild(hourEl);
      posClock(hourEl, minuteEl);
      animateClock(hourEl, minuteEl, true);
      COINS_PLAYER_WRAP.appendChild(liEl);
    }

    // 배팅존에 있는 나의 코인 시간 stop
    // 배팅존에 있는 상대 코인 시간 start
    const BAT_COINS_WRAP = document.querySelector('.bet-coins');
    if (!BAT_COINS_WRAP) return;
    const BAT_COINS = BAT_COINS_WRAP.querySelectorAll('li');
    if (!BAT_COINS || BAT_COINS.length < 1) return;
    const PLAYER_BET_COINS = Array.from(BAT_COINS).filter((li) => !li.classList.contains('e'));
    if (!PLAYER_BET_COINS || PLAYER_BET_COINS.length < 1) return;
    const ENEMY_BET_COINS = Array.from(BAT_COINS).filter((li) => li.classList.contains('e'));
    if (!ENEMY_BET_COINS || ENEMY_BET_COINS.length < 1) return;

    // 배팅존에 있는 나의 코인 시간 stop
    PLAYER_BET_COINS.forEach((liElem) => {
      liElem.querySelectorAll('span.m, span.h').forEach((spanEl) => {
        spanEl.getAnimations().forEach((animation) => animation.cancel());
      });
    });

    // 배팅존에 있는 상대 코인 시간 start
    ENEMY_BET_COINS.forEach((liElem) => {
      const hEl = liElem.querySelector('span.h');
      const mEl = liElem.querySelector('span.m');

      if (hEl && mEl) {
        animateClock(hEl, mEl, false);
      }
    });

    resolve(_removeCoins);
  });
};
