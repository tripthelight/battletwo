import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';
import stateResultBetting from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/stateResultBetting';

export default (_state) => {
  // element | seeeion 체크
  const CONTAINER = document.getElementById('container');
  if (!CONTAINER) return errorManagement({ errCase: 'errorComn', message: '#container 엘리먼트가 없습니다.' });
  const CHOICE_CARD_INFO = CONTAINER.querySelector('.choice-card-info');
  if (CHOICE_CARD_INFO) return;

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

    if (_state == 'start') spanEl.innerHTML = text.orderStart;
    else if (_state == 'end') spanEl.innerHTML = text.orderEnd;
    else if (_state == 'tie') spanEl.innerHTML = text.orderTie;
    btnClose.onclick = () => {
      stateResultBetting(_state);
      if (document.querySelector('.choice-card-info')) document.querySelector('.choice-card-info').remove();
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
