import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { request } from '@/client/js/network/indianPocker/request';

export default (data) => {
  console.log('data >>>>>>>>> ', data);

  const { clickBtn } = data;
  const REMOTE_CARD_NUM = window.sessionStorage.getItem('battleCardNum');
  if (REMOTE_CARD_NUM === null) {
    return errorManagement({ errCase: 'sessionStorageLoss', message: 'round end battleCardNum key 세션 없음' });
  }

  request('responsePlayerCardNum', { clickBtn: clickBtn, num: REMOTE_CARD_NUM });
};
