import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import { text } from '@/client/js/functions/language';
import closePopup from '@/client/js/functions/popup';

export default () => {
  // element | seeeion 체크
  const CONTAINER = document.getElementById('container');
  if (!CONTAINER) throw { errCase: 'elementLoss', message: '#container 엘리먼트가 없습니다.' };
  const CHOICE_CARD_INFO = CONTAINER.querySelector('.choice-card-info');
  if (CHOICE_CARD_INFO) return;

  // session storage check
  const bRes = booleanCheck([68, 71, 87, 77, 85, 66, 65, 84, 88, 69]); // enemyCardChoiceReady
  if (bRes !== '') return;

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
