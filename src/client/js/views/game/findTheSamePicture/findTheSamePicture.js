import '@/client/assets/scss/game/findTheSamePicture/common';
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

import findTheSamePictureGameState from '@/client/js/gameState/findTheSamePicture';

LOADING_EVENT.show();
const GAME_NAME = 'findTheSamePicture';

// —————————————————————————————————————————————
// START GAME ——————————————————————————————————
// —————————————————————————————————————————————
async function startGame() {
  try {
    waitPeer(2);

    const encryptKey = findCharCode([87, 67, 76, 82, 72, 74, 68, 66, 69, 73]); // gameState
    const decryptVal = storageMethod("s", "GET_ITEM", encryptKey);

    // 새로 고침 후 재연결인 경우
    if (getRL(false)) {
      switch (decryptVal) {
        // case 'waitEnemy':
        case findCharCode([89, 73, 74, 69, 67, 85, 65, 84, 81, 77]):
          console.log("새로고침 후 : waitEnemy");
          break;
        // case 'choiceFirstPlayer':
        case findCharCode([86, 79, 82, 66, 65, 73, 88, 68, 77, 75]):
          console.log("새로고침 후 : choiceFirstPlayer");
          findTheSamePictureGameState.choiceFirstPlayer();
          break;
        // case 'firstUserAni':
        case findCharCode([79, 71, 77, 85, 65, 74, 90, 83, 80, 89]):
          console.log("새로고침 후 : firstUserAni");
          findTheSamePictureGameState.firstUserAni();
          break;
        // case 'playing':
        case findCharCode([77, 90, 68, 76, 69, 83, 85, 74, 70, 79]):
          console.log("새로고침 후 : playing");
          findTheSamePictureGameState.playing();
          break;
        // case 'gameOver':
        case findCharCode([66, 85, 77, 82, 70, 74, 67, 81, 76, 87]):
          console.log("새로고침 후 : gameOver");
          findTheSamePictureGameState.gameOver();
          break;

        default:
          throw throwObj('sessionStorageLoss', 'refresh gameState failed.');
      };
    } else {
      if (decryptVal !== null && decryptVal !== "") {
        switch (decryptVal) {
          case findCharCode([86, 79, 82, 66, 65, 73, 88, 68, 77, 75]): findTheSamePictureGameState.choiceFirstPlayer(); break;
          case findCharCode([79, 71, 77, 85, 65, 74, 90, 83, 80, 89]): findTheSamePictureGameState.firstUserAni(); break;
          case findCharCode([77, 90, 68, 76, 69, 83, 85, 74, 70, 79]): findTheSamePictureGameState.playing(); break;
          case findCharCode([66, 85, 77, 82, 70, 74, 67, 81, 76, 87]): findTheSamePictureGameState.gameOver(); break;
          default: throw throwObj('sessionStorageLoss', 'findTheSamePicture.js - Enter game init gameState failed.');
        };
      } else {
        findTheSamePictureGameState.choiceFirstPlayer();
      }
    }
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
