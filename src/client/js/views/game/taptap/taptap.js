import '@/client/assets/scss/game/taptap/common';
import '@/client/js/common/common';
import addNickname from '@/client/js/functions/addNickname';
import webRTC from '@/client/js/webRTC/rtcConn';

// onMounted
document.onreadystatechange = async () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    try {
      console.log('taptap init');
      addNickname('localPlayer');

      const { onDataChannel, dataChannel } = await webRTC('taptap');

      console.log('connect sucess onDataChannel :::: ', onDataChannel);
      console.log('connect sucess dataChannel :::::: ', dataChannel);

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
      console.error('error >>>>>>>>> ', error);
    }
  }
};
