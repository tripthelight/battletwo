import enemyCountResult from '@/client/js/views/game/taptap/enemyCountResult';

export function response() {
  const dataChannel = window.rtcChannels.dataChannel;

  dataChannel.onmessage = (event) => {
    const message = JSON.parse(event.data);

    switch (message.type) {
      case 'enemyCount':
        enemyCountResult(message.count);
        break;
      default:
        break;
    }
  };
}
