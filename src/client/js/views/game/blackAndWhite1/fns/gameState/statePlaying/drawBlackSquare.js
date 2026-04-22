import { timeInterval_202 } from '@/client/js/functions/variable';
import BlackSquareInit from '@/client/js/views/game/blackAndWhite1/fns/common/BlackSquareInit';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import cubeToNum from '@/client/js/views/game/blackAndWhite1/fns/common/cubeToNum';
import { positionInnerSquare } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/innerSquareTurnView';

export default () => {
  if (!document.querySelector(".black-square")) {
    let elem = document.createElement("div");
    elem.classList.add("black-square");

    let w = BlackSquareInit().w;
    let h = BlackSquareInit().h;
    elem.style.width = w + "px";
    elem.style.height = h + "px";
    elem.style.marginLeft = 0 - w / 2 + "px";

    const encryptKey1 = findCharCode([65, 69, 68, 79, 82, 85, 78, 80, 90, 75]); // beforePlayerNum
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
    if (encryptVal1) {
      const cubeNum = cubeToNum(encryptVal1);
      const NUM_EL = document.createElement("span");
      NUM_EL.innerHTML = cubeNum;
      elem.classList.add(cubeNum % 2 === 0 ? "even" : "odd");
      elem.appendChild(NUM_EL);
    }

    const PLAY_BLOCK = document.querySelector(".player-block");
    if (PLAY_BLOCK) {
      PLAY_BLOCK.appendChild(elem);
      setTimeout(() => {
        const INFO_BOARD = document.querySelector(".inner-square");
        if (INFO_BOARD) {
          positionInnerSquare(INFO_BOARD);
        }
      }, timeInterval_202);
    }
  }
};
