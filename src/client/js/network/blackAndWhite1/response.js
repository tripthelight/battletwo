import { connObj } from '@/client/js/webRTC/rtcConn';
import remoteReload from '@/client/js/functions/remoteReload';

export function response() {
  const dataChannel = connObj.dataChannel;

  if (dataChannel && dataChannel.readyState === 'open') {
    dataChannel.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'remoteReload':
          remoteReload(message.value);
          break;
        case 'enemyBodyClick':
          console.log('enemy body click');

          break;
        default:
          break;
      }
    };
  }
}
