import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import eventHanlerErrorComn from '@/client/js/module/eventHanlerErrorComn';

export default (error, handler) => {
  const safe =
    error && typeof error === 'object'
      ? error
      : {};

  const params = {
    errCase: safe.errCase ?? 'errorComn',
    errorDetails: error,
    ...safe,
  };

  if (handler) {
    eventHanlerErrorComn(params);
  } else {
    errorManagement(params);
  }
};
