import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import gameState from '@/client/js/gameState/blackAndWhite1';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import _t from '@/client/js/module/crypts/textDE';
import throwObj from '@/client/js/module/errorHandler/throwObj';

/**
 * 현재 Round 번호를 확인해 다음 Round를 계속할 수 있는지 반환한다.
 *
 * @returns {boolean} true: 다음 Round 계속, false: gameOver 진입
 */
export default () => {
  try {
    const roundKey = findCharCode([
      77, 84, 83, 88, 69, 85, 82, 87, 90, 79,
    ]); // round

    const roundValue = storageMethod('s', 'GET_ITEM', roundKey);
    if (!roundValue) {
      throw throwObj('sessionStorageLoss', 'round value failed.');
    }

    const round = dec(roundValue);
    const lastRound = dec(
      enc(encryptNumOfStr(_t([119, 101, 101, 119, 119, 101, 119, 120])))
    ); // 10

    if (round < lastRound) {
      console.log('ROUND >>>>>>>>>>>>>>>> 10 미만');
      return true;
    }

    if (round === lastRound) {
      console.log('ROUND >>>>>>>>>>>>>>>> 10 ');
      gameState.gameOver();
      return false;
    }

    throw throwObj('sessionStorageLoss', 'round value not found.');
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'setGameOrderRoundCheck.js error'
    );
  }
};
