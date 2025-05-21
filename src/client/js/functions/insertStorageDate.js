import { debug } from '@/client/js/module/debug';
import encryptionStore, { updateCompair, updateKeypair, updateOldpair } from '@/client/store/encryptionStore';
import compairStorage from '@/client/js/functions/compairStorage';

export default async () => {
  return new Promise((resolve, reject) => {
    async function insertStorageDate(msgData) {
      return new Promise(async (resolve, reject) => {
        const { storageData, keypair, oldKeypair } = msgData;
        // console.log('storageData >>>>>>>>>>>>> ', storageData);
        console.log('keypair >>>>>>>>>>>>>>>>> ', keypair);
        console.log('oldKeypair >>>>>>>>>>>>>> ', oldKeypair);

        encryptionStore.dispatch(updateCompair({ compair: Object.assign({}, storageData) }));
        encryptionStore.dispatch(updateKeypair({ keypair: keypair }));
        encryptionStore.dispatch(updateOldpair({ oldpair: oldKeypair }));

        // console.log('sessionStorage key gameName : ', compairStorage('BVDIEAIBKE')); // gameName
        // console.log('sessionStorage val gameName : ', compairStorage('DJEMFKLVDE')); // indianPocker

        const KEY_GAME_NAME_NEW = compairStorage('BVDIEAIBKE', false);
        const VAL_GAME_NAME_NEW = compairStorage('DJEMFKLVDE', false);
        const KEY_GAME_NAME_OLD = compairStorage('BVDIEAIBKE', true);
        const VAL_GAME_NAME_OLD = compairStorage('DJEMFKLVDE', true);

        if (window.sessionStorage.getItem(KEY_GAME_NAME_NEW) === VAL_GAME_NAME_NEW) {
          // 새로운 sessionStorage gameName이 있음
        } else {
          if (window.sessionStorage.getItem(KEY_GAME_NAME_OLD) === VAL_GAME_NAME_OLD) {
            window.sessionStorage.removeItem(KEY_GAME_NAME_OLD);
          }
          window.sessionStorage.setItem(KEY_GAME_NAME_NEW, VAL_GAME_NAME_NEW);
        }

        resolve();
      });
    }

    const webSocket = new WebSocket(`${process.env.SOCKET_HOST}:${process.env.RTC_PORT}`);

    webSocket.onopen = () => {
      // 서버에 암호화된 sessiongStorage 요청
      debug.log('requestStorage 보냄 :::');
      console.log('requestStorage 보냄 ::: ');
      webSocket.send(
        JSON.stringify({
          type: 'requestStorage',
          gameName: 'indianPocker',
        }),
      );
    };
    webSocket.onmessage = async (message) => {
      try {
        const msgData = JSON.parse(message.data);
        console.log('msgData : ', msgData);

        // 서버에서 암호화된 sessiongStorage 받음
        if (msgData.type === 'responseStorage') {
          console.log('responseStorage 받음 ::: ');
          await insertStorageDate(msgData);

          // 서버에서 암호화된 sessiongStorage 받은 후 resolve
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    };
  });
};
