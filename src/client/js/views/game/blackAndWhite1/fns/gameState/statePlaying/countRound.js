import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findRound from '@/client/js/views/game/blackAndWhite1/fns/common/findRound';
import { applyRoundCircleData } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawRoundCircle';

export default () => {
  const encryptKey1 = findCharCode([77, 84, 83, 88, 69, 85, 82, 87, 90, 79]); // round
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);

  const ROUND_EL = document.querySelector(".round-circle");
  if (!ROUND_EL) return;
  const NUM_El = ROUND_EL.querySelector(".num");
  if (!NUM_El) return;

  storageMethod("s", "SET_ITEM",
    findCharCode([77, 84, 83, 88, 69, 85, 82, 87, 90, 79]), // round
    // enc(encryptNumOfStr(_t([101, 119, 119, 114]))), // 'ewwr' : 1
    findRound(encryptVal1) // 현재 round (type: number) + 1
  );

  applyRoundCircleData(ROUND_EL);


  /*
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
  */
};
