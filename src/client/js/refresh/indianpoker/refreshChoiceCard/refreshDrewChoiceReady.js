import findCharCode from '@/client/js/functions/findCharCode';
import flipEnemyCardCheck from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipEnemyCardCheck';

export default () => {
  const CHOICE_CARD_EL = document.querySelector('.choice-card');
  if (!CHOICE_CARD_EL) return;

  /*
  const ENEMY_CHOICE_NUM = window.sessionStorage.enemyFirstNumber;
  if (!ENEMY_CHOICE_NUM) return;
  const PLAYER_CHOICE_NUM = window.sessionStorage.playerFirstNumber;
  if (!PLAYER_CHOICE_NUM) return;
  */

  const encryptKey1 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
  const encryptKey2 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
  const ENEMY_CHOICE_NUM = window.sessionStorage.getItem(encryptKey1);
  if (!ENEMY_CHOICE_NUM) return;
  const PLAYER_CHOICE_NUM = window.sessionStorage.getItem(encryptKey2);
  if (!PLAYER_CHOICE_NUM) return;

  flipEnemyCardCheck(Number(ENEMY_CHOICE_NUM), Number(PLAYER_CHOICE_NUM));
};
