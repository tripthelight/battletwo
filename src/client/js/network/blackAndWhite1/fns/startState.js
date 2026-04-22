import errorManager from '@/client/js/module/errorHandler/errorManager';
import {
  isGameStateProof
} from '@/client/js/views/game/blackAndWhite1/fns/common/gameStateSync';
import {
  receiveSetOrderStart
} from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/startSetOrderSync';

export default (_data) => {
  const PROMISE = new Promise((resolve) => {
    resolve(_data);
  });

  PROMISE
    .then((data) => {
      const setOrderReady =
        isGameStateProof('setOrder', data?.statCode);

      if (!setOrderReady) return;
      receiveSetOrderStart(data.firstUser);
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
