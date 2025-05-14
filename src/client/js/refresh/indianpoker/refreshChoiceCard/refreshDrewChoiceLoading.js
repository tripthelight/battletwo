import { LOADING_EVENT } from '@/client/components/popup/full/loading';

export default () => {
  const CHOICE_CARD_EL = document.querySelector('.choice-card');
  if (!CHOICE_CARD_EL) return;
  const ENEMY_CARD_CHOICE_READY = window.sessionStorage.enemyCardChoiceReady;
  if (!ENEMY_CARD_CHOICE_READY) return;
  const ENEMY_CHOICE_NUM = window.sessionStorage.enemyFirstNumber;
  const PLAYER_CHOICE_NUM = window.sessionStorage.playerFirstNumber;

  if (ENEMY_CARD_CHOICE_READY === 'false' && !ENEMY_CHOICE_NUM && !PLAYER_CHOICE_NUM) LOADING_EVENT.show();
};
