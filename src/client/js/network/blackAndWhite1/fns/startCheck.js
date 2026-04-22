import errorManager from '@/client/js/module/errorHandler/errorManager';
import {
  isGameStateProof
} from '@/client/js/views/game/blackAndWhite1/fns/common/gameStateSync';
import {
  markEnemyShuffleReady,
  tryStartSetOrder
} from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/startSetOrderSync';

export default (_data) => {
  const PROMISE = new Promise((resolve) => {
    resolve(_data);
  });

  PROMISE
    .then((data) => {
      const remoteReady = isGameStateProof('setOrder', data?.rdyCode);
      if (!remoteReady) return;

      markEnemyShuffleReady(data.nick);
      tryStartSetOrder();
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
