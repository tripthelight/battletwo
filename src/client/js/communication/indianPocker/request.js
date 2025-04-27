export function request(k, v) {
  const onDataChannel = window.rtcChannels.onDataChannel;

  if (onDataChannel && onDataChannel.readyState === 'open') {
    switch (k) {
      case 'bodyClick':
        onDataChannel.send(
          JSON.stringify({
            type: 'enemyBodyClick',
            count: v,
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

      default:
        break;
    }
  }
}
