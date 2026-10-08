import '@/client/assets/scss/game/blackAndWhite2/common';
import '@/client/js/common/common';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import initNickName from '@/client/js/functions/initNickName';
import findNickname from '@/client/js/functions/findNickname';
import waitPeer from '@/client/js/functions/waitPeer';
import { connectSignaling, getRL } from '@/client/js/module/webRTC/connectSignaling';
import deliverToGame from '@/client/js/module/webRTC/reliable/indianPoker/deliverToGame';
import handleEnvelope from '@/client/js/module/webRTC/reliable/indianPoker/handleEnvelope';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import storageMethod from '@/client/js/module/storage/storageMethod';
import {
  markGameHistoryEntry,
  skipRetiredGameHistoryEntry,
} from '@/client/js/module/navigation/gameHistory';

import blackAndWhite2GameState from '@/client/js/gameState/blackAndWhite2';

LOADING_EVENT.show();
const GAME_NAME = 'blackAndWhite2';

// —————————————————————————————————————————————
// START GAME ——————————————————————————————————
// —————————————————————————————————————————————
async function startGame() {
  try {
    waitPeer(2);

    const encryptKey = findCharCode([72, 86, 73, 68, 83, 82, 88, 89, 69, 67]); // gameState
    const decryptVal = storageMethod("s", "GET_ITEM", encryptKey);

    // 새로 고침 후 재연결인 경우
    if (getRL(false)) {
      switch (decryptVal) {
        // case 'waitEnemy':
        case findCharCode([81, 78, 74, 80, 86, 83, 73, 82, 75, 72]):
          console.log("새로고침 후 : waitEnemy");
          break;
        // case 'ready':
        case findCharCode([90, 73, 85, 83, 81, 74, 66, 65, 80, 88]):
          console.log("새로고침 후 : ready");
          blackAndWhite2GameState.ready();
          break;
        // case 'playing':
        case findCharCode([81, 86, 90, 89, 70, 66, 83, 75, 84, 77]):
          console.log("새로고침 후 : playing");
          blackAndWhite2GameState.playing();
          break;
        // case 'gameOver':
        case findCharCode([80, 83, 88, 65, 79, 75, 86, 76, 87, 73]):
          console.log("새로고침 후 : gameOver");
          blackAndWhite2GameState.gameOver();
          break;

        default:
          throw throwObj('sessionStorageLoss', 'refresh gameState failed.');
      };
    } else {
      // 흑과백은 처음 큐브를 섞을 때, 먼저 섞은 PEER가 생기고,
      // 두 PEER의 상태가 달라지는 경우가 있음
      if (decryptVal !== null && decryptVal !== "") {
        switch (decryptVal) {
          case findCharCode([90, 73, 85, 83, 81, 74, 66, 65, 80, 88]): blackAndWhite2GameState.ready(); break;
          case findCharCode([81, 86, 90, 89, 70, 66, 83, 75, 84, 77]): blackAndWhite2GameState.playing(); break;
          case findCharCode([80, 83, 88, 65, 79, 75, 86, 76, 87, 73]): blackAndWhite2GameState.gameOver(); break;
          default: throw throwObj('sessionStorageLoss', 'blackAndWhite2.js - Enter game init gameState failed.');
        };
      } else {
        blackAndWhite2GameState.ready();
      }
    };
    // LOADING_EVENT.hide();
  } catch (error) {
    errorManager(error, false);
  }
};

// —————————————————————————————————————————————
// INIT ————————————————————————————————————————
// —————————————————————————————————————————————
async function init() {
  await initNickName();
  waitPeer(1, findNickname('localPlayer'));
  connectSignaling(false, { deliverToGame, handleEnvelope, startGame, gameName: GAME_NAME });
};

// —————————————————————————————————————————————
// PAGE SHOW ———————————————————————————————————
// —————————————————————————————————————————————
markGameHistoryEntry();

window.addEventListener('pageshow', async (event) => {
  if (skipRetiredGameHistoryEntry(event)) return;
  await init();
});
