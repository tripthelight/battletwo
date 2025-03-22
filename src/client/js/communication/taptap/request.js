import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';

export function request(k, v) {
  const onDataChannel = window.rtcChannels.onDataChannel;

  if (!onDataChannel) {
    errorManagement({ errCase: 'errorComn', message: text.networkLost });
    return;
  }

  if (onDataChannel && onDataChannel.readyState === 'open') {
    switch (k) {
      case 'tapCount':
        onDataChannel.send(
          JSON.stringify({
            type: 'enemyCount',
            count: v,
          }),
        );
        break;
      case 'gameOver':
        onDataChannel.send(
          JSON.stringify({
            type: 'gameOver',
            count: v,
          }),
        );
        break;
      default:
        break;
    }
  } else {
    // 상대방이 방을 나감
    errorManagement({ component: 'initConnect', event: 'catch', message: 'Unexpected error in initConnect', errorDetails: null, errCase: 'webRTC' });
  }
}
