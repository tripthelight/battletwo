import findCharCode from '@/client/js/functions/findCharCode';
import findCharDecCode from '@/client/js/functions/findCharDecCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import _t from '@/client/js/module/crypts/textDE';

/**
 * @param {number} _code 0 ~ 8
 * @returns {string} 암호화된 큐브 숫자 code
 */
export default (_num) => {
  try {
    switch (_num) {
      case findCharCode([71, 85, 68, 90, 70, 77, 76, 79, 89, 87]): // PRIVATE NUM 0
      case findCharCode([77, 72, 86, 89, 80, 85, 84, 78, 74, 71]): // PRIVATE NUM 0
      case findCharCode([90, 76, 78, 69, 86, 72, 83, 87, 84, 68]): // PRIVATE NUM 0
      case findCharCode([76, 77, 83, 71, 74, 78, 65, 81, 66, 88]): // PRIVATE NUM 0
        return findCharDecCode([78, 75, 79, 89, 65, 74, 83, 73, 84, 76]); // PUBLIC NUM 0

      case findCharCode([83, 82, 67, 87, 72, 68, 77, 65, 70, 66]): // PRIVATE NUM 1
      case findCharCode([65, 71, 79, 81, 73, 66, 76, 72, 85, 77]): // PRIVATE NUM 1
      case findCharCode([83, 82, 74, 71, 79, 80, 70, 72, 81, 85]): // PRIVATE NUM 1
      case findCharCode([89, 70, 87, 69, 75, 84, 83, 88, 76, 77]): // PRIVATE NUM 1
        return findCharDecCode([87, 89, 70, 88, 76, 90, 67, 65, 71, 74]); // PUBLIC NUM 1

      case findCharCode([87, 80, 71, 77, 76, 84, 67, 74, 69, 83]): // PRIVATE NUM 2
      case findCharCode([65, 69, 88, 83, 74, 67, 89, 75, 85, 79]): // PRIVATE NUM 2
      case findCharCode([89, 78, 67, 80, 87, 74, 73, 85, 71, 83]): // PRIVATE NUM 2
      case findCharCode([83, 71, 81, 86, 68, 76, 66, 78, 87, 70]): // PRIVATE NUM 2
        return findCharDecCode([75, 68, 74, 66, 73, 77, 76, 88, 71, 89]); // PUBLIC NUM 2

      case findCharCode([66, 67, 73, 89, 69, 72, 76, 79, 85, 75]): // PRIVATE NUM 3
      case findCharCode([84, 83, 70, 71, 76, 75, 68, 66, 69, 89]): // PRIVATE NUM 3
      case findCharCode([69, 74, 80, 85, 77, 66, 70, 83, 75, 89]): // PRIVATE NUM 3
      case findCharCode([89, 70, 90, 65, 67, 72, 84, 86, 83, 88]): // PRIVATE NUM 3
        return findCharDecCode([89, 85, 90, 69, 83, 78, 74, 80, 86, 75]); // PUBLIC NUM 3

      case findCharCode([86, 66, 72, 80, 71, 73, 75, 68, 79, 67]): // PRIVATE NUM 4
      case findCharCode([71, 83, 85, 68, 75, 84, 90, 88, 69, 66]): // PRIVATE NUM 4
      case findCharCode([81, 66, 80, 87, 89, 77, 85, 76, 67, 90]): // PRIVATE NUM 4
      case findCharCode([67, 72, 69, 73, 70, 86, 87, 71, 65, 89]): // PRIVATE NUM 4
        return findCharDecCode([67, 78, 82, 81, 66, 72, 89, 85, 73, 71]); // PUBLIC NUM 4

      case findCharCode([71, 68, 88, 82, 70, 76, 69, 77, 79, 90]): // PRIVATE NUM 5
      case findCharCode([77, 86, 82, 73, 75, 70, 81, 76, 71, 88]): // PRIVATE NUM 5
      case findCharCode([81, 84, 68, 86, 73, 66, 78, 82, 67, 80]): // PRIVATE NUM 5
      case findCharCode([86, 76, 84, 80, 78, 70, 90, 65, 72, 68]): // PRIVATE NUM 5
        return findCharDecCode([70, 82, 74, 71, 67, 73, 76, 77, 88, 87]); // PUBLIC NUM 5

      case findCharCode([73, 75, 69, 77, 71, 78, 87, 76, 72, 84]): // PRIVATE NUM 6
      case findCharCode([71, 74, 66, 68, 75, 69, 87, 70, 82, 89]): // PRIVATE NUM 6
      case findCharCode([66, 89, 80, 75, 70, 72, 76, 74, 81, 68]): // PRIVATE NUM 6
      case findCharCode([75, 72, 80, 70, 74, 81, 85, 68, 89, 66]): // PRIVATE NUM 6
        return findCharDecCode([65, 77, 76, 85, 83, 80, 75, 69, 68, 78]); // PUBLIC NUM 6

      case findCharCode([78, 86, 84, 82, 75, 74, 77, 88, 90, 79]): // PRIVATE NUM 7
      case findCharCode([77, 78, 85, 83, 68, 82, 84, 65, 72, 79]): // PRIVATE NUM 7
      case findCharCode([83, 81, 90, 74, 86, 72, 77, 79, 71, 70]): // PRIVATE NUM 7
      case findCharCode([67, 70, 77, 85, 73, 90, 80, 79, 69, 71]): // PRIVATE NUM 7
        return findCharDecCode([89, 84, 81, 66, 74, 70, 69, 75, 79, 82]); // PUBLIC NUM 7

      case findCharCode([66, 73, 84, 78, 90, 75, 80, 72, 65, 79]): // PRIVATE NUM 8
      case findCharCode([75, 77, 72, 88, 67, 69, 82, 85, 78, 80]): // PRIVATE NUM 8
      case findCharCode([70, 90, 66, 89, 71, 81, 80, 83, 72, 65]): // PRIVATE NUM 8
      case findCharCode([67, 89, 71, 77, 86, 76, 78, 69, 75, 84]): // PRIVATE NUM 8
        return findCharDecCode([65, 68, 86, 80, 81, 76, 74, 89, 85, 72]); // PUBLIC NUM 8

      default: throw throwObj('sessionStorageLoss', 'MatchCubeNum - match cube code num faild.');
    }
  } catch (error) {
    throw throwObj(error?.errCase ?? 'errorComn', error?.message ?? 'MatchCubeNum.js error');
  }
}
