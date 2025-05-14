import flipEnemyCardCheck from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipEnemyCardCheck';

export default () => {
  const CHOICE_CARD_EL = document.querySelector('.choice-card');
  if (!CHOICE_CARD_EL) return;
  const ENEMY_CHOICE_NUM = window.sessionStorage.enemyFirstNumber;
  if (!ENEMY_CHOICE_NUM) return;
  const PLAYER_CHOICE_NUM = window.sessionStorage.playerFirstNumber;
  if (!PLAYER_CHOICE_NUM) return;

  flipEnemyCardCheck(Number(ENEMY_CHOICE_NUM), Number(PLAYER_CHOICE_NUM));
};
