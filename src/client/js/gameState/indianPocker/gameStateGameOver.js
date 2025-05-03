import { timeInterval_1 } from '@/client/js/functions/variable';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import STATE_GAMEOVER from '@/client/js/views/game/indianPocker/fns/gameState/stateGameover/init';

export default () => {
  setTimeout(() => {
    STATE_GAMEOVER.main();
    LOADING_EVENT.show();
  }, timeInterval_1);
};
