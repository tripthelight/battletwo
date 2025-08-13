import { connObj } from '@/client/js/webRTC/rtcConn';

export function request(k, v) {
  const dataChannel = connObj.dataChannel;

  if (!dataChannel || (dataChannel && dataChannel.readyState !== 'open')) return;
  switch (k) {
    case 'tapCount':
      dataChannel.send(
        JSON.stringify({
          type: 'enemyCount',
          count: v,
        }),
      );
      break;
    case 'waitCount':
      dataChannel.send(
        JSON.stringify({
          type: 'enemyWaitCount',
          count: v,
        }),
      );
      break;
    case 'tapCountEnd':
      dataChannel.send(
        JSON.stringify({
          type: 'enemyCountEnd',
          count: v,
        }),
      );
      break;
    case 'gameOver':
      dataChannel.send(
        JSON.stringify({
          type: 'gameOver',
          count: v,
        }),
      );
      break;
    default:
      break;
  };
};
