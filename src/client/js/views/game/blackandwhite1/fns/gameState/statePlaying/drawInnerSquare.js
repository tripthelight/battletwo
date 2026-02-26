import { text } from '@/client/js/functions/language';
import { findContainer, getStyle } from '@/client/js/functions/comnExport';
import { timeInterval_201, timeInterval_203 } from '@/client/js/functions/variable';


import drawBlackSquare from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawBlackSquare";
import activeUserCheck from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/activeUserCheck";
import turnReminderBlink from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnReminderBlink";


import { reactiveState } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";

export default () => {
  if (!document.querySelector(".inner-square")) {
    let elem = document.createElement("div");
    let innerFirst = document.createElement("span");
    let innerInfo1 = document.createElement("span");
    let innerInfo2 = document.createElement("span");

    elem.classList.add("inner-square");
    elem.appendChild(innerFirst);
    elem.appendChild(innerInfo1);
    elem.appendChild(innerInfo2);

    if (window.sessionStorage.firstUser === window.localStorage.uid) {
      elem.classList.add("before");
      innerFirst.innerText = text.balckandwhite1.start;
      innerInfo1.innerText = "";
    } else {
      elem.classList.add("after");
      innerFirst.innerText = window.sessionStorage.enemyNick;
      innerInfo1.innerText = text.balckandwhite1.order;
    }

    if (window.sessionStorage.firstUser == window.localStorage.uid) {
      innerInfo2.innerText = text.balckandwhite1.moveNum;
    } else {
      innerInfo2.innerText = text.balckandwhite1.wait;
    }
    elem.style.width = reactiveState.InnerSquareW + "px";
    if (findContainer()) {
      findContainer().appendChild(elem);
      setTimeout(() => {
        // const INNER_SQUARE = document.querySelector(".inner-square");
        // const PBT = getStyle(INNER_SQUARE, "padding-top") + getStyle(INNER_SQUARE, "padding-bottom");
        // console.log("PBT 1 :: ", PBT);
        elem.style.width = window.innerWidth - 80 + "px";
        if (elem.classList.contains("before")) {
          // elem.style.height = "44px";
          // INNER_SQUARE.style.height = `${PBT + 44}px`;
        } else {
          // elem.style.height = "69px";
          // INNER_SQUARE.style.height = `${PBT + 69}px`;
        }
        elem.classList.add("active");
        drawBlackSquare();
        activeUserCheck();
      }, timeInterval_201);
      setTimeout(() => {
        turnReminderBlink();
      }, timeInterval_203);
    }
  }
};
