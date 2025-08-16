import { request } from '@/client/js/network/indianPocker/request';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import eventHanlerErrorComn from '@/client/js/module/eventHanlerErrorComn';

export default (error, handler) => {
  console.log('error : ', error);

  request('opponentFouls', { message: error?.sendMsg ?? 'remote player error' });

  const safe = (error && typeof error === 'object') ? error : {};
  const params = {
    errCase: 'errorComn',
    errorDetails: error,
    ...safe
  };

  if (handler) {
    eventHanlerErrorComn(params);
  } else {
    errorManagement(params);
  };
};
