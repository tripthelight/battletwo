import encryptionStore, { updateCompair, updateKeypair } from '@/client/store/encryptionStore';

export default async (msgData) => {
  try {
    const { storageData } = msgData;
    console.log('storageData : ', storageData);
    // cardNum 10개와 coinNum 30개 합쳐서, coinNum을 40으로 재지정
    const keyLen10 = Object.keys(storageData).find((k) => storageData[k].length === 10);
    const keyLen30 = Object.keys(storageData).find((k) => storageData[k].length === 30);
    if (keyLen10 && keyLen30) {
      storageData[keyLen30] = [...storageData[keyLen30], ...storageData[keyLen10]];
    }

    encryptionStore.dispatch(updateCompair({ compair: Object.assign({}, storageData) }));
  } catch (error) {
    throw error;
  }
};
