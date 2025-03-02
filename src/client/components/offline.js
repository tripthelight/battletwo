/**
 * NETWORK : ONLINE || OFFLONE
 */
export const OFFLINE_STATE = {
  show: () => {
    if (!document.querySelector('.offline')) {
      if (document.getElementById('container')) document.getElementById('container').classList.add('hide');
      const elem = document.createElement('div');
      const inner = document.createElement('div');
      elem.classList.add('offline');
      inner.classList.add('inner');
      inner.innerText = 'OFFLINE';
      elem.appendChild(inner);
      document.body.appendChild(elem);
    }
  },
  hide: () => {
    if (document.querySelector('.offline')) {
      if (document.getElementById('container')) document.getElementById('container').classList.remove('hide');
      if (document.querySelector('.offline')) {
        const removeEl = document.querySelector('.offline');
        if (document.body.classList.contains('IE')) {
          removeEl.parentNode.removeChild(removeEl);
        } else {
          removeEl.remove();
        }
      }
    }
  },
};
