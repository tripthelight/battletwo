import startButtonClick from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/startButtonClick";

export default () => {
  const BTN_EL = document.querySelector(".btn-start");
  if (!BTN_EL) {
    const btnEl = document.createElement("button");
    const inner = document.createElement("span");
    inner.innerText = "START";
    btnEl.classList.add("btn-start");
    btnEl.setAttribute("aria-label", "Double tap to start the game.");
    btnEl.appendChild(inner);
    const CONTAINER_EL = document.getElementById("container");
    if (CONTAINER_EL) {
      CONTAINER_EL.appendChild(btnEl);
      startButtonClick(btnEl);
    }
  }
};
