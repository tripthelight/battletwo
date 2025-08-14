import encryptionStore, { updateCompair, updateKeypair } from '@/client/store/encryptionStore';
import CRC32 from 'crc-32';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import setCookies from '@/client/js/module/cookies/setCookies';
import bcrypt from 'bcryptjs';

export default async (msgData) => {
  try {
    const { storageData, keypair } = msgData;

    // 내가 sessionStorage key를 암호화 할 때 사용할 keypair가 포함되어 있음
    console.log('storageData >>>>>>>>>>>>> ', storageData);
    // 상대 peer의 AES secret key
    console.log('keypair >>>>>>>>>>>>>>>>> ', keypair);

    encryptionStore.dispatch(updateCompair({ compair: Object.assign({}, storageData) }));
    encryptionStore.dispatch(updateKeypair({ keypair: keypair }));

    const encryptKey = findCharCode([83, 88, 73, 69, 85, 68, 66, 76, 80, 78]); // SECRET_KEY
    const encryptVal = window.sessionStorage.getItem(encryptKey);
    if (encryptVal === null) {
      const compair = encryptionStore.getState().encryptionState.compair;
      console.log('compair ==========> ', compair);
      storageMethod('s', 'SET_ITEM', encryptKey, compair[encryptKey]);
    };
  } catch (error) {
    throw error
  };
};
