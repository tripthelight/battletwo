import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import renderBase from '@/client/js/views/game/findTheSamePicture/fns/gameState/common/renderBase';
import {
  updateBoardInteractivity,
} from '@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/interaction';
import {
  showTurnTopSheet,
} from '@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/topSheet';

export default {
  main: () => {
    if (!renderBase()) return;

    if (runtime.elements.intro) {
      runtime.elements.intro.hidden = true;
    }

    runtime.uiLocked = false;
    updateBoardInteractivity();
    showTurnTopSheet();
  },
};
