import { text } from '@/client/js/functions/language';

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
  }
};
