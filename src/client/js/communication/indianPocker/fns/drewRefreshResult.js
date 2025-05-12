import { request } from '@/client/js/communication/indianPocker/request';

export default (data) => {
  const ROUND_END_RELOAD = window.sessionStorage.roundEndReload;
  if (ROUND_END_RELOAD && ROUND_END_RELOAD === 'true') {
    window.sessionStorage.setItem('roundEndReload', false);
    request('drewRefreshReturn', true);
  }
};
