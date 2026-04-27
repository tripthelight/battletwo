import { timeInterval_1000 } from "@/client/js/functions/variable";
import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findIconActive from "@/client/js/views/game/findTheSamePicture/fns/common/findIconActive";
import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';

export default (_reDraw) => {
  // const CLICK_USER = window.sessionStorage.clickUser;
  // if (!CLICK_USER) throw throwObj('sessionStorageLoss', "playerCardAcitveClass.js - clickUser failed.");
  // if (CLICK_USER && CLICK_USER === "false") return;

  const encryptKey1 = findCharCode([75, 77, 88, 72, 80, 73, 86, 71, 67, 78]); // clickUser
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (!encryptVal1) throw throwObj('sessionStorageLoss', "playerCardAcitveClass.js - clickUser failed.");
  if (encryptVal1 !== "" && !X.dec(encryptVal1)) return;

  const PLAYER_BLOCK = document.querySelector(".player-block");
  if (!PLAYER_BLOCK) throw throwObj('elementLoss', "playerCardAcitveClass.js - .player-block element failed.");
  const PLAYER_LIST = PLAYER_BLOCK.querySelector("ul");
  if (!PLAYER_LIST) throw throwObj('elementLoss', "playerCardAcitveClass.js - .player-block ul element failed.");
  const PLAYER_CARDS = PLAYER_LIST.querySelectorAll("li");
  if (!PLAYER_CARDS || PLAYER_CARDS.length < 20) throw throwObj('elementLoss', "playerCardAcitveClass.js - player card element failed.");

  if (_reDraw === "remove") {
    for (let i = 0; i < PLAYER_CARDS.length; i++) {
      if (PLAYER_CARDS[i].classList.contains("card-active-loop")) {
        PLAYER_CARDS[i].classList.remove("card-active-loop");
        break;
      }
    }
    return;
  }

  let playerActiveNum = findIconActive("p");

  if (_reDraw === "reDraw") {
    for (let i = 0; i < PLAYER_CARDS.length; i++) {
      if (PLAYER_CARDS[i].classList.contains("card-active-loop")) {
        PLAYER_CARDS[i].classList.remove("card-active-loop");
        break;
      }
    }
  }

  if (!_reDraw || _reDraw === "reDraw") {
    for (let i = 0; i < PLAYER_CARDS.length; i++) {
      if (i === Number(playerActiveNum - 1)) {
        PLAYER_CARDS[i].classList.add("card-active");
        setTimeout(() => {
          PLAYER_CARDS[i].classList.remove("card-active");
          PLAYER_CARDS[i].classList.add("card-active-loop");
        }, timeInterval_1000);
        break;
      }
    }
  }
};
