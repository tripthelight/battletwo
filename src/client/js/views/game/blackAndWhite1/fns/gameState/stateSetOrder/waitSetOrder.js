import { removeElem } from '@/client/js/functions/comnExport';
import setOrderMotion from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateSetOrder/setOrderMotion';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';

export default () => {
  removeElem('.info-shuffle');

  const BTN_EL = document.querySelector('.btn-start');
  if (BTN_EL) {
    BTN_EL.setAttribute('disabled', true);
    BTN_EL.setAttribute('aria-label', 'We are setting the order.');
    BTN_EL.querySelector('span').innerText = 'Wait';
  } else {
    LOADING_EVENT.show();
  }

  setOrderMotion();
};
