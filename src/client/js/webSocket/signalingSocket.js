import insertStorageDate from '@/client/js/functions/insertStorageDate';

export const signalingSocket = new WebSocket(`${process.env.SOCKET_HOST}:${process.env.RTC_PORT}`);

signalingSocket.onopen = () => {
  // STEP 1 - 서버에 암호화된 sessiongStorage 요청
  const keySecretKey = findCharCode([83, 88, 73, 69, 85, 68, 66, 76, 80, 78]); // SECRET_KEY
  const valSecretKey = window.sessionStorage.getItem(keySecretKey);
  if (valSecretKey === null) {
    signalingSocket.send(
      JSON.stringify({
        type: 'requestStorage',
        gameName: gameName,
      }),
    );
  }
};

signalingSocket.onmessage = async (message) => {
  const msgData = JSON.parse(message.data);

  // STEP 1 - 서버에서 암호화된 sessiongStorage 받음
  if (msgData.type === 'responseStorage') {
    await insertStorageDate(msgData);
  }
};

signalingSocket.onerror = (event) => {
  //
};

signalingSocket.onclose = (event) => {
  //
};
