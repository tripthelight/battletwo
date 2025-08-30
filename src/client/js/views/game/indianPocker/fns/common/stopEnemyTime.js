import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default () => {
  const COINS_ENEMY = document.querySelector('.coins-enemy');
  if (!COINS_ENEMY) throw throwObj('elementLoss', 'stopEnemyTime - .coins-enemy element not found.');
  const COINS = COINS_ENEMY.querySelectorAll('li');
  if (!COINS || COINS.length < 1) return;

  let liEl = new Object();
  let minuteEl = new Object();
  let hourEl = new Object();
};
