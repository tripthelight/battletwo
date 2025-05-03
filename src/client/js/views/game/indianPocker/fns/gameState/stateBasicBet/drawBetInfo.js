import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';
import closePopup from '@/client/js/functions/popup';
import { timeInterval_1 } from '@/client/js/functions/variable';

export default () => {
  // sesstionStorage: basicBetInfoPopup 체크해서 true면 안보임
  const BASIC_BET_INFO_POPUP = window.sessionStorage.basicBetInfoPopup;
  if (BASIC_BET_INFO_POPUP && BASIC_BET_INFO_POPUP === 'true') return;

  // element | seeeion 체크
  const CONTAINER = document.getElementById('container');
  if (!CONTAINER) return errorManagement({ errCase: 'errorComn', message: '#container 엘리먼트가 없습니다.' });
  const DRAW_BET_INFO = CONTAINER.querySelector('.draw-bet-info');
  if (DRAW_BET_INFO) return;
  const BASIC_BETTING_STATE = window.sessionStorage.basicBettingState;
  if (!BASIC_BETTING_STATE || BASIC_BETTING_STATE === 'true') return;

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
    spanEl.innerHTML = text.indianpocker.basicBet;
    btnClose.onclick = () => {
      closePopup(btnClose);
      window.sessionStorage.setItem('basicBetInfoPopup', true);
    };

    btnClose.classList.add('close-popup');
    inner.appendChild(btnClose);
    inner.appendChild(spanEl);
    elem.appendChild(bg);
    elem.appendChild(inner);
    elem.classList.add('draw-bet-info');
    elem.classList.add('modal-popup');
    CONTAINER.appendChild(elem);
  }, timeInterval_1);
};
