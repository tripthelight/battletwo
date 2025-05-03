import { timeInterval_1 } from '@/client/js/functions/variable';
import flipEnemyCardCheck from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipEnemyCardCheck';

export default () => {
  // 명령
  setTimeout(() => {
    if (window.sessionStorage.enemyFirstNumber && window.sessionStorage.playerFirstNumber) {
      const enemyNum = Number(window.sessionStorage.enemyFirstNumber);
      const playerNum = Number(window.sessionStorage.playerFirstNumber);
      setTimeout(flipEnemyCardCheck, timeInterval_1, enemyNum, playerNum);
    }
  }, timeInterval_1);
};
