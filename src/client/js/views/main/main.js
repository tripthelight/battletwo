import '@/client/assets/scss/main/main';
import '@/client/js/common/common';
import initNickName from '@/client/js/functions/initNickName';

// onMounted
document.onreadystatechange = async () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    console.log('main init');
    // await initNickName();
  }
};
