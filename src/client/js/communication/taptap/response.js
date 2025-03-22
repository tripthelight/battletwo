import enemyCountResult from '@/client/js/views/game/taptap/enemyCountResult';
import gameResult from '@/client/js/views/game/taptap/gameResult';
import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';

export function response() {
  const dataChannel = window.rtcChannels.dataChannel;

  if (!dataChannel) {
    errorManagement({ errCase: 'errorComn', message: text.networkLost });
    return;
  }

  dataChannel.onmessage = (event) => {
    const message = JSON.parse(event.data);

    switch (message.type) {
      case 'enemyCount':
        enemyCountResult(message.count);
        break;
      case 'gameOver':
        gameResult(message.count);
        break;
      default:
        break;
    }
  };
}
