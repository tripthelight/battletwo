import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import { runFirstUserAnimation } from '@/client/js/views/game/findTheSamePicture/fns/gameState/stateFirstUserAni/animation';

export default {
  main: ({ onComplete = null } = {}) => {
    const state = runtime.state;

    if (!state || state.status !== 'playing') {
      return;
    }

    if (Date.now() >= state.readyAt) {
      runtime.firstUserAniCompletedGameId = state.gameId;
      onComplete?.();
      return;
    }

    if (
      runtime.firstUserAniCompletedGameId === state.gameId
    ) {
      const remain = Math.max(0, state.readyAt - Date.now());

      if (remain === 0) {
        onComplete?.();
      } else {
        const timerId = window.setTimeout(
          () => onComplete?.(),
          remain,
        );
        runtime.firstUserAniTimerIds.push(timerId);
      }
      return;
    }

    if (runtime.firstUserAniGameId === state.gameId) {
      return;
    }

    runtime.firstUserAniGameId = state.gameId;
    runtime.uiLocked = true;

    runFirstUserAnimation(() => {
      runtime.firstUserAniGameId = null;
      runtime.firstUserAniCompletedGameId = state.gameId;
      onComplete?.();
    });
  },
};
