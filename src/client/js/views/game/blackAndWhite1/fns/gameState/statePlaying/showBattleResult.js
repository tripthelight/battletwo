import { timeInterval_1000 } from '@/client/js/functions/variable';
import { dec } from '@/client/js/module/crypts/obf8lower';
import returnResult from '@/client/js/views/game/blackAndWhite1/fns/common/returnResult';
import scoreAssignment from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/scoreAssignment';
import countRound from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/countRound';
import resetCard from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/resetCard';
import nextRoundCheck from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/nextRoundCheck';
import setGameOrderRound from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/setGameOrderRound';
import disabledSelectInit from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/disabledSelectInit';
import turnReminderBlinkNull from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnReminderBlinkNull';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import {
  clearPendingRoundResult,
  getCurrentRoundNumber,
  loadPendingRoundResult,
  savePendingRoundResult,
} from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/pendingRoundResult';

let finalizeTimer = null;
let finalizeRound = null;

const removeResultEffect = () => {
  document
    .querySelectorAll('.show-battle-result')
    .forEach((elem) => elem.remove());
};

const renderResultEffect = (result) => {
  const container = document.getElementById('container');
  if (!container) return false;

  if (document.querySelector('.show-battle-result')) return true;

  const elem = document.createElement('div');
  elem.classList.add('show-battle-result');
  elem.classList.add(returnResult(dec(result)));
  container.appendChild(elem);
  return true;
};

const finalizePendingRound = (roundNumber) => {
  finalizeTimer = null;
  finalizeRound = null;

  const pending = loadPendingRoundResult();
  if (!pending || pending.round !== roundNumber) return;

  const currentRound = getCurrentRoundNumber();

  // 이미 다음 Round로 넘어간 뒤 마지막 pending cleanup 전에 reload/retry된 경우.
  if (currentRound > roundNumber) {
    removeResultEffect();
    clearPendingRoundResult(roundNumber);
    return;
  }

  if (currentRound !== roundNumber) return;

  removeResultEffect();

  // 같은 Round가 duplicate/recovery로 다시 finalize 되어도 Score history는 한 번만 기록된다.
  scoreAssignment(pending.result, roundNumber);

  // round 증가 → 현재 Round UI 정리 → 제출 marker 정리 → 다음 Turn 확정 순서는
  // 기존 정상 진행과 동일하게 유지한다.
  countRound();
  resetCard();
  nextRoundCheck();
  setGameOrderRound(pending.result);

  // 위 transition이 전부 성공한 뒤에만 pending marker를 제거한다.
  clearPendingRoundResult(roundNumber);
};

/**
 * 결과 효과를 표시하고 해당 Round의 transition을 durable하게 예약한다.
 *
 * pendingRoundResult를 DOM/timer보다 먼저 sessionStorage에 저장하므로
 * 결과 효과 1초 중 reload 되어도 동일 Round를 다시 제출하지 않고 복구할 수 있다.
 *
 * @param {string} res 난독화된 라운드 결과 "win" | "die" | "drew"
 * @param {number=} roundNumber 결과가 발생한 Round
 */
export default (
  res,
  roundNumber = getCurrentRoundNumber()
) => {
  const pending = savePendingRoundResult(res, roundNumber);

  // 두 번째 제출이 끝난 Round는 결과 commit 전까지 입력/Turn 강조를 모두 잠근다.
  disabledSelectInit();
  turnReminderBlinkNull();
  renderResultEffect(pending.result);

  // reliable duplicate resultRound가 도착해도 동일 Round timer를 다시 늘리지 않는다.
  if (
    finalizeTimer !== null &&
    finalizeRound === pending.round
  ) {
    return;
  }

  if (finalizeTimer !== null) {
    clearTimeout(finalizeTimer);
  }

  finalizeRound = pending.round;
  finalizeTimer = setTimeout(() => {
    try {
      finalizePendingRound(pending.round);
    } catch (error) {
      finalizeTimer = null;
      finalizeRound = null;
      errorManager(error, true);
    }
  }, timeInterval_1000);
};
