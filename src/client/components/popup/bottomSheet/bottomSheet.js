import '@/client/assets/scss/components/bottomSheet.scss';
import { errorManagement } from '@/client/js/module/errorManagement';
import deviceStateStore from '@/client/store/deviceStateStore.js';

/**
 * COMMON COMPONTS
 * bottom sheet
 * main(): show() | hide()
 */
export const bottomSheet = {
  show: (_txt, _delay) => {
    // console.log('bottomSheet show :: ');
    setTimeout(bottomSheetDraw, 1, _txt, _delay);
  },
  hide: () => {
    // console.log('bottomSheet hide :: ');
  },
};

/**
 * draw bottom sheet
 * @param {string} _txt - bottom sheet 문구
 * @param {number} _delay - bottom sheet 대기 시간 단위: 1000이 1초
 * @returns - null
 */
function bottomSheetDraw(_txt, _delay) {
  const CONTAINER = document.getElementById('container');
  if (!CONTAINER) return errorManagement({ errCase: 'errorComn', message: 'bottom sheet를 그리는 중 #container 엘리먼트가 없습니다.' });

  setTimeout(function () {
    let elem = document.createElement('div');
    let inner = document.createElement('span');
    let btnClose = document.createElement('a');
    btnClose.setAttribute('title', 'close popup');
    btnClose.setAttribute('href', 'javascript:void(0);');
    inner.innerHTML = _txt;
    elem.appendChild(inner);
    const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
    if (deviceState === 'pc') elem.appendChild(btnClose);

    // const BOTTOM_SHEETS = document.querySelectorAll('.bottom-sheet');
    // if (BOTTOM_SHEETS.length > 0) for (let i = 0; i < BOTTOM_SHEETS.length; i++) BOTTOM_SHEETS[i].add('bottom-sheet-' + i);

    // let bgEl = document.createElement('div');
    // bgEl.classList.add('bg');
    // if (deviceState === 'mobile') elem.appendChild(inner);

    elem.classList.add('bottom-sheet');

    // elem.classList.add('hide');
    elem.style.opacity = 0;
    elem.style.bottom = '-100%';
    CONTAINER.appendChild(elem);

    setTimeout(function () {
      closeButtonClickEvent(btnClose);
      bottomSheetStyle(elem, inner, _delay);
    }, 1);
  }, 1);
}

/**
 * PC일 경우 close button click event
 * @param {HTMLElement} _btn - bottom sheet html element
 */
function closeButtonClickEvent(_btn) {
  _btn.onclick = function (event) {
    event.preventDefault();
    const TARGET = event.target.closest('.bottom-sheet');
    if (TARGET) {
      TARGET.style.bottom = 0 - TARGET.clientHeight + 'px';
    }
  };
}

function bottomSheetStyle(_elem, _inner, _delay) {
  setTimeout(function () {
    _elem.style.opacity = 1;
    _elem.style.bottom = 0 - _elem.clientHeight + 'px';

    setTimeout(function () {
      _elem.classList.add('show');
      setTimeout(bottomSheetTouch, 1, _elem);
      setTimeout(bottomSheetTouch, 1, _inner);
      setTimeout(function () {
        _elem.classList.remove('show');
        setTimeout(function () {
          _elem.style.opacity = 0;
          _elem.remove();
        }, 201);
      }, Number(_delay));
    }, 201);
  }, 1);
}

let bsSelectY;
let bsMoveY;
let targetEl;
function bsTouchElementCheck(_event) {
  if (_event.targetTouches[0].target.tagName === 'SPAN') return _event.targetTouches[0].clientY;
  return _event.targetTouches[0].clientY;
}
function bottomSheetSetTarget(_event) {
  if (_event.target.classList.contains('bottom-sheet')) return _event.target;
  return _event.target.parentElement;
}
function bottomSheetTouch(_elem) {
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
  if (deviceState === 'pc') return;
  _elem.addEventListener('touchstart', bsTouchStart, false);
  _elem.addEventListener('touchmove', bsTouchMove, false);
  _elem.addEventListener('touchend', bsTouchEnd, false);
}
function bsTouchStart(_event) {
  bsSelectY = _event.targetTouches[0].clientY;
}
function bsTouchMove(_event) {
  bsMoveY = -(bsSelectY - _event.targetTouches[0].clientY);
  targetEl = bottomSheetSetTarget(_event);
  if (bsMoveY > 0) targetEl.style.transform = 'translate(-50%, ' + bsMoveY + 'px)';
}
function bsTouchEnd(_event) {
  bsSelectY = 0;
  targetEl = bottomSheetSetTarget(_event);
  if (bsMoveY > Math.round(targetEl.clientHeight / 2)) {
    targetEl.classList.remove('show');
    setTimeout(function () {
      targetEl.remove();
    }, 201);
  } else {
    targetEl.style.transform = 'translate(-50%, ' + bsSelectY + 'px)';
  }
}
