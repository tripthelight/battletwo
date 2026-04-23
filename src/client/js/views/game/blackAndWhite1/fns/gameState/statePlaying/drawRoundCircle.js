import roundCircleStyle from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/roundCircleStyle";
import { getCurrentRound } from '@/client/js/views/game/blackAndWhite1/fns/common/roundResultStorage';

export const applyRoundCircleData = (roundEl) => {
  const round = getCurrentRound();
  const spanEls = roundEl.querySelectorAll('span');

  if (round === 10) {
    roundEl.innerHTML = '';
    const spanInner = document.createElement('span');
    spanInner.innerText = 'GAME OVER';
    roundEl.appendChild(spanInner);
    return;
  }

  if (spanEls.length < 3) {
    roundEl.innerHTML = '';

    const numEl = document.createElement('span');
    const rEl = document.createElement('span');
    const oundEl = document.createElement('span');

    numEl.classList.add('num');
    rEl.classList.add('r');
    oundEl.classList.add('ound');

    rEl.innerText = 'R';
    oundEl.innerText = 'ound';

    roundEl.appendChild(numEl);
    roundEl.appendChild(rEl);
    roundEl.appendChild(oundEl);
  }

  const numEl = roundEl.querySelector('.num');
  if (numEl) numEl.innerText = String(round);
};

export default (scoreBoradEl) => {
  const SCORE_BOARD_EL = document.querySelector(".round-circle");
  if (SCORE_BOARD_EL) {
    applyRoundCircleData(SCORE_BOARD_EL);
    return;
  }

  if (!SCORE_BOARD_EL) {
    let roundEl = document.createElement("div");
    roundEl.classList.add("round-circle");
    let numEl = document.createElement("span");
    numEl.classList.add("num");
    let rEl = document.createElement("span");
    rEl.classList.add("r");
    rEl.innerText = "R";
    let oundEl = document.createElement("span");
    oundEl.classList.add("ound");
    oundEl.innerText = "ound";
    roundEl.appendChild(numEl);
    roundEl.appendChild(rEl);
    roundEl.appendChild(oundEl);
    const CONTAINER_EL = document.getElementById("container");
    if (CONTAINER_EL) {
      CONTAINER_EL.appendChild(roundEl);
      applyRoundCircleData(roundEl);
      roundCircleStyle(roundEl, scoreBoradEl);
    }
  }
};
