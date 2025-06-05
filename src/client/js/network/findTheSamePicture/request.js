import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';

export function request(k, v) {
  const dataChannel = window.rtcChannels.dataChannel;

  if (!dataChannel || (dataChannel && dataChannel.readyState !== 'open')) return;
  switch (k) {
    case 'bodyClick':
      dataChannel.send(
        JSON.stringify({
          type: 'enemyBodyClick',
          count: v,
        }),
      );
      break;
    default:
      break;
  }
}
