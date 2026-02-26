import roundCircleStyle from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/roundCircleStyle";

export default (scoreBoradEl) => {
  const SCORE_BOARD_EL = document.querySelector(".round-circle");
  if (!SCORE_BOARD_EL) {
    let roundEl = document.createElement("div");
    roundEl.classList.add("round-circle");
    let numEl = document.createElement("span");
    numEl.classList.add("num");
    numEl.innerText = "1";
    let rEl = document.createElement("span");
    numEl.classList.add("r");
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
      roundCircleStyle(roundEl, scoreBoradEl);
    }
  }
};
