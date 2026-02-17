import { text } from '@/client/js/functions/language';
import shuffleCube from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/shuffleCube';
import createStartBtn from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/createStartBtn';

export default () => {
  const INFO_SHUFFLE_EL = document.querySelector(".info-shuffle");
  if (!INFO_SHUFFLE_EL) {
    const isElem = document.createElement("div");
    const inner = document.createElement("span");
    inner.innerText = text.balckandwhite1.info;
    isElem.classList.add("info-shuffle");
    isElem.appendChild(inner);
    const CONTAINER_EL = document.getElementById("container");
    if (CONTAINER_EL) {
      const TOP_STYLE_EL = CONTAINER_EL.querySelector(".enemy-block");
      if (TOP_STYLE_EL) {
        CONTAINER_EL.appendChild(isElem);
        isElem.style.top = TOP_STYLE_EL.clientHeight - isElem.clientHeight + "px";
      }
    }
  };

  // 다음 단계
  shuffleCube();
  createStartBtn();
};
