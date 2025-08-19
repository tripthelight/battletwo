import moveCoins from '@/client/js/views/game/indianPocker/fns/common/moveCoins';
import subtractMoveCoin from '@/client/js/views/game/indianPocker/fns/common/subtractMoveCoin';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState';

export default () => {
  moveCoins();
  subtractMoveCoin();
  BTN_STATE.CHANGE();
};
