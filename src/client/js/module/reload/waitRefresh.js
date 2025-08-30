import storageMethod from '@/client/js/module/storage/storageMethod';

export default function() {
  return new Promise((resolve, reject) => {
    const waitValue = window.localStorage.getItem('refresh');
    if (waitValue === null) resolve();

    let cnt = parseInt(waitValue);
    const interval = setInterval(() => {
      cnt -= 1;
      if (cnt === 0) {
        clearInterval(interval);
        storageMethod('l', 'REMOVE_ITEM', 'refresh');
        resolve();
      };
    }, 1);
  });
};
