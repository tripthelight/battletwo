import { timeInterval_1 } from '@/client/js/functions/variable.js';
import { errorManagement } from '@/client/js/module/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import encryptCardNumber from '@/client/js/views/game/indianPocker/fns/common/makeCard/encryptCardNumber';

export default () => {
  const encryptCardNumbers = new Promise((resolve, reject) => {
    if (window.sessionStorage.cardNum && JSON.parse(window.sessionStorage.cardNum).length > 0) return;
    setTimeout(() => {
      resolve(encryptCardNumber());
    }, timeInterval_1);
  });
  encryptCardNumbers
    .then((numArr) => {
      storageMethod('s', 'SET_ITEM', 'cardNum', JSON.stringify(numArr));
    })
    .catch((err) => {
      errorManagement({ errCase: 'errorComn' });
    });
};
