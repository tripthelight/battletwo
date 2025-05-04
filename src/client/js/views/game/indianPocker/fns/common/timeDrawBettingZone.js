import { errorManagement } from '@/client/js/module/errorManagement';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';

/**
 * 기본 배팅을 완료하고, gameState playing으로 들어와서, bet user check를 하는 단계
 * enemy coin과 player coin을 모두 그리고 betting zone의 시간 animation
 * 새로고침 하면 여기 안탐
 * @param {boolean} _state  : true -> player가 배팅할 차례 | false -> enemy가 배팅할 차례
 */
export default (_state) => {
  const BETTING_ZONE = document.querySelector('.betting-zone');
  if (!BETTING_ZONE) return errorManagement({ errCase: 'errorComn', message: '.betting-zone not found' });
  const BETTING_COINS = BETTING_ZONE.querySelector('.bet-coins');
  if (!BETTING_COINS) return errorManagement({ errCase: 'errorComn', message: '.bet-coins not found' });
  const BET_COINS = BETTING_COINS.querySelectorAll('li');
  if (!BET_COINS || BET_COINS.length < 1) return;

  let liEl = new Object();
  let minuteEl = new Object();
  let hourEl = new Object();

  for (let i = 0; i < BET_COINS.length; i++) {
    liEl = BET_COINS[i];
    minuteEl = liEl.querySelector('span.m');
    hourEl = liEl.querySelector('span.h');
    if (liEl.classList.contains('e')) {
      // enemy coin
      _state ? posClock(hourEl, minuteEl) : animateClock(hourEl, minuteEl, false);
    } else {
      // player coin
      _state ? animateClock(hourEl, minuteEl, false) : posClock(hourEl, minuteEl);
    }
  }
};
