import { connObj } from '@/client/js/webRTC/rtcConn';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { RESPONSE_HANDLERS } from '@/client/js/network/findTheSamePicture/responseHandlers';

export function response() {
  const onDataChannel = connObj.dataChannel;
  if (onDataChannel && onDataChannel.readyState === 'open') {
    onDataChannel.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const handler = RESPONSE_HANDLERS[message.type];

      if (handler) {
        handler(message);
      } else {
        errorManagement({ errCase: 'errorComn', message: message.type + ' : Undefined message type' });
      };
    };
  }
}
