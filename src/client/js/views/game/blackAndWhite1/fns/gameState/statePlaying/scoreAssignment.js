import throwObj from '@/client/js/module/errorHandler/throwObj';
import passScore from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/passScore";
import {
  getCurrentRound,
  loadRoundResults,
  saveRoundResults
} from '@/client/js/views/game/blackAndWhite1/fns/common/roundResultStorage';

/**
 * @param {string} result 난독화된 라운드 결과 "win" | "die" | "drew"
 * @param {number=} roundNumber result가 발생한 round 번호
 * @returns {boolean} 새 round 결과가 저장되었으면 true
 */
export default (result, roundNumber = getCurrentRound()) => {
  try {
    if (!Number.isInteger(roundNumber) || roundNumber < 1 || roundNumber > 9) {
      throw throwObj('sessionStorageLoss', 'scoreAssignment - round value failed.');
    }

    const resArr = loadRoundResults();
    const resultIndex = resArr.findIndex((item) => item.round === roundNumber);
    const didCreate = resultIndex === -1;

    if (didCreate) {
      resArr.push({ round: roundNumber, result });
    } else {
      resArr[resultIndex] = { round: roundNumber, result };
    }

    const savedResults = saveRoundResults(resArr);
    passScore(savedResults);
    return didCreate;
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'scoreAssignment.js error'
    );
  }
};
