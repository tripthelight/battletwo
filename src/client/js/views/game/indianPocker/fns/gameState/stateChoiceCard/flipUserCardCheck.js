import findCharCode from '@/client/js/functions/findCharCode';
import flipEnemyCardCheck from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipEnemyCardCheck';

export default (params) => {
  const { eNum, pNum }  = params;

  const encryptKey1 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  const encryptKey2 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

  if (
    (pNum && encryptVal1 !== null && encryptVal1 !== '') &&
    (eNum && encryptVal2 !== null && encryptVal2 !== '')
  ) {
    const playerNum = Number(pNum);
    const enemyNum = Number(eNum);
    flipEnemyCardCheck(enemyNum, playerNum);
  }
};
