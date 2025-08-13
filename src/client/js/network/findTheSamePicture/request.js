import { connObj } from '@/client/js/webRTC/rtcConn';

export function request(k, v) {
  const dataChannel = connObj.dataChannel;

  if (!dataChannel || (dataChannel && dataChannel.readyState !== 'open')) return;
  switch (k) {
    case 'bodyClick':
      dataChannel.send(
        JSON.stringify({
          type: 'enemyBodyClick',
          count: v,
        }),
      );
      break;
    default:
      break;
  }
}
