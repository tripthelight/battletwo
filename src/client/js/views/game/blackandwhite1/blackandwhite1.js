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

LOADING_EVENT.show();
const GAME_NAME = 'blackAndWhite1';

// —————————————————————————————————————————————
// START GAME ——————————————————————————————————
// —————————————————————————————————————————————
async function startGame() {
  try {
    waitPeer(2);

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
