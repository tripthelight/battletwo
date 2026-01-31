import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';

export default (_data) => {
  const promise = new Promise((resolve, reject) => {
    resolve(_data);
  });
  promise
    .then((_data) => {
      if (_data) storageMethod(
          's',
          'SET_ITEM',
          findCharCode([90, 77, 71, 84, 65, 68, 87, 81, 70, 82]), // drewCardReady
          X.enc(decodeTF(_t([99, 119, 112, 97]))) // "cwpa" : true
        );
    })
    .catch((error) => {
      // return errorComn(error);
      console.log('error - drewReadyCheckResult.js - not drewCardReady');
      return errorManagement({ errCase: 'errorComn' });
    });
};
