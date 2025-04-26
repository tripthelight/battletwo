import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';

export function request(k, v) {
  const onDataChannel = window.rtcChannels.onDataChannel;

  // 상대방이 새로고침 할 경우, onDataChannel이 잠깐 끊기는 이유로 제거
  /*
  if (!onDataChannel) {
    errorManagement({ errCase: 'errorComn', message: text.networkLost });
    return;
  }
    */

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
      default:
        break;
    }
  } else {
    // 상대방이 새로고침 할 경우, onDataChannel이 잠깐 끊기는 이유로 제거
    // 상대방이 방을 나감
    // errorManagement({ component: 'initConnect', event: 'catch', message: 'Unexpected error in initConnect', errorDetails: null, errCase: 'webRTC' });
  }
}
