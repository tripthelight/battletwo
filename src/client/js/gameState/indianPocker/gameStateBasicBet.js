import { timeInterval_1, timeInterval_2 } from '@/client/js/functions/variable';
import STATE_BASIC_BET from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/init';

export default () => {
  setTimeout(() => {
    STATE_BASIC_BET.main();
  }, timeInterval_1);
};
