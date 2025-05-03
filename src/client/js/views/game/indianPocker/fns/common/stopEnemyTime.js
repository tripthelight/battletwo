import { errorManagement } from '@/client/js/module/errorManagement';

export default () => {
  const COINS_ENEMY = document.querySelector('.coins-enemy');
  if (!COINS_ENEMY) errorManagement({ errCase: 'errorComn', message: '.coins-enemy not found' });
  const COINS = COINS_ENEMY.querySelectorAll('li');
  if (!COINS || COINS.length < 1) return;

  let liEl = new Object();
  let minuteEl = new Object();
  let hourEl = new Object();
};
