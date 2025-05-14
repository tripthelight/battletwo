import imgGetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/getCards';

export default () => {
  const CHOICE_CARD_EL = document.querySelector('.choice-card');
  if (!CHOICE_CARD_EL) return;
  const PLAYER_CHOICE_NUM = window.sessionStorage.playerFirstNumber;
  if (!PLAYER_CHOICE_NUM) return;
  const UL_INDEX = window.sessionStorage.ulIndex;
  if (!UL_INDEX) return;
  const LI_INDEX = window.sessionStorage.liIndex;
  if (!LI_INDEX) return;
  const UL_ELEM = CHOICE_CARD_EL.querySelectorAll('ul')[UL_INDEX];
  if (!UL_ELEM) return;
  const LI_ELEM = UL_ELEM.querySelectorAll('li')[LI_INDEX];
  if (!LI_ELEM) return;
  const IMG_ELEM = LI_ELEM.querySelector('img');
  if (!IMG_ELEM) return;
  LI_ELEM.classList.add('show');
  // IMG_ELEM.setAttribute("src", "/images/svg/indian_poker_card/card_" + PLAYER_CHOICE_NUM + ".svg");
  IMG_ELEM.setAttribute('src', imgGetCardNum(PLAYER_CHOICE_NUM));
};
