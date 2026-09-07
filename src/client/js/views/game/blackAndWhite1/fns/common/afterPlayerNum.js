import { request } from '@/client/js/network/blackAndWhite1/request';
import { saveAfterPlayerNum } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/afterPlayerCube';
import { getCurrentRoundNumber } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/pendingRoundResult';

/**
 * 후Player의 두 번째 제출은 네트워크 전송보다 먼저 local sessionStorage에 기록한다.
 * 페이지가 바로 reload 되어도 같은 Round에서 다시 제출할 수 없게 하는 commit marker다.
 */
export default (num, index) => {
  const round = getCurrentRoundNumber();

  saveAfterPlayerNum(num);
  request('afterPlayerNumber', { num, index, round });
};
