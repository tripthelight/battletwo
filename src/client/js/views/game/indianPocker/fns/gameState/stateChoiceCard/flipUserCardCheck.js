import findCharCode from '@/client/js/functions/findCharCode';
import { timeInterval_1 } from '@/client/js/functions/variable';
import flipEnemyCardCheck from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipEnemyCardCheck';

export default () => {
  // 명령
  setTimeout(() => {
    const encryptKey1 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const encryptKey2 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

    // if (window.sessionStorage.enemyFirstNumber && window.sessionStorage.playerFirstNumber) {
    if (encryptVal1 !== null && encryptVal2 !== null) {
      // const enemyNum = Number(window.sessionStorage.enemyFirstNumber);
      // const playerNum = Number(window.sessionStorage.playerFirstNumber);

      const playerNum = Number(encryptVal1);
      const enemyNum = Number(encryptVal2);
      setTimeout(flipEnemyCardCheck, timeInterval_1, enemyNum, playerNum);
    }
  }, timeInterval_1);
};
