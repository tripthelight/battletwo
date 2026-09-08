import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import renderBase from '@/client/js/views/game/findTheSamePicture/fns/gameState/common/renderBase';
import {
  updateBoardInteractivity,
} from '@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/interaction';
import {
  clearTurnTopSheet,
} from '@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/topSheet';
import { showResult } from '@/client/js/views/game/findTheSamePicture/fns/gameState/stateGameOver/result';

export default {
  main: () => {
    if (!renderBase()) return;

    runtime.uiLocked = true;
    clearTurnTopSheet();
    updateBoardInteractivity();
    showResult();
  },
};
