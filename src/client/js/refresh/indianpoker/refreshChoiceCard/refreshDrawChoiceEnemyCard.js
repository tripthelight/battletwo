import imgGetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/getCards';

export default () => {
  const CHOICE_CARD_EL = document.querySelector('.choice-card');
  if (!CHOICE_CARD_EL) return;
  const ENEMY_CHOICE_NUM = window.sessionStorage.enemyFirstNumber;
  if (!ENEMY_CHOICE_NUM) return;
  const ENEMY_UL = window.sessionStorage.ulIndexEnemy;
  if (!ENEMY_UL) return;
  const ENEMY_LI = window.sessionStorage.liIndexEnemy;
  if (!ENEMY_LI) return;
  const UL_ELEM = CHOICE_CARD_EL.querySelectorAll('ul')[ENEMY_UL];
  if (!UL_ELEM) return;
  const LI_ELEM = UL_ELEM.querySelectorAll('li')[ENEMY_LI];
  if (!LI_ELEM) return;
  const IMG_ELEM = LI_ELEM.querySelector('img');
  if (!IMG_ELEM) return;
  LI_ELEM.classList.add('show');
  // IMG_ELEM.setAttribute("src", "/images/svg/indian_poker_card/card_" + ENEMY_CHOICE_NUM + ".svg");
  IMG_ELEM.setAttribute('src', imgGetCardNum(ENEMY_CHOICE_NUM));
};
