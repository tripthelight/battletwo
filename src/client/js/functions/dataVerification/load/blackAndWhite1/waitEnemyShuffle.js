import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import storageKeyDeleteCheck from '@/client/js/functions/dataVerification/load/storageKeyDeleteCheck';

import drawLocalCube from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateWaitEnemyShuffle/drawLocalCube';
import waitEnemyInfo from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateWaitEnemyShuffle/waitEnemyInfo';
import { resumeShuffleReadyAfterReload } from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/startSetOrderSync';

export const WAIT_ENEMY_SHUFFLE_HANDLER = {
  handleReload(storageKeys) {
    if (storageKeyDeleteCheck(storageKeys)) {
      throw throwObj('sessionStorageLoss', 'delete sessionStorage.');
    }

    drawLocalCube();
    waitEnemyInfo();
    resumeShuffleReadyAfterReload();
  },

  handleInitialLoad(storageKeys) {
    for (const key of storageKeys) {
      const val = window.sessionStorage.getItem(key);
      if (val === null) {
        storageMethod('s', 'SET_ITEM', key, '');
      } else {
        storageMethod('s', 'SET_ITEM', key, val);
      }
    }

    waitEnemyInfo();
    resumeShuffleReadyAfterReload();
  },
};
