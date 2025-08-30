import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { text } from '@/client/js/functions/language';
import closePopup from '@/client/js/functions/popup';

export default () => {
  // sesstionStorage: basicBetInfoPopup 체크해서 true면 안보임
  // const BASIC_BET_INFO_POPUP = window.sessionStorage.basicBetInfoPopup;
  // if (BASIC_BET_INFO_POPUP && BASIC_BET_INFO_POPUP === 'true') return;

  // element | seeeion 체크
  const CONTAINER = document.getElementById('container');
  if (!CONTAINER) throw throwObj('elementLoss', 'drawBetInfo - #container element not found.');
  const DRAW_BET_INFO = CONTAINER.querySelector('.draw-bet-info');
  if (DRAW_BET_INFO) return;

  // const BASIC_BETTING_STATE = window.sessionStorage.basicBettingState;
  // if (!BASIC_BETTING_STATE || BASIC_BETTING_STATE === 'true') return;
  const encryptKey2 = findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]); // basicBettingState
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  if (encryptVal2 === null || (encryptVal2 !== null && encryptVal2 === '')) return;
  if (X.dec(encryptVal2)) return;

  // 명령
  const elem = document.createElement('div');
  const inner = document.createElement('div');
  const spanEl = document.createElement('span');
  const btnClose = document.createElement('button');
  const bg = document.createElement('div');
  bg.classList.add('popup-bg');
  inner.classList.add('popup-inner');
  btnClose.setAttribute('aria-label', text.popup.btnClose);
  spanEl.innerHTML = text.indianpocker.basicBet;

  btnClose.classList.add('close-popup');
  inner.appendChild(btnClose);
  inner.appendChild(spanEl);
  elem.appendChild(bg);
  elem.appendChild(inner);
  elem.classList.add('draw-bet-info');
  elem.classList.add('modal-popup');
  CONTAINER.appendChild(elem);

  btnClose.onclick = () => {
    closePopup(btnClose);
    // storageMethod('s', 'SET_ITEM', 'basicBetInfoPopup', true);
  };
};
