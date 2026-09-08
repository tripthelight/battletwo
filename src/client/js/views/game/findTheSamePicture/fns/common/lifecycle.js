import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import { getOrCreateClientId } from '@/client/js/views/game/findTheSamePicture/fns/common/utils';
import { handleBoardClick } from '@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/action';
import { leaveFinishedGame } from '@/client/js/views/game/findTheSamePicture/fns/gameState/stateGameOver/result';
import {
  applyOrientation,
  scheduleLayout,
} from '@/client/js/views/game/findTheSamePicture/fns/layout/layout';
import {
  scheduleHelloRetry,
  sendHello,
} from '@/client/js/views/game/findTheSamePicture/fns/network/sync';

function prepareRuntime() {
  if (!runtime.clientId) {
    runtime.clientId = getOrCreateClientId();
  }

  runtime.handlers.boardClick = handleBoardClick;
  runtime.handlers.leaveFinishedGame = leaveFinishedGame;
}

export function prepareFindTheSamePicturePage() {
  prepareRuntime();

  const gameScene = document.getElementById('gameScene');

  if (!gameScene) {
    return;
  }

  runtime.elements.gameScene = gameScene;

  if (
    runtime.elements.board &&
    runtime.elements.board.isConnected &&
    runtime.state
  ) {
    scheduleLayout();
  }

  if (!runtime.prepared) {
    runtime.prepared = true;
    window.addEventListener('resize', scheduleLayout, {
      passive: true,
    });
  }

  applyOrientation();
}

export function startFindTheSamePictureGame() {
  prepareRuntime();
  prepareFindTheSamePicturePage();

  runtime.started = true;
  runtime.peerId = null;
  runtime.coordinatorId = null;
  runtime.helloRetryCount = 0;

  sendHello(false);
  scheduleHelloRetry();
}
