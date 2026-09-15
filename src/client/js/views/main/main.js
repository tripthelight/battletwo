import '@/client/assets/scss/main/common';
import '@/client/js/common/common';

import gameCard from "@/client/js/views/main/fns/gameCard";
import mainLogo from "@/client/js/views/main/fns/mainLogo";

// onMounted
document.onreadystatechange = async () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    console.log('main init');
    mainLogo();
    await gameCard();
  }
};
