import { timeInterval_1 } from "@/client/js/functions/variable";
import drawCard from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/drawCard";
// import drawCardTest from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/drawCardTest";

export default (_pictureBoard) => {
  setTimeout(() => {
    const BOARD = document.querySelector(".board");
    if (BOARD) return;
    const BOARD_EL = document.createElement("ul");
    BOARD_EL.classList.add("board");

    _pictureBoard.appendChild(BOARD_EL);

    setTimeout(drawCard, timeInterval_1, BOARD_EL);
    // setTimeout(drawCardTest, timeInterval_1, BOARD_EL);
  }, timeInterval_1);
};
