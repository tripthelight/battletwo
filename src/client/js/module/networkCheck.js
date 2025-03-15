import { OFFLINE_STATE } from '@/client/components/popup/full/offline';

/**
 * NETWORK : ONLINE || OFFLONE
 */
window.addEventListener('online', () => {
  OFFLINE_STATE.hide();
  location.reload();
});
window.addEventListener('offline', () => {
  OFFLINE_STATE.show();
});
