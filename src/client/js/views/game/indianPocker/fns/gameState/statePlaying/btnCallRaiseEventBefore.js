import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import findCharCode from '@/client/js/functions/findCharCode';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState';
// import { RULES } from '@/client/js/views/game/indianPocker/fns/rule/rules';
import { request } from '@/client/js/network/indianPocker/request';
import storageMethod from '@/client/js/module/storage/storageMethod';
import X from '@/client/js/module/crypts/bool-obf';

export default () => {
  const CHECH_DREW_INFO = document.querySelector('.check-drew-info');
  if (CHECH_DREW_INFO) CHECH_DREW_INFO.remove();
  // const DREW_READY = window.sessionStorage.drewCardReady;
  // if (DREW_READY && DREW_READY === 'true') {
  const encryptKey1 = findCharCode([90, 77, 71, 84, 65, 68, 87, 81, 70, 82]); // drewCardReady
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
  if (encryptVal1 !== null && encryptVal1 !== '' && X.dec(encryptVal1)) {
    // RULES.CALL();
    BTN_STATE.HANDLER('call');
  } else {
    LOADING_EVENT.show();
    request('drewReadyCheck');
  }
};
