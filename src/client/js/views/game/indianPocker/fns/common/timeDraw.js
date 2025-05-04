import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
import timeDrawBettingZone from '@/client/js/views/game/indianPocker/fns/common/timeDrawBettingZone';

/**
 * 기본 배팅을 완료하고, gameState playing으로 들어와서, bet user check를 하는 단계
 * 새로고침 하면 여기 안탐
 * @param {boolean} _state      : true -> player가 배팅할 차례 | false -> enemy가 배팅할 차례
 * @param {object} _playerCoins : player의 coin ul element
 * @param {object} _enemyCoins  : enemy의 coin ul element
 */
export default (_state, _playerCoins, _enemyCoins) => {
  const PLAYER_COINS = _playerCoins.querySelectorAll('li');
  const ENEMY_COINS = _enemyCoins.querySelectorAll('li');
  if (!PLAYER_COINS || PLAYER_COINS.length < 1) return;
  if (!ENEMY_COINS || ENEMY_COINS.length < 1) return;
  let liEl = new Object();
  let minuteEl = new Object();
  let hourEl = new Object();

  for (let i = 0; i < PLAYER_COINS.length; i++) {
    liEl = PLAYER_COINS[i];
    minuteEl = liEl.querySelector('span.m');
    hourEl = liEl.querySelector('span.h');
    _state ? animateClock(hourEl, minuteEl, false) : posClock(hourEl, minuteEl);
  }
  for (let i = 0; i < ENEMY_COINS.length; i++) {
    liEl = ENEMY_COINS[i];
    minuteEl = liEl.querySelector('span.m');
    hourEl = liEl.querySelector('span.h');
    _state ? posClock(hourEl, minuteEl) : animateClock(hourEl, minuteEl, false);
  }

  // betting zone check
  timeDrawBettingZone(_state);
};
