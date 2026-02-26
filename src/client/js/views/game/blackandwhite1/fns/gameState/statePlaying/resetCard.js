import { colorArr } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";

export default () => {
  const BLACK_SQUARE = document.querySelector(".black-square");
  const ENEMY_BLACK_SQUARE = document.querySelector(".enemy-black-square");
  if (BLACK_SQUARE && ENEMY_BLACK_SQUARE) {
    for (let i = 0; i < colorArr.length; i++) {
      BLACK_SQUARE.classList.remove(colorArr[i]);
      ENEMY_BLACK_SQUARE.classList.remove(colorArr[i]);
    }
    const SPAN_EL = BLACK_SQUARE.querySelector("span");
    if (SPAN_EL) {
      SPAN_EL.remove();
    }
  }
};
