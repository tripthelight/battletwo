import { timeInterval_202 } from '@/client/js/functions/variable';
import BlackSquareInit from '@/client/js/views/game/blackAndWhite1/fns/common/BlackSquareInit';

export default () => {
  if (!document.querySelector(".black-square")) {
    let elem = document.createElement("div");
    elem.classList.add("black-square");

    let w = BlackSquareInit().w;
    let h = BlackSquareInit().h;
    elem.style.width = w + "px";
    elem.style.height = h + "px";
    elem.style.marginLeft = 0 - w / 2 + "px";
    const PLAY_BLOCK = document.querySelector(".player-block");
    if (PLAY_BLOCK) {
      PLAY_BLOCK.appendChild(elem);
      setTimeout(() => {
        const INFO_BOARD = document.querySelector(".inner-square");
        if (INFO_BOARD) {
          if (INFO_BOARD.classList.contains("before")) {
            INFO_BOARD.style.top = PLAY_BLOCK.offsetTop - INFO_BOARD.clientHeight - 20 + "px";
          }
        }
      }, timeInterval_202);
    }
  }
};
