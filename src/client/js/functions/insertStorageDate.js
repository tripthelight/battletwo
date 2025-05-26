import { debug } from '@/client/js/module/debug';
import encryptionStore, { updateCompair, updateKeypair } from '@/client/store/encryptionStore';
import compairStorage from '@/client/js/functions/compairStorage';
import CryptoJS from 'crypto-js';

export default async (msgData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { storageData, keypair } = msgData;

      console.log('storageData >>>>>>>>>>>>> ', storageData);
      console.log('keypair >>>>>>>>>>>>>>>>> ', keypair);

      encryptionStore.dispatch(updateCompair({ compair: Object.assign({}, storageData) }));
      encryptionStore.dispatch(updateKeypair({ keypair: keypair }));

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
