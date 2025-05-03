import { timeInterval_1 } from '@/client/js/functions/variable';
import moveCoins from '@/client/js/views/game/indianPocker/fns/common/moveCoins';
import subtractMoveCoin from '@/client/js/views/game/indianPocker/fns/common/subtractMoveCoin';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState';

export default () => {
  setTimeout(() => {
    setTimeout(moveCoins, timeInterval_1);
    setTimeout(subtractMoveCoin, timeInterval_1);
    setTimeout(BTN_STATE.CHANGE, timeInterval_1);
  }, timeInterval_1);
};
