import storageMethod from '@/client/js/module/storage/storageMethod';
import { request } from '@/client/js/communication/indianPocker/request';

export default (data) => {
  const ROUND_END_RELOAD = window.sessionStorage.roundEndReload;
  if (ROUND_END_RELOAD && ROUND_END_RELOAD === 'true') {
    storageMethod('s', 'SET_ITEM', 'roundEndReload', false);
    request('drewRefreshReturn', true);
  }
};
