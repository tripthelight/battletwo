import { request } from '@/client/js/communication/taptap/request.js';
import cowndown from './cowndown.js';
import { timeInterval_1000, timeInterval_2000, timeInterval_3000, timeInterval_4000 } from '@/client/js/functions/variable.js';
import storageMethod from '@/client/js/module/storage/storageMethod.js';

export default (innerEl) => {
  return new Promise(async (resolve, reject) => {
    let ww = window.innerWidth;
    let wh = window.innerHeight;
    let res = 0;
    if (ww <= wh) res = ww - 100;
    else res = wh - 100;
    innerEl.style.width = innerEl.style.height = res + 'px';
    innerEl.style.fontSize = res / 1.5 + 'px';

    setTimeout(() => {
      storageMethod('s', 'SET_ITEM', 'count', 2);
      innerEl.innerText = '2';
    }, timeInterval_1000);
    setTimeout(() => {
      storageMethod('s', 'SET_ITEM', 'count', 1);
      innerEl.innerText = '1';
    }, timeInterval_2000);
    setTimeout(() => {
      innerEl.style.fontSize = res / 3 + 'px';
      innerEl.innerText = 'TAP!';
    }, timeInterval_3000);
    setTimeout(() => {
      window.sessionStorage.removeItem('count');
      cowndown.hide(document.querySelector('.count'));
      storageMethod('s', 'REMOVE_ITEM', 'count');

      request('tapCountEnd', true);

      resolve();
    }, timeInterval_4000);
  });
};
