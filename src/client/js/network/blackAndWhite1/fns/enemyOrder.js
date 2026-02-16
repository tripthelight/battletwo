import errorManager from '@/client/js/module/errorHandler/errorManager';
import saveEnemyCube from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/saveEnemyCube';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then((_data) => {
      saveEnemyCube(_data.order);
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
