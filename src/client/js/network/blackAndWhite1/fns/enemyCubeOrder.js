import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/blackAndWhite1/request';
import errorManager from '@/client/js/module/errorHandler/errorManager';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then((_data) => {
      request("enemyOrder", {
        order:
          storageMethod("s", "GET_ITEM",
            findCharCode([79, 77, 69, 88, 68, 89, 65, 70, 67, 78])
          ) // numArr
      });
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
