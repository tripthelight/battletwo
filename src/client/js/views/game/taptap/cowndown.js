import storageMethod from '@/client/js/module/storage/storageMethod';

export default {
  show: (countStyle) => {
    return new Promise(async (resolve, reject) => {
      if (!document.querySelector('.count')) {
        let countEl = document.createElement('div');
        let inner = document.createElement('span');
        storageMethod('s', 'SET_ITEM', 'count', 3);
        inner.innerText = '3';
        countEl.classList.add('count');
        countEl.appendChild(inner);
        const CONTAINER_EL = document.getElementById('container');
        if (CONTAINER_EL) {
          CONTAINER_EL.appendChild(countEl);
          await countStyle(inner);
          resolve();
        }
      }
    });
  },
  hide: (countEl) => {
    if (countEl) countEl.remove();
  },
};
