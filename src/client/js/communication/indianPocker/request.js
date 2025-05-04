export function request(k, v) {
  const onDataChannel = window.rtcChannels.onDataChannel;

  if (onDataChannel && onDataChannel.readyState === 'open') {
    switch (k) {
      case 'choiceFirst':
        onDataChannel.send(
          JSON.stringify({
            type: 'choiceFirst',
            num: v,
          }),
        );
        break;
      case 'choiceDrewCard':
        onDataChannel.send(
          JSON.stringify({
            type: 'choiceDrewCard',
            value: v, // true | false
          }),
        );
        break;
      case 'basicBetting':
        onDataChannel.send(
          JSON.stringify({
            type: 'basicBetting',
            state: true,
            coinCount: v, // Number(window.sessionStorage.coinsPlayer)
          }),
        );
        break;
      case 'drewReadyCheck':
        onDataChannel.send(
          JSON.stringify({
            type: 'drewReadyCheck',
            state: true,
          }),
        );
        break;
      case 'enterPlaying':
        onDataChannel.send(
          JSON.stringify({
            type: 'enterPlaying',
            gameState: v,
          }),
        );
        break;
      case 'cardNum':
        onDataChannel.send(
          JSON.stringify({
            type: 'enemyCardNum',
            cardNum: v,
          }),
        );
        break;
      case 'enterDrew':
        onDataChannel.send(
          JSON.stringify({
            type: 'enterDrew',
            gameState: v,
          }),
        );
        break;
      case 'enterBasicBet':
        onDataChannel.send(
          JSON.stringify({
            type: 'enterBasicBet',
            gameState: v,
          }),
        );
        break;
      case 'nextStep':
        onDataChannel.send(
          JSON.stringify({
            type: 'nextStep',
            value: v, // true | false
          }),
        );
        break;
      case 'drewRefresh':
        onDataChannel.send(
          JSON.stringify({
            type: 'drewRefresh',
            value: v, // true | false
          }),
        );
        break;
      case 'drewRefreshReturn':
        onDataChannel.send(
          JSON.stringify({
            type: 'drewRefreshReturn',
            value: v, // true | false
          }),
        );
        break;

      default:
        break;
    }
  }
}
