import encryptionStore, { updateCompair, updateKeypair } from '@/client/store/encryptionStore';

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
