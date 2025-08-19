import findCharCode from '@/client/js/functions/findCharCode';
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

    const encryptKey1 = findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]); // extFirstBet
    const decryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const encryptVal1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
    if (decryptVal1 === encryptVal1) {
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
