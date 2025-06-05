import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState';
import { RULES } from '@/client/js/views/game/indianPocker/fns/rule/rules';
import { request } from '@/client/js/network/indianPocker/request';

export default () => {
  const CHECH_DREW_INFO = document.querySelector('.check-drew-info');
  if (CHECH_DREW_INFO) CHECH_DREW_INFO.remove();
  const DREW_READY = window.sessionStorage.drewCardReady;
  if (DREW_READY && DREW_READY === 'true') {
    // RULES.CALL();
    BTN_STATE.HANDLER('call');
  } else {
    LOADING_EVENT.show();
    request('drewReadyCheck');
  }
};
