import '@/client/assets/scss/main/main';
import '@/client/js/common/common';

document.onreadystatechange = () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    console.log('main init');
  }
};
