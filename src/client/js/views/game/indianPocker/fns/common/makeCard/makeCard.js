import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import encryptCardNumber from '@/client/js/views/game/indianPocker/fns/common/makeCard/encryptCardNumber';
import findCharCode from '@/client/js/functions/findCharCode';

export default () => {
  // const cardNum = window.sessionStorage.getItem('cardNum');
  // if (cardNum !== null && JSON.parse(cardNum).length > 0) return;
  // sessionStorage cardNum key 찾기
  const encryptKey = findCharCode([77, 68, 79, 88, 73, 86, 69, 70, 65, 80]);
  const decryptVal = window.sessionStorage.getItem(encryptKey);

  if (decryptVal !== null && JSON.parse(decryptVal).length > 0) return;
  const encryptCardNumbers = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(encryptCardNumber());
    }, timeInterval_1);
  });
  encryptCardNumbers
    .then((numArr) => {
      if (numArr) {
        // storageMethod('s', 'SET_ITEM', 'cardNum', JSON.stringify(numArr));
        storageMethod('s', 'SET_ITEM', encryptKey, JSON.stringify(numArr));
      }
    })
    .catch((err) => {
      console.log('error encryptCardNumbers');
      errorManagement({ errCase: 'errorComn' });
    });
};
