import { timeInterval_1 } from '@/client/js/functions/variable';
import removeElement from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/removeElement';

export default () => {
  const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  const COINS_ENEMY = window.sessionStorage.coinsEnemy;

  setTimeout(() => {
    window.sessionStorage.setItem('betState', 'basicBetting');
    window.sessionStorage.setItem('extFirstBet', false);
    window.sessionStorage.removeItem('drewReady');
    window.sessionStorage.removeItem('basicBetReady');
    if (!COINS_PLAYER && !COINS_ENEMY) {
      window.sessionStorage.setItem('coinsPlayer', 20);
      window.sessionStorage.setItem('coinsEnemy', 20);
    }

    if (window.sessionStorage.coinsPlayerBet && Number(window.sessionStorage.coinsPlayerBet) === 1) {
      window.sessionStorage.setItem('basicBettingState', true);
    } else {
      window.sessionStorage.setItem('basicBettingState', false);
    }

    setTimeout(removeElement, timeInterval_1);
  }, timeInterval_1);
};
