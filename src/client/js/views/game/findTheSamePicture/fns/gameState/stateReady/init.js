import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';

export default {
  main: ({ onReadyComplete = null } = {}) => {
    if (!runtime.state || runtime.state.status !== 'playing') {
      return;
    }

    runtime.uiLocked = true;
    onReadyComplete?.();
  },
};
