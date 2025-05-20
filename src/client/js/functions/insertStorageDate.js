import { debug } from '@/client/js/module/debug';
import obfuscationStore, { updateObfuscation } from '@/client/store/obfuscationStore';

export default async () => {
  return new Promise((resolve, reject) => {
    async function insertStorageDate(storageData) {
      return new Promise((resolve, reject) => {
        // console.log('storageData >>>>>>>>>> ', storageData);
        obfuscationStore.dispatch(updateObfuscation({ obfuscation: Object.assign({}, storageData) }));
        const storeState = obfuscationStore.getState().obfuscationState.obfuscation;
        console.log('storeState >>>>>>>>> ', storeState);

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
      const msgData = JSON.parse(message.data);

      // 서버에서 암호화된 sessiongStorage 받음
      if (msgData.type === 'responseStorage') {
        console.log('responseStorage 받음 ::: ');
        await insertStorageDate(msgData.storageData);

        // 서버에서 암호화된 sessiongStorage 받은 후 resolve
        resolve();
      }
    };
  });
};
