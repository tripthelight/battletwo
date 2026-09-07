import selectCube from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectCube';
import disabledSelectInit from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/disabledSelectInit';
import {
  ensureActiveUser,
  isLocalTurn,
} from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnState';

export default () => {
  const activeUser = ensureActiveUser();

  if (!activeUser) {
    disabledSelectInit();
    return;
  }

  if (isLocalTurn()) {
    selectCube();
  } else {
    disabledSelectInit();
  }
};
