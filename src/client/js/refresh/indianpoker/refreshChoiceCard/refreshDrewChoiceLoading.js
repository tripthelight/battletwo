import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';

export default () => {
  const CHOICE_CARD_EL = document.querySelector('.choice-card');
  if (!CHOICE_CARD_EL) return;

  /*
  const ENEMY_CARD_CHOICE_READY = window.sessionStorage.enemyCardChoiceReady;
  if (!ENEMY_CARD_CHOICE_READY) return;
  const ENEMY_CHOICE_NUM = window.sessionStorage.enemyFirstNumber;
  const PLAYER_CHOICE_NUM = window.sessionStorage.playerFirstNumber;
  const ENEMY_CHOICE_NUM = window.sessionStorage.getItem(encryptKey2);
  const PLAYER_CHOICE_NUM = window.sessionStorage.getItem(encryptKey3);
  */

  const encryptKey1 = findCharCode([68, 71, 87, 77, 85, 66, 65, 84, 88, 69]); // enemyCardChoiceReady
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  if (encryptVal1 === null) return;
  const encryptKey2 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  const encryptKey3 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
  const encryptVal3 = window.sessionStorage.getItem(encryptKey3);

  // if (ENEMY_CARD_CHOICE_READY === 'false' && !ENEMY_CHOICE_NUM && !PLAYER_CHOICE_NUM) LOADING_EVENT.show();
  if (!X.dec(encryptVal1) && encryptVal2 !== null && encryptVal3 !== null) LOADING_EVENT.show();
};
