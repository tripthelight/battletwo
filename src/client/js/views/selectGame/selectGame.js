import '@/client/assets/scss/selectGame/common';
import '@/client/js/common/common';
import { debug } from '@/client/js/module/debug';
import clearStorage from '@/client/js/common/clearStorage';
import initNickName from '@/client/js/functions/initNickName';

// onMounted
document.onreadystatechange = async () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    // clearStorage(window.location.pathname);
    console.log('selectGame init');

    // debug.log('selectGame init');
    // await initNickName();
  }
};
