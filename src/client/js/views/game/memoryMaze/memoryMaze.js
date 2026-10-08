import '@/client/assets/scss/game/memoryMaze/common';
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

import memoryMazeGameState from '@/client/js/gameState/memoryMaze';

LOADING_EVENT.show();
const GAME_NAME = 'memoryMaze';

// —————————————————————————————————————————————
// START GAME ——————————————————————————————————
// —————————————————————————————————————————————
async function startGame() {
  try {
    waitPeer(2);

    const encryptKey = findCharCode([87, 67, 81, 66, 68, 75, 88, 86, 71, 74]); // gameState
    const decryptVal = storageMethod("s", "GET_ITEM", encryptKey);

    // 새로 고침 후 재연결인 경우
    if (getRL(false)) {
      switch (decryptVal) {
        // case 'waitEnemy':
        case findCharCode([81, 66, 68, 80, 75, 78, 83, 65, 89, 74]):
          console.log("새로고침 후 : waitEnemy");
          break;
        // case 'ready':
        case findCharCode([72, 80, 76, 68, 90, 82, 81, 89, 75, 69]):
          console.log("새로고침 후 : ready");
          memoryMazeGameState.ready();
          break;
        // case 'playing':
        case findCharCode([82, 81, 79, 73, 85, 90, 66, 78, 77, 75]):
          console.log("새로고침 후 : playing");
          memoryMazeGameState.playing();
          break;
        // case 'gameOver':
        case findCharCode([82, 77, 74, 79, 73, 81, 86, 78, 80, 65]):
          console.log("새로고침 후 : gameOver");
          memoryMazeGameState.gameOver();
          break;

        default:
          throw throwObj('sessionStorageLoss', 'refresh gameState failed.');
      };
    } else {
      // 흑과백은 처음 큐브를 섞을 때, 먼저 섞은 PEER가 생기고,
      // 두 PEER의 상태가 달라지는 경우가 있음
      if (decryptVal !== null && decryptVal !== "") {
        switch (decryptVal) {
          case findCharCode([72, 80, 76, 68, 90, 82, 81, 89, 75, 69]): memoryMazeGameState.ready(); break;
          case findCharCode([82, 81, 79, 73, 85, 90, 66, 78, 77, 75]): memoryMazeGameState.playing(); break;
          case findCharCode([82, 77, 74, 79, 73, 81, 86, 78, 80, 65]): memoryMazeGameState.gameOver(); break;
          default: throw throwObj('sessionStorageLoss', 'memoryMaze.js - Enter game init gameState failed.');
        };
      } else {
        memoryMazeGameState.ready();
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
