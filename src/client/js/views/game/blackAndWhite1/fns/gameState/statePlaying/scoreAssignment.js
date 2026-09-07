import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import CryptoJS from 'crypto-js';
import { dec } from '@/client/js/module/crypts/obf8lower';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import passScore from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/passScore';
import readResultHistory from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/readResultHistory';
import { getCurrentRoundNumber } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/pendingRoundResult';

/**
 * Round 결과를 result history에 idempotent하게 기록한다.
 * 같은 Round의 동일 결과가 recovery/duplicate message로 다시 들어오면
 * Score를 중복 증가시키지 않고 기존 history를 그대로 사용한다.
 *
 * @param {string} result 난독화된 라운드 결과 "win" | "die" | "drew"
 * @param {number} roundNumber 결과가 발생한 Round
 * @returns {boolean} 새 결과를 처음 기록했으면 true
 */
export default (
  result,
  roundNumber = getCurrentRoundNumber()
) => {
  try {
    const privateKey = KEY?.prk ?? null;

    if (!privateKey) {
      throw throwObj(
        'errorComn',
        'scoreAssignment - order encrypt key failed.'
      );
    }

    if (
      !Number.isInteger(roundNumber) ||
      roundNumber < 1 ||
      roundNumber > 9
    ) {
      throw throwObj(
        'sessionStorageLoss',
        'scoreAssignment - round value failed.'
      );
    }

    const resultValue = dec(result);
    if (![0, 1, 2].includes(resultValue)) {
      throw throwObj(
        'dataManipulation',
        'scoreAssignment - result value failed.'
      );
    }

    const resultKey = findCharCode([
      71, 73, 69, 77, 83, 78, 89, 88, 82, 66,
    ]); // result

    const resultHistory = readResultHistory();
    const existingIndex = resultHistory.findIndex(
      (item) => item.round === roundNumber
    );

    if (existingIndex !== -1) {
      const existing = resultHistory[existingIndex];

      if (dec(existing.result) !== resultValue) {
        throw throwObj(
          'dataManipulation',
          'scoreAssignment - conflicting round result.'
        );
      }

      passScore(resultHistory);
      return false;
    }

    resultHistory.push({
      round: roundNumber,
      result,
    });

    // round 순서가 뒤섞인 상태를 그대로 저장하지 않는다.
    resultHistory.sort((a, b) => a.round - b.round);

    const orderStr = JSON.stringify(resultHistory)
      .replace(/"([^"]+)":/g, '$1:')
      .replace(/"/g, "'");

    const hash = CryptoJS.AES.encrypt(
      orderStr,
      privateKey
    ).toString();

    storageMethod(
      's',
      'SET_ITEM',
      resultKey,
      hash
    );

    passScore(resultHistory);
    return true;
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'scoreAssignment.js error'
    );
  }
};
