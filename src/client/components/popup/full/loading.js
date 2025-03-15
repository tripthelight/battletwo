import { comnPopup } from '@/client/js/functions/comnPopup';

export const LOADING_EVENT = {
  /**
   *
   * @param {string} str | loading 화면 중앙에 노출되는 문구
   */
  show: (str) => {
    comnPopup();
    const LOAD_EL = document.querySelector('.loading');
    if (LOAD_EL) LOAD_EL.remove();

    const LOAD_WRAP_EL = document.createElement('div');
    const LOAD_INNER_EL = document.createElement('span');

    LOAD_WRAP_EL.classList.add('full-popup');
    LOAD_WRAP_EL.classList.add('loading');

    if (str) LOAD_INNER_EL.innerHTML = str;
    else LOAD_INNER_EL.innerHTML = 'LOADING';

    LOAD_WRAP_EL.appendChild(LOAD_INNER_EL);
    document.body.appendChild(LOAD_WRAP_EL);
  },
  hide: () => {
    const LOAD_EL = document.querySelector('.loading');
    if (LOAD_EL) LOAD_EL.remove();
  },
};
