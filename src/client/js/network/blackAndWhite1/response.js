import enemyCountResult from '@/client/js/views/game/taptap/fns/enemyCountResult';
import gameResult from '@/client/js/views/game/taptap/fns/gameResult';
import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';
import remoteReload from '@/client/js/functions/remoteReload';
import { request } from '@/client/js/network/taptap/request';

import taptapGameState from '@/client/js/gameState/taptap';
import screenClickEvent from '@/client/js/views/game/taptap/fns/screenClickEvent';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import storageMethod from '@/client/js/module/storage/storageMethod';

export function response() {
  const dataChannel = window.rtcChannels.dataChannel;

  if (dataChannel && dataChannel.readyState === 'open') {
    dataChannel.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'remoteReload':
          remoteReload(message.value);
          break;
        case 'enemyBodyClick':
          console.log('enemy body click');

          break;
        default:
          break;
      }
    };
  }
}
