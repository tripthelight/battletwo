import { timeInterval_1 } from '@/client/js/functions/variable';
import drawEnemyBlock from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/drawEnemyBlock';

export default () => {
  if (document.querySelector('.round-result')) document.querySelector('.round-result').remove();
  setTimeout(drawEnemyBlock, timeInterval_1);
};
