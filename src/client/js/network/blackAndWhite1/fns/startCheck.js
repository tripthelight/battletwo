import { request } from '@/client/js/network/blackAndWhite1/request';
import errorManager from '@/client/js/module/errorHandler/errorManager';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then((_data) => {
      if (_data.rdy) {
        request("startState", { stat: "allReady" });
      } else {
        request("startState", { stat: "enemyReadyEnd" });
      };
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
