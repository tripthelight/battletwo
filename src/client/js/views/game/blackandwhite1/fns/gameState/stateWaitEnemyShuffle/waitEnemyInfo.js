import { removeElem } from '@/client/js/functions/comnExport';
import cubeOrderSession from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateWaitEnemyShuffle/cubeOrderSession";
import shuffleCubeStop from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateWaitEnemyShuffle/shuffleCubeStop';

export default () => {
  removeElem(".info-shuffle");
  const BTN_EL = document.querySelector(".btn-start");
  if (BTN_EL) {
    BTN_EL.setAttribute("disabled", true);
    BTN_EL.setAttribute("aria-label", "Your opponent is shuffling their cards.");
    BTN_EL.querySelector("span").innerText = "wait opponent";
    cubeOrderSession();
  };

  // 다음 단계
  shuffleCubeStop();
};
