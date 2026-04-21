import throwObj from '@/client/js/module/errorHandler/throwObj';
import storageKeyDeleteCheck from '@/client/js/functions/dataVerification/load/storageKeyDeleteCheck';

import sendEnterPlaying from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/sendEnterPlaying';
import enterPlaying from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/enterPlaying';
import drawLocalCube from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawLocalCube';

function restorePlayingScene() {
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) throw throwObj('elementLoss', 'playing reload - gameScene failed.');

  const ENEMY_BLOCK = GAME_SCENE.querySelector('.enemy-block');
  const PLAYER_BLOCK = GAME_SCENE.querySelector('.player-block');
  const PLAYER_CUBE = PLAYER_BLOCK?.querySelector('ul.cube');

  if (!ENEMY_BLOCK || !PLAYER_BLOCK || !PLAYER_CUBE) {
    ENEMY_BLOCK?.remove();
    PLAYER_BLOCK?.remove();
    drawLocalCube();
  }

  enterPlaying();
}

export const PLAYING_HANDLER = {
  handleReload(storageKeys) {
    if (storageKeyDeleteCheck(storageKeys)) {
      throw throwObj('sessionStorageLoss', 'delete sessionStorage.');
    };

    restorePlayingScene();
    sendEnterPlaying();
  },

  handleInitialLoad(storageKeys) {
    if (
      !document.querySelector('#gameScene .player-block') &&
      storageKeys.every((key) => window.sessionStorage.getItem(key) !== null)
    ) {
      restorePlayingScene();
    }

    sendEnterPlaying();
  },
};
