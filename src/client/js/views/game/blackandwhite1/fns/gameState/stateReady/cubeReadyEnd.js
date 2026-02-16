import { getStyle } from '@/client/js/functions/comnExport';

export default () => {
  const CUBE_EL = document.querySelector("ul.cube");
  if (CUBE_EL) {
    CUBE_EL.classList.add("start");
    CUBE_EL.classList.add("disabled");

    setTimeout(() => {
      const CUBE_HEIGHT = CUBE_EL.clientHeight;
      const BTN_START = document.querySelector(".btn-start");
      if (BTN_START) {
        const BOTTOM_HEIGHT = BTN_START.clientHeight + getStyle(BTN_START, "bottom");
        const PLAYER_BLOCK = document.querySelector(".player-block");
        if (PLAYER_BLOCK) {
          const RESULT = (PLAYER_BLOCK.clientHeight - CUBE_HEIGHT - BOTTOM_HEIGHT) / 2;
          CUBE_EL.style.transform = `translateY(${RESULT}px)`;
        }
      }
    }, 30);
  }
};
