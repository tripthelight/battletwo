import { request } from '@/client/js/network/indianPocker/request';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import eventHanlerErrorComn from '@/client/js/module/eventHanlerErrorComn';

const normalizeError = (error) => {
  const isObject = error && typeof error === 'object';
  const message =
    (isObject && typeof error.message === 'string' && error.message) ||
    (typeof error === 'string' && error) ||
    'local peer error.';

  const sendMsg =
    (isObject && typeof error.sendMsg === 'string' && error.sendMsg) ||
    (message.startsWith('remote peer')
      ? message
      : message.startsWith('local peer')
        ? message.replace(/^local peer\s*:\s*/i, 'remote peer : ')
        : `remote peer : ${message}`);

  return {
    ...(isObject ? error : {}),
    errCase: isObject && error.errCase ? error.errCase : 'errorComn',
    message,
    sendMsg,
    errorDetails: error,
  };
};

export default (error, handler) => {
  const params = normalizeError(error);

  try {
    request('opponentFouls', { message: params.sendMsg });
  } catch (_) {
    // If the channel is already unavailable, still show the local error below.
  }

  if (handler) {
    eventHanlerErrorComn(params);
  } else {
    errorManagement(params);
  }
};
