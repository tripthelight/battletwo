import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import cubeToNum from '@/client/js/views/game/blackAndWhite1/fns/common/cubeToNum';
import battleCard from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/battleCard';
import disabledSelectInit from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/disabledSelectInit';
import { loadAfterPlayerNum } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/afterPlayerCube';
import {
  clearPendingRoundResult,
  getCurrentRoundNumber,
  loadPendingRoundResult,
} from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/pendingRoundResult';
import showBattleResult from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/showBattleResult';

const beforePlayerNumKey = () => (
  findCharCode([65, 69, 68, 79, 82, 85, 78, 80, 90, 75]) // beforePlayerNum
);

/**
 * playing reload 직후 현재 Round의 결과 대기 상태를 복구한다.
 *
 * 1) resultRound를 이미 받았거나 내가 결과를 계산한 뒤 reload 된 경우
 *    pendingRoundResult를 이용해 결과 효과/commit timer를 다시 시작한다.
 *
 * 2) 내가 선Player이고 후Player의 두 번째 Cube까지 받았지만 결과 저장 전에
 *    reload 된 경우에는 before/after 두 숫자로 결과를 다시 계산하고 전송한다.
 *
 * 3) 내가 후Player이고 결과 메시지를 아직 받지 못했다면 정확한 선Player 숫자를
 *    알 수 없으므로 재계산하지 않고 입력만 잠근 채 reliable resultRound를 기다린다.
 */
export default () => {
  const currentRound = getCurrentRoundNumber();
  const pending = loadPendingRoundResult();

  if (pending) {
    // Round 전환은 완료됐는데 마지막 cleanup 직전에 reload 된 극단적인 경우.
    if (currentRound > pending.round) {
      clearPendingRoundResult(pending.round);
      return false;
    }

    if (currentRound === pending.round) {
      disabledSelectInit();
      showBattleResult(pending.result, pending.round);
      return true;
    }
  }

  const afterPlayerNum = loadAfterPlayerNum();
  if (afterPlayerNum === null) return false;

  // 두 번째 제출 완료 상태에서는 어떤 Peer도 같은 Round에 다시 제출하면 안 된다.
  disabledSelectInit();

  const beforePlayerNum = storageMethod(
    's',
    'GET_ITEM',
    beforePlayerNumKey()
  );

  if (!beforePlayerNum) {
    // 나는 후Player. 상대가 계산한 resultRound를 기다린다.
    return true;
  }

  // 나는 선Player. 정확한 두 숫자를 모두 알고 있으므로 결과를 안전하게 재계산한다.
  // battleCard()가 pending result를 먼저 저장한 뒤 상대에게 reliable resultRound를 보낸다.
  cubeToNum(beforePlayerNum);
  battleCard(afterPlayerNum);
  return true;
};
