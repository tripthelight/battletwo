import { debug } from '@/client/js/module/debug';
import encryptionStore, { updateCompair, updateKeypair } from '@/client/store/encryptionStore';
import compairStorage from '@/client/js/functions/compairStorage';
import CryptoJS from 'crypto-js';
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';

export default async (msgData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { storageData, keypair } = msgData;

      console.log('storageData >>>>>>>>>>>>> ', storageData);
      console.log('keypair >>>>>>>>>>>>>>>>> ', keypair);

      encryptionStore.dispatch(updateCompair({ compair: Object.assign({}, storageData) }));
      encryptionStore.dispatch(updateKeypair({ keypair: keypair }));

      /*
      const encryptKey1 = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
      const encryptVal1 = findCharCode([74, 75, 71, 90, 87, 79, 85, 69, 65, 88]); // waitEnemy
      const decryptVal1 = window.sessionStorage.getItem(encryptKey1);
      // secret key를 sessionStorage에 저장
      const encryptKey2 = findCharCode([83, 88, 73, 69, 85, 68, 66, 76, 80, 78]); // SECRET_KEY
      const decryptVal2 = window.sessionStorage.getItem(encryptKey2);
      if (decryptVal1 !== null && decryptVal1 === encryptVal1 && decryptVal2 === null) {
        storageMethod('s', 'SET_ITEM', encryptKey2, storageData[encryptKey2]);
      }
        */

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
