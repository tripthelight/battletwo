import enemyCountResult from '@/client/js/views/game/taptap/fns/enemyCountResult';
import gameResult from '@/client/js/views/game/taptap/fns/gameResult';
import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';
import remoteReload from '@/client/js/functions/remoteReload';
import { request } from '@/client/js/communication/taptap/request';

import taptapGameState from '@/client/js/gameState/taptap';
import screenClickEvent from '@/client/js/views/game/taptap/fns/screenClickEvent';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import storageMethod from '@/client/js/module/storage/storageMethod';

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
        case 'enemyWaitCount':
          // 상대가 카운트 중 새로고침 해서 waitCount 상태 일 때,
          if (window.sessionStorage.getItem('waitCount')) {
            // 나도 새로고침 해서 waitCount 상태 라면
            request('tapCountEnd', true);

            storageMethod('s', 'REMOVE_ITEM', 'count');
            storageMethod('s', 'REMOVE_ITEM', 'waitCount');
            LOADING_EVENT.hide();
            // playing
            taptapGameState.playing();
            screenClickEvent.tap();
          }
          break;
        case 'enemyCountEnd':
          // 상대가 카운트 중 새로고침 해서 waitCount 상태 일 때,
          // 상대는 카운트 중 새고로침 안해서 나에게 tapCountEnd를 보냄
          if (window.sessionStorage.getItem('waitCount')) {
            storageMethod('s', 'REMOVE_ITEM', 'count');
            LOADING_EVENT.hide();
            // playing
            taptapGameState.playing();
            screenClickEvent.tap();
          }
          break;
        case 'enemyCount':
          // 내가 카운트 중 마구마구 새로고침 해서 waitCount 상태 일 때,
          // 상대는 카운트 중 새고로침 안해서 playing 상태이고 탭을 하고 있음
          if (window.sessionStorage.getItem('gameState') === 'count') {
            // 그런데 나는 마구마구 아직 count 상태 일 때,
            storageMethod('s', 'REMOVE_ITEM', 'count');
            storageMethod('s', 'REMOVE_ITEM', 'waitCount');
            LOADING_EVENT.hide();
            // playing
            taptapGameState.playing();
            screenClickEvent.tap();
          }
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
