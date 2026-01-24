import { sendGame } from '@/client/js/module/webRTC/connectSignaling';
import {
  REQUEST_COMMON_HANDLERS,
  REQUEST_ENTER_STATE_HANDLERS,
  REQUEST_HANDLERS,
  REQUEST_MAKE_CARD_HANDLERS,
  REQUEST_VALIDATE_HANDLERS,
  REQUEST_BATTING_HANDLERS,
  REQUEST_COMPAIR_HANDLERS
} from '@/client/js/network/indianPocker/requestHandlers';

export function request(k, v) {
  const ALL_TEMPLATES = {
    ...REQUEST_COMMON_HANDLERS,
    ...REQUEST_ENTER_STATE_HANDLERS,
    ...REQUEST_HANDLERS,
    ...REQUEST_MAKE_CARD_HANDLERS,
    ...REQUEST_VALIDATE_HANDLERS,
    ...REQUEST_BATTING_HANDLERS,
    ...REQUEST_COMPAIR_HANDLERS,
  };

  const templateFn = ALL_TEMPLATES[k];

  if (templateFn) {
    const message = templateFn(v);
    // onDataChannel.send(JSON.stringify(message));
    sendGame({ ...message });
  } else {
    throw { errCase: 'errorComn', message: k + ' : Undefined message type' };
  }
}
