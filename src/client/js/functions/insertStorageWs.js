import { debug } from '@/client/js/module/debug';
import insertStorageDate from '@/client/js/functions/insertStorageDate';

export default async () => {
  return new Promise((resolve, reject) => {
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
        // 서버에서 암호화된 sessiongStorage 받음
        if (msgData.type === 'responseStorage') {
          debug.log('responseStorage 받음 :::');
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
