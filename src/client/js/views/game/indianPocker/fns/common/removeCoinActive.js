import { timeInterval_1 } from '@/client/js/functions/variable';

export default () => {
  const COIN_WRAP = document.querySelector('.coins-player');
  if (!COIN_WRAP) return;
  setTimeout(() => {
    COIN_WRAP.classList.remove('active');
    COIN_WRAP.classList.add('disabled');
    const COINS = COIN_WRAP.querySelectorAll('li');
    if (COINS.length > 0) {
      for (let i = 0; i < COINS.length; i++) {
        COINS[i].style.removeProperty('animation-delay');
      }
    }
  }, timeInterval_1);
};
