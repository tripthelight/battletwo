import throwObj from '@/client/js/module/errorHandler/throwObj';
import { sendGame } from '@/client/js/module/webRTC/connectSignaling';
import {
  REQUEST_COMMON_HANDLERS,
  REQUEST_HANDLERS
} from '@/client/js/network/findTheSamePicture/requestHandlers';

export function request(k, v) {
  const ALL_TEMPLATES = {
    ...REQUEST_COMMON_HANDLERS,
    ...REQUEST_HANDLERS,
  };

  const templateFn = ALL_TEMPLATES[k];

  if (templateFn) {
    const message = templateFn(v);
    // onDataChannel.send(JSON.stringify(message));
    sendGame({ ...message });
  } else {
    throw throwObj('errorComn', `${k} : Undefined message type`);
  }
}
