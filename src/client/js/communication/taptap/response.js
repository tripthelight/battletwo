import enemyCountResult from '@/client/js/views/game/taptap/enemyCountResult';
import gameResult from '@/client/js/views/game/taptap/gameResult';
import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';
import remoteReload from '@/client/js/functions/remoteReload';

export function response() {
  const dataChannel = window.rtcChannels.dataChannel;

  // 상대방이 새로고침 할 경우, dataChannel이 잠깐 끊기는 이유로 제거
  /*
  if (!dataChannel) {
    errorManagement({ errCase: 'errorComn', message: text.networkLost });
    return;
  }
    */

  if (dataChannel) {
    dataChannel.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'enemyCount':
          enemyCountResult(message.count);
          break;
        case 'gameOver':
          gameResult(message.count);
          break;
        case 'remoteReload':
          remoteReload(message.value);
          break;
        default:
          break;
      }
    };
  }
}
