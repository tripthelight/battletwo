import { errorManagement } from '@/client/js/module/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';

export default (_data) => {
  const promise = new Promise((resolve, reject) => {
    resolve(_data);
  });
  promise
    .then((_data) => {
      if (_data) storageMethod('s', 'SET_ITEM', 'drewCardReady', true);
    })
    .catch((error) => {
      // return errorComn(error);
      return errorManagement({ errCase: 'errorComn' });
    });
};
