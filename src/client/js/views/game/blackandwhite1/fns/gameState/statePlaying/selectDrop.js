import disabledSelectInit from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/disabledSelectInit";
import comnPcEnd from "./comnPcEnd.js";

export default (event) => {
  event.preventDefault();
  const CUBE = document.querySelector(".cube.ready.start");
  const BLACK_SQUARE = document.querySelector(".black-square");
  if (BLACK_SQUARE.classList.contains("over")) {
    BLACK_SQUARE.classList.remove("over");
  }

  const data = event.dataTransfer.getData("Text");
  const NUM_DATA = Number(data);
  if (NUM_DATA % 2 === 0) {
    BLACK_SQUARE.classList.remove("odd");
    BLACK_SQUARE.classList.add("even");
  } else {
    BLACK_SQUARE.classList.remove("even");
    BLACK_SQUARE.classList.add("odd");
  }
  const NUM_EL = document.createElement("span");
  NUM_EL.innerHTML = NUM_DATA;
  const SPAN_EL = BLACK_SQUARE.querySelectorAll("span");
  if (SPAN_EL.length === 0) {
    BLACK_SQUARE.appendChild(NUM_EL);
    // disabled select
    disabledSelectInit();
    comnPcEnd(CUBE, NUM_DATA);
  }
  if (SPAN_EL.length > 0) {
    for (let i = 0; i < SPAN_EL.length; i++) {
      SPAN_EL[i].remove();
    }
    BLACK_SQUARE.appendChild(NUM_EL);
    // disabled select
    disabledSelectInit();
    comnPcEnd(CUBE, NUM_DATA);
  }
  // event.target.appendChild(document.getElementById(data));
};
