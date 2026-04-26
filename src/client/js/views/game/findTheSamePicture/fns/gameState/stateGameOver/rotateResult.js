import errorManager from '@/client/js/module/errorHandler/errorManager';
import loopPromise from "@/client/js/module/loopPromise";
import linkEvent from "@/client/js/views/game/findTheSamePicture/fns/gameState/stateGameOver/linkEvent";

export default () => {
  const BOARD = document.querySelector(".board");
  const BOARD_LIST = BOARD.querySelectorAll("li");

  for (let i = 0, p = Promise.resolve(); i < BOARD_LIST.length; i++) {
    p = p
      .then(() => {
        return loopPromise(1);
      })
      .then(() => {
        const BTN = BOARD_LIST[i].querySelector("button");
        BTN.style.transform = "rotate(0)";
        if (i === BOARD_LIST.length - 1) linkEvent();
      })
      .catch((error) => {
        errorManager(error, true);
      });
  }
};
