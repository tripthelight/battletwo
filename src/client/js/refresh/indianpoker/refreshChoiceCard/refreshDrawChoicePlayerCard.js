import findCharCode from '@/client/js/functions/findCharCode';
import imgGetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/getCards';

export default () => {
  /*
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
  */

  const encryptKey1 = findCharCode([78, 73, 68, 76, 67, 82, 87, 83, 89, 70]); // ulIndex
  const encryptKey2 = findCharCode([83, 70, 79, 67, 65, 71, 66, 87, 77, 86]); // liIndex
  const encryptKey3 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber

  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  const encryptVal3 = window.sessionStorage.getItem(encryptKey3);

  const CHOICE_CARD_EL = document.querySelector('.choice-card');
  if (!CHOICE_CARD_EL) return;
  if (!encryptKey3) return;
  if (!encryptVal2) return;
  if (!encryptVal1) return;
  const UL_ELEM = CHOICE_CARD_EL.querySelectorAll('ul')[encryptVal1];
  if (!UL_ELEM) return;
  const LI_ELEM = UL_ELEM.querySelectorAll('li')[encryptVal2];
  if (!LI_ELEM) return;
  const IMG_ELEM = LI_ELEM.querySelector('img');
  if (!IMG_ELEM) return;
  LI_ELEM.classList.add('show');
  IMG_ELEM.setAttribute('src', imgGetCardNum(encryptVal3));
};
