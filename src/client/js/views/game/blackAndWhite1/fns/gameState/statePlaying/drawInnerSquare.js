import { findContainer } from '@/client/js/functions/comnExport';
import { timeInterval_201, timeInterval_203 } from '@/client/js/functions/variable';

import drawBlackSquare from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawBlackSquare";
import activeUserCheck from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/activeUserCheck";
import turnReminderBlink from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnReminderBlink";
import {
  applyInnerSquareTurnView,
  positionInnerSquare,
  shouldHideInnerSquare
} from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/innerSquareTurnView";

import { reactiveState } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";

export default () => {
  const innerSquare = document.querySelector(".inner-square");
  if (innerSquare?.classList.contains("hide")) {
    innerSquare.remove();
  } else if (innerSquare) {
    applyInnerSquareTurnView(innerSquare);
    positionInnerSquare(innerSquare);
    return;
  }

  if (shouldHideInnerSquare()) {
    drawBlackSquare();
    return;
  }

  let elem = document.createElement("div");
  let innerFirst = document.createElement("span");
  let innerInfo1 = document.createElement("span");
  let innerInfo2 = document.createElement("span");

  elem.classList.add("inner-square");
  elem.appendChild(innerFirst);
  elem.appendChild(innerInfo1);
  elem.appendChild(innerInfo2);
  applyInnerSquareTurnView(elem, { preferStart: true });

  elem.style.width = reactiveState.InnerSquareW + "px";
  if (findContainer()) {
    findContainer().appendChild(elem);
    setTimeout(() => {
      elem.style.width = window.innerWidth - 80 + "px";
      elem.classList.add("active");
      drawBlackSquare();
      positionInnerSquare(elem);
      activeUserCheck();
    }, timeInterval_201);
    setTimeout(() => {
      turnReminderBlink();
    }, timeInterval_203);
  }
};
