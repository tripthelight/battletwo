import { timeInterval_1 } from '@/client/js/functions/variable';

export default () => {
  const COIN_WRAP = document.querySelector('.coins-player');
  if (!COIN_WRAP) return;
  const COINS = COIN_WRAP.querySelectorAll('li');
  if (COINS.length == 0) return;

  // setTimeout(() => {
  //   COIN_WRAP.classList.add("active");
  //   let delayCount = 0;
  //   for (let i = 0; i < COINS.length; i++) {
  //     delayCount += 0.1;
  //     COINS[i].style.animationDelay = delayCount + "s";
  //   }
  // }, timeInterval_1);
};
