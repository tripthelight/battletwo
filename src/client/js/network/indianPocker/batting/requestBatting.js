import { connObj } from '@/client/js/webRTC/rtcConn';

export function requestBatting(k, v) {
  const dataChannel = connObj.dataChannel;
  if (!dataChannel || (dataChannel && dataChannel.readyState !== 'open')) return;

  switch (k) {
    case 'firstExtBet':
      dataChannel.send(
        JSON.stringify({
          type: 'firstExtBet',
          ...v, // coinCount, coinBet, extBet, state
        }),
      );
      break;
    case 'allInBet':
      dataChannel.send(
        JSON.stringify({
          type: 'allInBet',
          ...v, // coinCount, coinBet, extBet
        }),
      );
      break;
    case 'call':
      dataChannel.send(
        JSON.stringify({
          type: 'call',
          ...v, // coinCount, coinBet, extBet
        }),
      );
      break;
    case 'raise':
      dataChannel.send(
        JSON.stringify({
          type: 'raise',
          ...v, // coinCount, coinBet, extBet
        }),
      );
      break;
    case 'foldSend':
      dataChannel.send(
        JSON.stringify({
          type: 'foldSend',
          ...v, // penalty
        }),
      );
      break;

    default:
      break;
  };
};
