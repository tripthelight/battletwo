import { text } from '@/client/js/functions/language';

export default function errorNameEvent(_bodyElem, _txt) {
  const INFO_TEXT_EL = document.querySelector('.info-change-name');
  if (INFO_TEXT_EL) return;

  const INFO_EL = document.createElement('div');
  INFO_EL.classList.add('info-change-name');
  INFO_EL.classList.add('error');
  INFO_EL.innerHTML = _txt;
  _bodyElem.appendChild(INFO_EL);
}
