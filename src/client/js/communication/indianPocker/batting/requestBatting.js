export function requestBatting(k, v) {
  const onDataChannel = window.rtcChannels.onDataChannel;

  if (onDataChannel && onDataChannel.readyState === 'open') {
    switch (k) {
      case 'firstExtBet':
        onDataChannel.send(
          JSON.stringify({
            type: 'firstExtBet',
            ...v, // coinCount, coinBet, extBet, state
          }),
        );
        break;
      case 'allInBet':
        onDataChannel.send(
          JSON.stringify({
            type: 'allInBet',
            ...v, // coinCount, coinBet, extBet
          }),
        );
        break;
      case 'call':
        onDataChannel.send(
          JSON.stringify({
            type: 'call',
            ...v, // coinCount, coinBet, extBet
          }),
        );
        break;
      case 'raise':
        onDataChannel.send(
          JSON.stringify({
            type: 'raise',
            ...v, // coinCount, coinBet, extBet
          }),
        );
        break;
      case 'foldSend':
        onDataChannel.send(
          JSON.stringify({
            type: 'foldSend',
            ...v, // penalty
          }),
        );
        break;

      default:
        break;
    }
  }
}
