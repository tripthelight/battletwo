import '@/client/assets/scss/game/blackAndWhite1/common';
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

import blackAndWhite1GameState from '@/client/js/gameState/blackAndWhite1';

LOADING_EVENT.show();
const GAME_NAME = 'blackAndWhite1';

// —————————————————————————————————————————————
// START GAME ——————————————————————————————————
// —————————————————————————————————————————————
async function startGame() {
  try {
    waitPeer(2);

    // 새로 고침 후 재연결인 경우
    if (getRL(false)) {
      const encryptKey = findCharCode([89, 79, 69, 71, 82, 83, 87, 75, 86, 85]); // gameState
      const decryptVal = storageMethod("s", "GET_ITEM", encryptKey);

      switch (decryptVal) {
        // case 'waitEnemy':
        case findCharCode([66, 81, 78, 88, 74, 80, 70, 65, 90, 71]):
          console.log("새로고침 후 : waitEnemy");
          break;
        // case 'ready':
        case findCharCode([72, 76, 74, 83, 79, 77, 84, 73, 69, 65]):
          console.log("새로고침 후 : ready");
          blackAndWhite1GameState.ready();
          break;
        // case 'waitEnemyShuffle':
        case findCharCode([67, 86, 80, 69, 76, 66, 77, 73, 72, 71]):
          console.log("새로고침 후 : waitEnemyShuffle");
          blackAndWhite1GameState.waitEnemyShuffle();
          break;
        // case 'setOrder':
        case findCharCode([65, 71, 81, 72, 85, 75, 78, 74, 86, 73]):
          console.log("새로고침 후 : setOrder");
          blackAndWhite1GameState.setOrder();
          break;
        // case 'playing':
        case findCharCode([75, 68, 67, 71, 82, 87, 74, 73, 66, 78]):
          console.log("새로고침 후 : playing");
          blackAndWhite1GameState.playing();
          break;
        // case 'gameOver':
        case findCharCode([67, 68, 72, 69, 90, 77, 80, 81, 75, 85]):
          console.log("새로고침 후 : gameOver");
          blackAndWhite1GameState.gameOver();
          break;

        default:
          throw throwObj('errorComn', 'refresh gameState failed.');
      };
    } else {
      blackAndWhite1GameState.ready();
    }

    LOADING_EVENT.hide();
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
window.addEventListener('pageshow', async () => {
  await init();
});
