import '@/client/assets/scss/game/indianPocker/common';
import '@/client/js/common/common';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import initNickName from '@/client/js/functions/initNickName';
import findNickname from '@/client/js/functions/findNickname';
import waitPeer from '@/client/js/functions/waitPeer';
import { connectSignaling } from '@/client/js/module/webRTC/connectSignaling';
import deliverToGame from '@/client/js/module/webRTC/reliable/indianPoker/deliverToGame';
import handleEnvelope from '@/client/js/module/webRTC/reliable/indianPoker/handleEnvelope';
import makeCard from '@/client/js/views/game/indianPocker/fns/common/makeCard/makeCard';
import makePayload from '@/client/js/views/game/indianPocker/fns/common/makePayload/makePayload';
// import indianPockerGameState from '@/client/js/gameState/indianPocker';

LOADING_EVENT.show();
const GAME_NAME = 'indianPocker';

// —————————————————————————————————————————————
// START GAME ——————————————————————————————————
// —————————————————————————————————————————————
async function startGame() {
  waitPeer(2);
  await makeCard();
  makePayload(); // 카드 선택 시 보여지는 카드의 svg > path의 number/T payload
  // indianPockerGameState.choiceCard();
  LOADING_EVENT.hide();
};

// —————————————————————————————————————————————
// INIT ————————————————————————————————————————
// —————————————————————————————————————————————
async function init() {
  await initNickName();
  waitPeer(1, findNickname('localPlayer'));
  connectSignaling(false, { deliverToGame, handleEnvelope, startGame, gameName: GAME_NAME });
}

// —————————————————————————————————————————————
// PAGE SHOW ———————————————————————————————————
// —————————————————————————————————————————————
window.addEventListener('pageshow', () => {
  try {
    init();
  } catch (error) {
    errorManager(error, false);
  }
});
