import { timeInterval_1 } from '@/client/js/functions/variable';
import { request } from '@/client/js/communication/indianPocker/request';
import betStateCheck from '@/client/js/views/game/indianPocker/fns/common/betStateCheck';

export default () => {
  if (window.sessionStorage.betState === 'extraBetting' && window.sessionStorage.betUser === 'true') return betStateCheck();
  setTimeout(() => {
    // 기본 배팅일 때 만 탐
    request('basicBetting', Number(window.sessionStorage.coinsPlayer));
    if (window.sessionStorage.betState === 'basicBetting') setTimeout(betStateCheck, timeInterval_1);
  }, timeInterval_1);
};
