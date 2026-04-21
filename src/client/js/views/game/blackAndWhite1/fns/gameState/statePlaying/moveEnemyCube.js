import { timeInterval_1, timeInterval_202 } from "@/client/js/functions/variable";
import emenyCubeReset from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/emenyCubeReset";

export default (idx) => {
  const ENEMY_CUBES = document.querySelectorAll(".enemy-block ul li");
  const ENEMY_BLACK = document.querySelector(".enemy-black-square");
  if (ENEMY_CUBES.length > 0 && ENEMY_BLACK) {
    if (!ENEMY_CUBES[idx]) return;
    emenyCubeReset(idx);

    let l = ENEMY_BLACK.offsetLeft - ENEMY_CUBES[idx].offsetLeft;
    let t = ENEMY_BLACK.offsetTop - ENEMY_CUBES[idx].offsetTop;
    ENEMY_CUBES[idx].style.zIndex = 1000;
    ENEMY_CUBES[idx].style.transform = "translate(" + l + "px, " + t + "px)";
    setTimeout(() => {
      const BW_CLASS = ENEMY_CUBES[idx].className;
      if (ENEMY_BLACK.classList.contains("even")) ENEMY_BLACK.classList.remove("even");
      if (ENEMY_BLACK.classList.contains("odd")) ENEMY_BLACK.classList.remove("odd");
      ENEMY_BLACK.classList.add(BW_CLASS);
    }, timeInterval_1);
    setTimeout(() => {
      ENEMY_CUBES[idx].remove();
    }, timeInterval_202);
  }
};
