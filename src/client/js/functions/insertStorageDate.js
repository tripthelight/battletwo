import encryptionStore, { updateCompair, updateKeypair } from '@/client/store/encryptionStore';
import CRC32 from 'crc-32';
import storageMethod from '@/client/js/module/storage/storageMethod';
import setCookies from '@/client/js/module/cookies/setCookies';
import bcrypt from 'bcryptjs';

export default async (msgData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { storageData, keypair } = msgData;

      // 내가 sessionStorage key를 암호화 할 때 사용할 keypair가 포함되어 있음
      console.log('storageData >>>>>>>>>>>>> ', storageData);
      // 상대 peer의 AES secret key
      console.log('keypair >>>>>>>>>>>>>>>>> ', keypair);

      setCookies({
        cookieName: 'gc_kp',
        cookieData: { kp: keypair },
      });

      encryptionStore.dispatch(updateCompair({ compair: Object.assign({}, storageData) }));
      encryptionStore.dispatch(updateKeypair({ keypair: keypair }));

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
