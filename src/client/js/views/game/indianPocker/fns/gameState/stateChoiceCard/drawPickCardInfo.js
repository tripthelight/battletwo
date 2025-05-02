import { timeInterval_1 } from '@/client/js/functions/variable.js';
import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';
import closePopup from '@/client/js/functions/popup.js';

export default () => {
  // element | seeeion 체크
  const CONTAINER = document.getElementById('container');
  if (!CONTAINER) return errorManagement({ errCase: 'errorComn', message: '#container 엘리먼트가 없습니다.' });
  const CHOICE_CARD_INFO = CONTAINER.querySelector('.choice-card-info');
  if (CHOICE_CARD_INFO) return;
  const ENEMY_CARD_CHOICE_READY = window.sessionStorage.enemyCardChoiceReady;
  if (ENEMY_CARD_CHOICE_READY) return;

  // 명령
  setTimeout(() => {
    let elem = document.createElement('div');
    let inner = document.createElement('div');
    let spanEl = document.createElement('span');
    let btnClose = document.createElement('button');
    let bg = document.createElement('div');
    bg.classList.add('popup-bg');
    inner.classList.add('popup-inner');
    btnClose.setAttribute('aria-label', text.popup.btnClose);

    spanEl.innerHTML = text.indianpocker.choiceFirst;
    btnClose.onclick = () => {
      closePopup(btnClose);
    };

    btnClose.classList.add('close-popup');
    inner.appendChild(btnClose);
    inner.appendChild(spanEl);
    elem.appendChild(bg);
    elem.appendChild(inner);
    elem.classList.add('choice-card-info');
    elem.classList.add('modal-popup');
    CONTAINER.appendChild(elem);
  }, timeInterval_1);
};
