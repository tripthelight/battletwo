import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { timeInterval_1, timeInterval_1000 } from "@/client/js/functions/variable";
import sendPlayerClickData from "@/client/js/views/game/findTheSamePicture/fns/common/sendPlayerClickData";
import playerCardAcitveClass from "@/client/js/views/game/findTheSamePicture/fns/common/playerCardAcitveClass";
import findTheSamePictureGameState from '@/client/js/gameState/findTheSamePicture';
import boardActive from "@/client/js/views/game/findTheSamePicture/fns/common/boardActive";
import findCharCode from '@/client/js/functions/findCharCode';

import saveResult from "@/client/js/views/game/findTheSamePicture/fns/gameState/stateGameOver/saveResult";

// true / false module
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';

export default (_num, _state, _orderNum, _clickBoardNum) => {
  const playerActiveNum = Number(_num);

  if (!Number.isInteger(playerActiveNum) || playerActiveNum < 0 || playerActiveNum > 20) {
    throw throwObj('dataManipulation', "movePlayerIcon.js - player active value failed.");
  }

  if (playerActiveNum > 19) return;

  const PLAYER_ICON = document.querySelector(".player-icon");
  if (!PLAYER_ICON) throw throwObj('elementLoss', "movePlayerIcon.js - .player-icon element failed.");
  const PLAYER_BLOCK = document.querySelector(".player-block");
  if (!PLAYER_BLOCK) throw throwObj('elementLoss', "movePlayerIcon.js - .player-block element failed.");
  const PLAYER_LIST = PLAYER_BLOCK.querySelector("ul");
  if (!PLAYER_LIST) throw throwObj('elementLoss', "movePlayerIcon.js - .player-block ul element failed.");
  const PLAYER_CARDS = PLAYER_LIST.querySelectorAll("li");
  if (PLAYER_CARDS.length < 1) throw throwObj('elementLoss', "movePlayerIcon.js - player card element failed.");

  if (_state) {
    sendPlayerClickData(_orderNum, _clickBoardNum, true);
    PLAYER_ICON.classList.add("move");
    setTimeout(() => {
      PLAYER_ICON.classList.remove("move");
      setTimeout(playerCardAcitveClass, timeInterval_1, "reDraw");
      const encryptKey1 = findCharCode([75, 77, 88, 72, 80, 73, 86, 71, 67, 78]); // clickUser
      if (playerActiveNum === 0) {
        storageMethod('s', 'SET_ITEM',
          encryptKey1,
          X.enc(decodeTF(_t([106, 113, 108, 105, 110]))) // "jqlin" : false
        );
        boardActive(false);

        // 게임 결과 저장
        saveResult(true, [115, 109, 114, 110], [100, 103, 118, 101, 97]); // "smrn" : true | "dgvea" : false
        // findTheSamePictureGameState.gameOver(true);
        findTheSamePictureGameState.gameOver();
      } else {
        storageMethod('s', 'SET_ITEM',
          encryptKey1,
          X.enc(decodeTF(_t([107, 102, 112, 110]))) // "kfpn" : true
        );
        boardActive(true);
      }
    }, timeInterval_1000);
  } else {
    if (PLAYER_BLOCK.clientHeight > PLAYER_CARDS[0].clientHeight) {
      if (playerActiveNum === 10) {
        PLAYER_ICON.classList.add("move");
        setTimeout(() => {
          PLAYER_ICON.classList.remove("move");
        }, timeInterval_1000);
      }
    }
  }

  const ACTIVE_CARD = PLAYER_CARDS[playerActiveNum];
  if (!ACTIVE_CARD) throw throwObj('elementLoss', "movePlayerIcon.js - active card element failed.");

  const x = ACTIVE_CARD.offsetLeft;
  const y = ACTIVE_CARD.offsetTop;
  const w = ACTIVE_CARD.clientWidth;
  const h = ACTIVE_CARD.clientHeight;

  PLAYER_ICON.style.left = `${x + 1}px`;
  PLAYER_ICON.style.top = `${y + 1}px`;
  PLAYER_ICON.style.width = `${w - 2}px`;
  PLAYER_ICON.style.height = `${h - 2}px`;
  setTimeout(playerCardAcitveClass, timeInterval_1000, "remove");
};
