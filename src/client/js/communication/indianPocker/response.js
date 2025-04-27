import remoteReload from '@/client/js/functions/remoteReload';

export function response() {
  const dataChannel = window.rtcChannels.dataChannel;

  if (dataChannel) {
    dataChannel.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'remoteReload':
          remoteReload(message.value);
          break;
        case 'enemyBodyClick':
          console.log('enemy body click');
          break;

        case 'basicBetting':
          // basicBettingResult(data);
          break;
        case 'drewReadyCheck':
          // drewReadyCheckResult(data);
          break;
        case 'enterPlaying':
          // enterPlayingResult(data.enterPlaying);
          break;
        default:
          break;
      }
    };
  }
}
