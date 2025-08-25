import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import { text } from '@/client/js/functions/language';
import closePopup from '@/client/js/functions/popup';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default () => {
  // element | seeeion 체크
  const CONTAINER = document.getElementById('container');
  if (!CONTAINER) throw throwObj('elementLoss', '#container not found.');
  const CHOICE_CARD_INFO = CONTAINER.querySelector('.choice-card-info');
  if (CHOICE_CARD_INFO) return;

  // session storage check
  const encryptKey1 = findCharCode([68, 71, 87, 77, 85, 66, 65, 84, 88, 69]); // enemyCardChoiceReady
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  if (encryptVal1 !== '' && typeof X.dec(encryptVal1) === 'boolean') return;

  // 명령
  const elem = document.createElement('div');
  const inner = document.createElement('div');
  const spanEl = document.createElement('span');
  const btnClose = document.createElement('button');
  const bg = document.createElement('div');
  bg.classList.add('popup-bg');
  inner.classList.add('popup-inner');
  btnClose.setAttribute('aria-label', text.popup.btnClose);

  spanEl.innerHTML = text.indianpocker.choiceFirst;

  btnClose.classList.add('close-popup');
  inner.appendChild(btnClose);
  inner.appendChild(spanEl);
  elem.appendChild(bg);
  elem.appendChild(inner);
  elem.classList.add('choice-card-info');
  elem.classList.add('modal-popup');
  CONTAINER.appendChild(elem);

  btnClose.onclick = () => {
    closePopup(btnClose);
  };
};
