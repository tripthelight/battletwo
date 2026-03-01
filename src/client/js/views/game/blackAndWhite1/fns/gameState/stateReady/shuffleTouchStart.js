// import { activeIndex, posX, posY } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";
import { reactiveState } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";

export default (e) => {
  const ulEl = Array.from(e.target.closest("ul").children);
  reactiveState.activeIndex = ulEl.indexOf(e.target);
  const nonshuffleEl = document.querySelectorAll("ul.cube li");
  for (let i = 0; i < nonshuffleEl.length; i++) {
    nonshuffleEl[i].classList.add("empty");
  }
  e.target.classList.remove("empty");
  e.target.classList.add("drag");
  reactiveState.posX = e.targetTouches[0].clientX;
  reactiveState.posY = e.targetTouches[0].clientY;
  for (let i = 0; i < nonshuffleEl.length; i++) {
    if (nonshuffleEl[i].offsetTop > 0) {
      nonshuffleEl[i - 1].classList.add("cubeEnd");
      nonshuffleEl[i].classList.add("cubeBreak");
      break;
    }
  }
};
