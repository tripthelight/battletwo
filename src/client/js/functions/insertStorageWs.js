import { debug } from '@/client/js/module/debug';
import insertStorageDate from '@/client/js/functions/insertStorageDate';

export default async (gameName) => {
  return new Promise((resolve, reject) => {
    const webSocket = new WebSocket(`${process.env.SOCKET_HOST}:${process.env.RTC_PORT}`);

    webSocket.onopen = () => {
      // 서버에 암호화된 sessiongStorage 요청
      console.log('requestStorage 보냄 ::: ');
      webSocket.send(
        JSON.stringify({
          type: 'requestStorage',
          gameName: gameName,
        }),
      );
    };
    webSocket.onmessage = async (message) => {
      try {
        const msgData = JSON.parse(message.data);
        // 서버에서 암호화된 sessiongStorage 받음
        if (msgData.type === 'responseStorage') {
          console.log('responseStorage 받음 ::: ');
          await insertStorageDate(msgData);

          // 서버에서 암호화된 sessiongStorage 받은 후 resolve
          resolve();
        }
        if (msgData.type === 'requestStorageError') {
          webSocket.close();
          reject({ errCase: 'errorComn', message: '사용자가 최초 진입 시 battleTwo에 없는 gameName을 보냄' });
        }
      } catch (error) {
        webSocket.close();
        reject(error);
      }
    };
  });
};
