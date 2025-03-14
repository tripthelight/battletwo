import createModal from '@/client/components/popup/modal/createModal';
import { text } from '@/client/js/functions/language';

export default function modalInitNickname() {
  const { MODAL_POP_WRAP, TITLE_EL, BODY_EL, MODAL_OK } = createModal('default', 'init-user-name');

  const MODAL_FROM_WRAP = document.createElement('div');
  const BTN_DEL = document.createElement('button');
  MODAL_FROM_WRAP.classList.add('modal-form-wrap');
  BTN_DEL.classList.add('btn-delete');
  TITLE_EL.innerHTML = text.nickInput;
  MODAL_OK.innerHTML = text.ok;
  const IPT_EL = document.createElement('input');
  IPT_EL.type = 'text';
  IPT_EL.id = 'IPT_INIT_NAME';
  IPT_EL.placeholder = text.nickInput;
  IPT_EL.autocomplete = 'off';
  IPT_EL.required = true;
  IPT_EL.value = '';
  MODAL_FROM_WRAP.appendChild(IPT_EL);
  MODAL_FROM_WRAP.appendChild(BTN_DEL);
  BODY_EL.appendChild(MODAL_FROM_WRAP);
  BTN_DEL.classList.add('hide');

  return { MODAL_POP_WRAP, IPT_EL, BTN_DEL, MODAL_OK, BODY_EL };
}
