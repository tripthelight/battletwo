import findCharDecCode from '@/client/js/functions/findCharDecCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import _t from '@/client/js/module/crypts/textDE';

/**
 * @param {string} _code public-key cube number code
 * @returns {number} 0 ~ 8
 */
export default (_code) => {
  try {
    const E = (arr) => enc(encryptNumOfStr(_t(arr)));
    const D = (cod) => dec(cod);
    const C = (arr) => D(E(arr));

    switch (_code) {
      case findCharDecCode([78, 75, 79, 89, 65, 74, 83, 73, 84, 76]):
        return C([119, 101, 101, 101, 101, 101, 101, 119]); // 0
      case findCharDecCode([87, 89, 70, 88, 76, 90, 67, 65, 71, 74]):
        return C([119, 101, 119, 101, 119, 101, 119, 98]); // 1
      case findCharDecCode([75, 68, 74, 66, 73, 77, 76, 88, 71, 89]):
        return C([101, 101, 119, 101, 101, 101, 101, 112]); // 2
      case findCharDecCode([89, 85, 90, 69, 83, 78, 74, 80, 86, 75]):
        return C([101, 119, 101, 101, 101, 101, 101, 99]); // 3
      case findCharDecCode([67, 78, 82, 81, 66, 72, 89, 85, 73, 71]):
        return C([119, 101, 119, 119, 119, 101, 119, 111]); // 4
      case findCharDecCode([70, 82, 74, 71, 67, 73, 76, 77, 88, 87]):
        return C([119, 101, 119, 119, 101, 119, 101, 107]); // 5
      case findCharDecCode([65, 77, 76, 85, 83, 80, 75, 69, 68, 78]):
        return C([101, 119, 119, 119, 119, 101, 101, 100]); // 6
      case findCharDecCode([89, 84, 81, 66, 74, 70, 69, 75, 79, 82]):
        return C([101, 119, 119, 101, 119, 119, 101, 105]); // 7
      case findCharDecCode([65, 68, 86, 80, 81, 76, 74, 89, 85, 72]):
        return C([119, 119, 119, 119, 101, 101, 119, 97]); // 8
      default:
        throw throwObj('sessionStorageLoss', 'publicCubeToNum - cube code to num failed.');
    }
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'publicCubeToNum.js error'
    );
  }
};
