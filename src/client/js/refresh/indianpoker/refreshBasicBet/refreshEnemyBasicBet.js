import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';

export default () => {
  const BET_COIN_POS = window.sessionStorage.betCoinPos;
  if (!BET_COIN_POS) return;
  const BET_COIN_POS_ARR = JSON.parse(BET_COIN_POS);
  const ENEMY_BET = BET_COIN_POS_ARR.filter((item) => item.host === 'enemy');

  if (ENEMY_BET.length > 0) {
    // enemy가 기본 배팅을 한 상태에서 새로고침
    const COINS_ENEMY = document.querySelector('.coins-enemy');
    if (!COINS_ENEMY) return;
    const COINS = COINS_ENEMY.querySelectorAll('li');
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
      COINS_ENEMY.appendChild(liEl);
    }
  }
};
