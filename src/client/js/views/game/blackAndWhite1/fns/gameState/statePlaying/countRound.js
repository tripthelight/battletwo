import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';

export default () => {
  const encryptKey1 = findCharCode([77, 84, 83, 88, 69, 85, 82, 87, 90, 79]); // round
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
  // [260307]
  console.log("round plain :::::::::::: ", encryptVal1);
  console.log("round decrypt :::::::::: ", dec(encryptVal1));

  const ROUND_EL = document.querySelector(".round-circle");
  if (ROUND_EL) {
    let numEl = ROUND_EL.querySelector(".num");
    if (numEl) {
      let roundNum = Number(window.sessionStorage.getItem("round"));

      roundNum += 1;

      window.sessionStorage.setItem("round", roundNum);
      if (roundNum == 10) {
        numEl.innerHTML = "";
        const SPAN_EL = ROUND_EL.querySelectorAll("span");
        for (let i = 0; i < SPAN_EL.length; i++) SPAN_EL[i].remove();
        let spanEl = document.createElement("span");
        spanEl.innerHTML = "GAME OVER";
        ROUND_EL.appendChild(spanEl);
      } else {
        numEl.innerHTML = roundNum;
      }
    }
  }
};
