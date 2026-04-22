import errorManager from '@/client/js/module/errorHandler/errorManager';
import { receiveGameStateSync } from '@/client/js/views/game/blackAndWhite1/fns/common/gameStateSync';

export default (_data) => {
  const PROMISE = new Promise((resolve) => {
    resolve(_data);
  });

  PROMISE
    .then((data) => {
      receiveGameStateSync(data);
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
