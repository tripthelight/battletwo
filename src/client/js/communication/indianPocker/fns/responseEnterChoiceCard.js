import { errorManagement } from '@/client/js/module/errorManagement';

export default function responseEnterChoiceCard(keys) {
  if (!window.reload) return;

  for (const key of keys) {
    const value = window.sessionStorage.getItem(key);
    if (value === null) {
      // sessionStorage의 key를 하나라도 삭제한 경우
      errorManagement({ errCase: 'sessionStorageLoss', message: '플레이어가 sessionStorage의 key를 삭제함' });
      break;
    }
  }
}
