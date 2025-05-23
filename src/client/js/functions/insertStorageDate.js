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

      const KEY_GAME_NAME = compairStorage(String.fromCharCode(...[66, 86, 68, 73, 69, 65, 73, 66, 75, 69]));
      const VAL_GAME_NAME = compairStorage(String.fromCharCode(...[68, 74, 69, 77, 70, 75, 76, 86, 68, 69]));

      const GAME_NAME = window.sessionStorage.getItem(KEY_GAME_NAME);
      if (GAME_NAME === null || (GAME_NAME !== null && GAME_NAME !== VAL_GAME_NAME)) {
        // sessionStorage gameName이 없음
        window.sessionStorage.setItem(KEY_GAME_NAME, VAL_GAME_NAME);
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
