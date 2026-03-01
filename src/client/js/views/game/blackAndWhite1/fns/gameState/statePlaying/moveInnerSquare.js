import { text } from '@/client/js/functions/language';

export default () => {
  const INNER_SQUARE = document.querySelector(".inner-square");
  if (INNER_SQUARE) {
    const PLAYER_BLOCK = document.querySelector(".player-block");
    if (PLAYER_BLOCK) {
      // INNER_SQUARE.style.top = (PLAYER_BLOCK.offsetTop - (INNER_SQUARE.clientHeight / 2) - 20) + 'px';
      INNER_SQUARE.classList.remove("after");
      INNER_SQUARE.classList.add("before");
      INNER_SQUARE.style.top = PLAYER_BLOCK.offsetTop - INNER_SQUARE.clientHeight + 12 + "px";
      INNER_SQUARE.style.zIndex = 1001;
    }

    const TXTS = INNER_SQUARE.querySelectorAll("span");
    if (TXTS) {
      for (let i = 0; i < TXTS.length; i++) {
        TXTS[0].innerHTML = text.balckandwhite1.yourTurn;
        TXTS[1].innerHTML = text.balckandwhite1.moveNum;
        TXTS[2].innerHTML = "";
      }
      // INNER_SQUARE.style.height = "44px";
      // const PBT = getStyle(INNER_SQUARE, "padding-top") + getStyle(INNER_SQUARE, "padding-bottom");
      // console.log("PBT 2 :: ", PBT);
      // INNER_SQUARE.style.height = `${PBT + 44}px`;
    }
  }
};
