import { timeInterval_1, timeInterval_2 } from '@/client/js/functions/variable';
import STATE_CHOICE_CARD from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/init';
import REFRESH_STATE_CHOICE_CARD from '@/client/js/refresh/indianpoker/refreshChoiceCard/refreshInit';

export default () => {
  STATE_CHOICE_CARD.main();
  /* setTimeout(() => {
    STATE_CHOICE_CARD.main();
    // refresh event
    setTimeout(() => {
      REFRESH_STATE_CHOICE_CARD.main();
    }, timeInterval_2);
  }, timeInterval_1); */
};
