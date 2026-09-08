import gameStateFirstUserAni from '@/client/js/gameState/findTheSamePicture/gameStateFirstUserAni';
import STATE_READY from '@/client/js/views/game/findTheSamePicture/fns/gameState/stateReady/init';

export default (options = {}) => {
  STATE_READY.main({
    ...options,
    onReadyComplete: gameStateFirstUserAni,
  });
};
