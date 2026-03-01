// import { activeIndex, posX, posY } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";
import { reactiveState } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";
import saveSessionStorage from "@/client/js/views/game/blackAndWhite1/fns/common/saveSessionStorage";

export default (e) => {
  const activeEl = document.querySelector(".active");
  if (activeEl) {
    const ulEl = Array.from(e.target.closest("ul").children);
    const createIndex = ulEl.indexOf(document.querySelector(".active"));
    if (reactiveState.activeIndex > createIndex) {
      if (createIndex == 0) {
        document.querySelector(".active").before(e.target);
      } else {
        document.querySelector(".active").previousElementSibling.after(e.target);
      }
    } else {
      if (createIndex == document.querySelectorAll("ul.cube li").length - 1) {
        document.querySelector(".active").after(e.target);
      } else {
        document.querySelector(".active").nextElementSibling.before(e.target);
      }
    }
  }
  reactiveState.posX = 0;
  reactiveState.posY = 0;
  e.target.style.zIndex = "1";
  const nonshuffleEl = document.querySelectorAll("ul.cube li");
  for (let i = 0; i < nonshuffleEl.length; i++) {
    nonshuffleEl[i].classList.remove("empty");
    nonshuffleEl[i].classList.remove("drag");
    nonshuffleEl[i].classList.remove("active");
    nonshuffleEl[i].classList.remove("cubeEnd");
    nonshuffleEl[i].classList.remove("cubeBreak");
    nonshuffleEl[i].removeAttribute("style");
  }
  saveSessionStorage();
};
