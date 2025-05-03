import { timeInterval_1 } from '@/client/js/functions/variable';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import sessionInitGameover from '@/client/js/views/game/indianPocker/fns/gameState/stateGameover/sessionInitGameover';

export default {
  main: () => {
    LOADING_EVENT.show();
    setTimeout(sessionInitGameover, timeInterval_1);
  },
};
