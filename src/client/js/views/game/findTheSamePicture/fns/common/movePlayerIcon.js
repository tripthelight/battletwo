import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { timeInterval_1, timeInterval_1000 } from "@/client/js/functions/variable";
import sendPlayerClickData from "@/client/js/views/game/findTheSamePicture/fns/common/sendPlayerClickData";
import playerCardAcitveClass from "@/client/js/views/game/findTheSamePicture/fns/common/playerCardAcitveClass";
import findTheSamePictureGameState from '@/client/js/gameState/findTheSamePicture';
import boardActive from "@/client/js/views/game/findTheSamePicture/fns/common/boardActive";
import findCharCode from '@/client/js/functions/findCharCode';

export default (_num, _state, _orderNum, _clickBoardNum) => {
  if (_num > 19) return;
  const PLAYER_ICON = document.querySelector(".player-icon");
  if (!PLAYER_ICON) throw throwObj('elementLoss', "movePlayerIcon.js - .player-icon element failed.");
  const PLAYER_BLOCK = document.querySelector(".player-block");
  if (!PLAYER_BLOCK) throw throwObj('elementLoss', "movePlayerIcon.js - .player-block element failed.");
  const PLAYER_LIST = PLAYER_BLOCK.querySelector("ul");
  if (!PLAYER_LIST) throw throwObj('elementLoss', "movePlayerIcon.js - .player-block ul element failed.");
  const PLAYER_CARDS = PLAYER_LIST.querySelectorAll("li");
  if (PLAYER_CARDS.length < 1) throw throwObj('elementLoss', "movePlayerIcon.js - player card element failed.");

  if (_state) {
    // 맞췄을 경우
    // 즉시 이겼음을 보냄
    sendPlayerClickData(_orderNum, _clickBoardNum, true);
    PLAYER_ICON.classList.add("move");
    setTimeout(() => {
      PLAYER_ICON.classList.remove("move");
      setTimeout(playerCardAcitveClass, timeInterval_1, "reDraw");
      const encryptKey1 = findCharCode([75, 77, 88, 72, 80, 73, 86, 71, 67, 78]); // clickUser
      if (_num === 0) {
        // 승리 이벤트
        console.log("이김 >>>>> ");
        // window.sessionStorage.setItem("clickUser", false);
        storageMethod('s', 'SET_ITEM', encryptKey1, false);
        boardActive(false);
        findTheSamePictureGameState.gameOver(true);
      } else {
        // window.sessionStorage.setItem("clickUser", true);
        storageMethod('s', 'SET_ITEM', encryptKey1, true);
        boardActive(true);
      }
    }, timeInterval_1000);
  } else {
    // 틀렸는데
    // 2줄이고
    // 10번째 카드에서 11번째 카드로 이동해야 할 때
    if (PLAYER_BLOCK.clientHeight > PLAYER_CARDS[0].clientHeight) {
      if (_num === 10) {
        PLAYER_ICON.classList.add("move");
        setTimeout(() => {
          PLAYER_ICON.classList.remove("move");
        }, timeInterval_1000);
      }
    }
  }

  let x = 0;
  let y = 0;
  let w = 0;
  let h = 0;

  x = PLAYER_CARDS[_num].offsetLeft;
  y = PLAYER_CARDS[_num].offsetTop;
  w = PLAYER_CARDS[_num].clientWidth;
  h = PLAYER_CARDS[_num].clientHeight;

  PLAYER_ICON.style.left = `${x + 1}px`;
  PLAYER_ICON.style.top = `${y + 1}px`;
  PLAYER_ICON.style.width = `${w - 2}px`;
  PLAYER_ICON.style.height = `${h - 2}px`;
  setTimeout(playerCardAcitveClass, timeInterval_1000, "remove");
};
