import findCharCode from '@/client/js/functions/findCharCode';
import imgGetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/getCards';

export default () => {
  const CHOICE_CARD_EL = document.querySelector('.choice-card');
  if (!CHOICE_CARD_EL) return;

  /*
  const ENEMY_CHOICE_NUM = window.sessionStorage.enemyFirstNumber;
  if (!ENEMY_CHOICE_NUM) return;
  const ENEMY_UL = window.sessionStorage.ulIndexEnemy;
  if (!ENEMY_UL) return;
  const ENEMY_LI = window.sessionStorage.liIndexEnemy;
  if (!ENEMY_LI) return;
  */

  const encryptKey1 = findCharCode([78, 72, 89, 73, 67, 85, 71, 79, 77, 76]); // ulIndexEnemy
  const encryptKey2 = findCharCode([77, 67, 69, 73, 72, 75, 68, 82, 71, 80]); // liIndexEnemy
  const encryptKey3 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber

  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  const encryptVal3 = window.sessionStorage.getItem(encryptKey3);

  if (!encryptVal1) return;
  if (!encryptVal2) return;
  if (!encryptVal3) return;

  /*
  const UL_ELEM = CHOICE_CARD_EL.querySelectorAll('ul')[ENEMY_UL];
  if (!UL_ELEM) return;
  const LI_ELEM = UL_ELEM.querySelectorAll('li')[ENEMY_LI];
  if (!LI_ELEM) return;
  const IMG_ELEM = LI_ELEM.querySelector('img');
  if (!IMG_ELEM) return;
  LI_ELEM.classList.add('show');
  // IMG_ELEM.setAttribute("src", "/images/svg/indian_poker_card/card_" + ENEMY_CHOICE_NUM + ".svg");
  IMG_ELEM.setAttribute('src', imgGetCardNum(ENEMY_CHOICE_NUM));
  */

  const UL_ELEM = CHOICE_CARD_EL.querySelectorAll('ul')[encryptVal1];
  if (!UL_ELEM) return;
  const LI_ELEM = UL_ELEM.querySelectorAll('li')[encryptVal2];
  if (!LI_ELEM) return;
  const IMG_ELEM = LI_ELEM.querySelector('img');
  if (!IMG_ELEM) return;
  LI_ELEM.classList.add('show');
  IMG_ELEM.setAttribute('src', imgGetCardNum(encryptVal3));
};
