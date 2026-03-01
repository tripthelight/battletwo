import clearSelectedCard from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/clearSelectedCard";
import disabledSelectInit from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/disabledSelectInit";
import hideInnerSquare from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/hideInnerSquare";
import sendComn from "@/client/js/views/game/blackAndWhite1/fns/common/sendComn";
import { reactiveState } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";

export default (e) => {
  const BLOCK_SQUARE = document.querySelector(".black-square");
  if (BLOCK_SQUARE) {
    reactiveState.selectX = 0;
    reactiveState.selectY = 0;
    e.target.style.zIndex = "1";
    if (BLOCK_SQUARE.classList.contains("over")) {
      const S_NUM = Number(e.target.innerHTML);
      BLOCK_SQUARE.classList.remove("over");
      let numEl = document.createElement("span");
      numEl.innerText = S_NUM;
      if (S_NUM % 2 === 0) {
        BLOCK_SQUARE.classList.remove("odd");
        BLOCK_SQUARE.classList.add("even");
      } else {
        BLOCK_SQUARE.classList.remove("even");
        BLOCK_SQUARE.classList.add("odd");
      }

      const SPAN_EL = BLOCK_SQUARE.querySelectorAll("span");
      if (SPAN_EL.length === 0) {
        BLOCK_SQUARE.appendChild(numEl);
      }
      if (SPAN_EL.length > 0) {
        for (let i = 0; i < SPAN_EL.length; i++) {
          SPAN_EL[i].remove();
        }
        BLOCK_SQUARE.appendChild(numEl);
      }

      if (e.target.classList.contains("in")) {
        const CUBE = document.querySelector(".cube.ready.start");
        if (CUBE) {
          // hide inner-square
          hideInnerSquare();
          const CUBE_WRAP = Array.from(CUBE.children);
          const INDEX = CUBE_WRAP.indexOf(e.target);

          sendComn(S_NUM, INDEX);

          // disabled select
          disabledSelectInit();

          clearSelectedCard(CUBE, S_NUM);
        }
      } else {
        e.target.style.transform = "translate(" + reactiveState.selectX + "px, " + reactiveState.selectY + "px)";
      }
    } else {
      e.target.style.transform = "translate(" + reactiveState.selectX + "px, " + reactiveState.selectY + "px)";
    }
  }
};
