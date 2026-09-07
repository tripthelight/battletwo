import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import cubeToNum from '@/client/js/views/game/blackAndWhite1/fns/common/cubeToNum';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr, obfuscateInt32 } from '@/client/js/module/crypts/encryptNumber';
import _t from '@/client/js/module/crypts/textDE';
import showBattleResult from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/showBattleResult';
import { request } from '@/client/js/network/blackAndWhite1/request';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { getCurrentRoundNumber } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/pendingRoundResult';

/**
 * 선Player 관점에서 두 Cube를 비교해 양쪽 Round 결과를 생성한다.
 *
 * @param {number} remoteCardNum 후Player가 제출한 Cube 번호
 * @param {number=} roundNumber 결과가 발생한 Round
 */
export default (
  remoteCardNum,
  roundNumber = getCurrentRoundNumber()
) => {
  try {
    if (
      !Number.isInteger(remoteCardNum) ||
      remoteCardNum < 0 ||
      remoteCardNum > 8 ||
      !Number.isInteger(roundNumber) ||
      roundNumber < 1 ||
      roundNumber > 9
    ) {
      throw throwObj(
        'dataManipulation',
        'battleCard - round/cube data failed.'
      );
    }

    const beforePlayerNumKey = findCharCode([
      65, 69, 68, 79, 82, 85, 78, 80, 90, 75,
    ]); // beforePlayerNum

    const beforePlayerNum = storageMethod(
      's',
      'GET_ITEM',
      beforePlayerNumKey
    );

    if (!beforePlayerNum) {
      throw throwObj(
        'sessionStorageLoss',
        'battleCard - beforePlayerNum failed.'
      );
    }

    const localCardNum = cubeToNum(beforePlayerNum);
    const result = Object.create(null);

    if (localCardNum > remoteCardNum) {
      result.local = enc(
        encryptNumOfStr(_t([119, 119, 101, 101, 119, 119, 119, 98]))
      ); // 1 : win

      result.remote = enc(
        encryptNumOfStr(_t([119, 119, 101, 101, 119, 119, 119, 101]))
      ); // 0 : lose
    } else if (localCardNum < remoteCardNum) {
      result.local = enc(
        encryptNumOfStr(_t([101, 119, 119, 101, 119, 119, 119, 119]))
      ); // 0 : lose

      result.remote = enc(
        encryptNumOfStr(_t([119, 119, 101, 119, 101, 101, 119, 114]))
      ); // 1 : win
    } else {
      result.local = enc(
        encryptNumOfStr(_t([119, 101, 119, 101, 119, 101, 119, 101, 112]))
      ); // 2 : draw

      result.remote = enc(
        encryptNumOfStr(_t([101, 101, 119, 101, 119, 119, 101, 54]))
      ); // 2 : draw
    }

    // pendingRoundResult가 먼저 저장되므로 이 직후 reload 되어도 결과를 잃지 않는다.
    showBattleResult(result.local, roundNumber);

    request('resultRound', {
      resultSend: obfuscateInt32(dec(result.remote)),
      round: roundNumber,
    });
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'battleCard.js error'
    );
  }
};
