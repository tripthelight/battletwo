import '@/client/assets/scss/game/taptap/common';
import '@/client/js/common/common';
import addNickname from '@/client/js/functions/addNickname';
import webRTC from '@/client/js/webRTC/rtcConn';
import { errorManagement } from '@/client/js/module/errorManagement';

// onMounted
document.onreadystatechange = async () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    try {
      console.log('taptap init');

      const { onDataChannel, dataChannel } = await webRTC('taptap');

      addNickname('localPlayer');

      const BODY_EL = document.body;
      if (!BODY_EL) return;
      BODY_EL.onclick = () => {
        if (onDataChannel && onDataChannel.readyState === 'open') {
          onDataChannel.send(
            JSON.stringify({
              type: 'clickMessage',
              data: 'click !!!!!!!!!!!!!!!!!',
            }),
          );
        } else {
          console.log('상대방이 방을 나감');
        }
      };

      dataChannel.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'clickMessage') {
          console.log('click message : ' + message.data);
        }
      };
    } catch (error) {
      errorManagement(error);
    }
  }
};
