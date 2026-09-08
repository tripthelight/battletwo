import gameStatePlaying from '@/client/js/gameState/findTheSamePicture/gameStatePlaying';
import STATE_FIRST_USER_ANI from '@/client/js/views/game/findTheSamePicture/fns/gameState/stateFirstUserAni/init';

export default (options = {}) => {
  STATE_FIRST_USER_ANI.main({
    ...options,
    onComplete: gameStatePlaying,
  });
};
