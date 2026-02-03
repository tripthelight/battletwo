import moveCoins from '@/client/js/views/game/indianPocker/fns/common/moveCoins';
import subtractMoveCoin from '@/client/js/views/game/indianPocker/fns/common/subtractMoveCoin';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState';

/**
 * 내가 betUser true라서 코인을 하나씩 배팅 할 때 여기로 옴
 * CALL CASE :
  - 내가 call을 받은 PEER면 sessionCallCoinPos 함수에서 여기로 옴
    - call을 받았는데 같은 카드 였을 때 betUser ture인 PEER는 다시 moveCoins 해야됨
  - TODO: call을 받았는데 같은 카드가 아니면 basicBetting에서 아래의 코드와 동일한 기능을 수행하기 때문에 여기 올 필요 없음
 */
export default () => {
  moveCoins();
  subtractMoveCoin();
  BTN_STATE.CHANGE();
};
