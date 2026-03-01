export default () => {
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
