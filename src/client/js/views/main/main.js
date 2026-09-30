import '@/client/assets/scss/main/common';
import '@/client/js/common/common';

import gameCard from "@/client/js/views/main/fns/gameCard";
import mainLogo from "@/client/js/views/main/fns/mainLogo";
import gameCardEvent from "@/client/js/views/main/fns/gameCardEvent";
import indianPocker from "@/client/js/views/main/fns/3d/indianPocker";
import blackAndWhite1 from "@/client/js/views/main/fns/3d/blackAndWhite1";

// onMounted
document.onreadystatechange = async () => {
  const state = document.readyState;
  if (state === 'interactive') {
  } else if (state === 'complete') {
    console.log('main init');
    await gameCard();
    mainLogo();
    gameCardEvent();
    indianPocker();
    blackAndWhite1();
  }
};
