import encryptionStore, { updateCompair, updateKeypair } from '@/client/store/encryptionStore';
import CRC32 from 'crc-32';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';

export default async (msgData) => {
  try {
    // const { storageData, keypair } = msgData;
    const { storageData } = msgData;

    console.log('storageData : ', storageData);

    // 내가 sessionStorage key를 암호화 할 때 사용할 keypair가 포함되어 있음
    // console.log('storageData >>>>>>>>>>>>> ', storageData);
    // 상대 peer의 AES secret key
    // console.log('keypair >>>>>>>>>>>>>>>>> ', keypair);

    // cardNum 10개와 coinNum 30개 합쳐서, coinNum을 40으로 재지정
    const keyLen10 = Object.keys(storageData).find((k) => storageData[k].length === 10);
    const keyLen30 = Object.keys(storageData).find((k) => storageData[k].length === 30);
    if (keyLen10 && keyLen30) {
      storageData[keyLen30] = [...storageData[keyLen30], ...storageData[keyLen10]];
    }

    encryptionStore.dispatch(updateCompair({ compair: Object.assign({}, storageData) }));
    // encryptionStore.dispatch(updateKeypair({ keypair: keypair }));

    /* const encryptKey = findCharCode([83, 88, 73, 69, 85, 68, 66, 76, 80, 78]); // SECRET_KEY
    const encryptVal = window.sessionStorage.getItem(encryptKey);
    if (encryptVal === null) {
      const compair = encryptionStore.getState().encryptionState.compair;
      storageMethod('s', 'SET_ITEM', encryptKey, compair[encryptKey]);
    }
    console.log('SECRET_KEY : ', window.sessionStorage.getItem(encryptKey));*/

    const encryptKey = findCharCode([83, 88, 73, 69, 85, 68, 66, 76, 80, 78]);
    const compair = encryptionStore.getState().encryptionState.compair;
    console.log('SECRET_KEY : ', compair[encryptKey]);
  } catch (error) {
    throw error;
  }
};
