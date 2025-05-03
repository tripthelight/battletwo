import { comnText } from '@/client/js/functions/language';
import { ELEMENT } from '@/client/js/views/game/indianPocker/fns/rule/element';

/**
 * COMMON COMPONTS
 * bottom buttons
 */
export default {
  main: () => {
    let elem = document.createElement('ul');
    let li;
    let btnCallRaise = document.createElement('button');
    let btnFold = document.createElement('button');
    let btnAllIn = document.createElement('button');
    // btnCallRaise.classList.add("callRaise");
    const EXT_FIRST_BET = window.sessionStorage.extFirstBet;
    if (EXT_FIRST_BET && EXT_FIRST_BET === 'true') {
      btnCallRaise.classList.add('call');
      btnCallRaise.innerHTML = comnText.call;
    } else {
      btnCallRaise.classList.add('betting');
      btnCallRaise.innerHTML = comnText.betting;
    }
    btnCallRaise.setAttribute('disabled', true);
    btnFold.classList.add('fold');
    btnFold.innerHTML = comnText.fold;
    btnAllIn.classList.add('all-in');
    btnAllIn.innerHTML = comnText.allin;
    for (let i = 0; i < 3; i++) {
      li = document.createElement('li');
      if (i === 0) {
        li.appendChild(btnCallRaise);
      }
      if (i === 1) {
        li.appendChild(btnFold);
      }
      if (i === 2) {
        li.appendChild(btnAllIn);
      }
      elem.appendChild(li);
    }
    elem.classList.add('bottom-buttons');
    ELEMENT.CHECK('.player-block', 'findCheck').appendChild(elem);
  },
};
