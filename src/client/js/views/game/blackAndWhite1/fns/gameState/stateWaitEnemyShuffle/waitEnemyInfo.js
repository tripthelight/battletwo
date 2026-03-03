import { removeElem } from '@/client/js/functions/comnExport';
import cubeOrderSession from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateWaitEnemyShuffle/cubeOrderSession";
import shuffleCubeStop from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateWaitEnemyShuffle/shuffleCubeStop';

import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';

export default () => {
  removeElem(".info-shuffle");
  const BTN_EL = document.querySelector(".btn-start");
  if (BTN_EL) {
    BTN_EL.setAttribute("disabled", true);
    BTN_EL.setAttribute("aria-label", "Your opponent is shuffling their cards.");
    BTN_EL.querySelector("span").innerText = "wait opponent";
    // cubeOrderSession(); // shuffleEnd에서 sessionStorage playerNumOrder에 저장하므로 제거
    /// //////////////////////
  };

  // 다음 단계
  shuffleCubeStop();
};
