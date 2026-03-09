import findCharCode from '@/client/js/functions/findCharCode';
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
    const E = (arr) => enc(encryptNumOfStr(_t(arr)));
    const D = (cod) => dec(cod);
    const C = (arr) => D(E(arr));
    const RV = (arr) => arr[Math.floor(Math.random() * arr.length)];

    switch (_num) {
      case C([119, 101, 101, 101, 101, 101, 101, 119]): // "weeeeeew" : 0
        return findCharCode(
          RV([
            [71, 85, 68, 90, 70, 77, 76, 79, 89, 87],
            [77, 72, 86, 89, 80, 85, 84, 78, 74, 71],
            [90, 76, 78, 69, 86, 72, 83, 87, 84, 68],
            [76, 77, 83, 71, 74, 78, 65, 81, 66, 88]
          ])
        );
      case C([119, 101, 119, 101, 119, 101, 119, 98]): // "wewewewb" : 1
        return findCharCode(
          RV([
            [83, 82, 67, 87, 72, 68, 77, 65, 70, 66],
            [65, 71, 79, 81, 73, 66, 76, 72, 85, 77],
            [83, 82, 74, 71, 79, 80, 70, 72, 81, 85],
            [89, 70, 87, 69, 75, 84, 83, 88, 76, 77]
          ])
        );
      case C([101, 101, 119, 101, 101, 101, 101, 112]): // "eeweeeep" : 2
        return findCharCode(
          RV([
            [87, 80, 71, 77, 76, 84, 67, 74, 69, 83],
            [65, 69, 88, 83, 74, 67, 89, 75, 85, 79],
            [89, 78, 67, 80, 87, 74, 73, 85, 71, 83],
            [83, 71, 81, 86, 68, 76, 66, 78, 87, 70]
          ])
        );
      case C([101, 119, 101, 101, 101, 101, 101, 99]): // "eweeeeec" : 3
        return findCharCode(
          RV([
            [66, 67, 73, 89, 69, 72, 76, 79, 85, 75],
            [84, 83, 70, 71, 76, 75, 68, 66, 69, 89],
            [69, 74, 80, 85, 77, 66, 70, 83, 75, 89],
            [89, 70, 90, 65, 67, 72, 84, 86, 83, 88]
          ])
        );
      case C([119, 101, 119, 119, 119, 101, 119, 111]): // "wewwwewo" : 4
        return findCharCode(
          RV([
            [86, 66, 72, 80, 71, 73, 75, 68, 79, 67],
            [71, 83, 85, 68, 75, 84, 90, 88, 69, 66],
            [81, 66, 80, 87, 89, 77, 85, 76, 67, 90],
            [67, 72, 69, 73, 70, 86, 87, 71, 65, 89]
          ])
        );
      case C([119, 101, 119, 119, 101, 119, 101, 107]): // "wewwewek" : 5
        return findCharCode(
          RV([
            [71, 68, 88, 82, 70, 76, 69, 77, 79, 90],
            [77, 86, 82, 73, 75, 70, 81, 76, 71, 88],
            [81, 84, 68, 86, 73, 66, 78, 82, 67, 80],
            [86, 76, 84, 80, 78, 70, 90, 65, 72, 68]
          ])
        );
      case C([101, 119, 119, 119, 119, 101, 101, 100]): // "ewwwweed" : 6
        return findCharCode(
          RV([
            [73, 75, 69, 77, 71, 78, 87, 76, 72, 84],
            [71, 74, 66, 68, 75, 69, 87, 70, 82, 89],
            [66, 89, 80, 75, 70, 72, 76, 74, 81, 68],
            [75, 72, 80, 70, 74, 81, 85, 68, 89, 66]
          ])
        );
      case C([101, 119, 119, 101, 119, 119, 101, 105]): // "ewwewwei" : 7
        return findCharCode(
          RV([
            [78, 86, 84, 82, 75, 74, 77, 88, 90, 79],
            [77, 78, 85, 83, 68, 82, 84, 65, 72, 79],
            [83, 81, 90, 74, 86, 72, 77, 79, 71, 70],
            [67, 70, 77, 85, 73, 90, 80, 79, 69, 71]
          ])
        );
      case C([119, 119, 119, 119, 101, 101, 119, 97]): // "wwwweewa" : 8
        return findCharCode(
          RV([
            [66, 73, 84, 78, 90, 75, 80, 72, 65, 79],
            [75, 77, 72, 88, 67, 69, 82, 85, 78, 80],
            [70, 90, 66, 89, 71, 81, 80, 83, 72, 65],
            [67, 89, 71, 77, 86, 76, 78, 69, 75, 84]
          ])
        );
      default: throw throwObj('sessionStorageLoss', 'NumToCube - cube code to num faild.');
    }
  } catch (error) {
    throw throwObj(error?.errCase ?? 'errorComn', error?.message ?? 'NumToCube.js error');
  }
}
