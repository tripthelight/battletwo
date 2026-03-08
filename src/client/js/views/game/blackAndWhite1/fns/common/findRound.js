import findCharDecCode from '@/client/js/functions/findCharDecCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';

/**
 * @param {string} _prev sessionStorage에 저장된 난독화된 현재 round 번호
 * @returns {number} 난독화된 다음 라운드 번호
 */
export default (_prev) => {
  try {
    const R = dec(_prev);
    const N = (arr) => enc(encryptNumOfStr(_t(arr)));
    const D = (n) => dec(n);

    switch (R) {
      case D(N([101, 119, 101, 119, 101, 119, 101, 101])): // "ewewewee" : 0
        return N([119, 101, 119, 101, 119, 119, 119, 114]); // "wewewwwr" : 1
      case D(N([119, 119, 101, 101, 101, 119, 101, 98])): // "wweeeweb" : 1
        return N([101, 101, 119, 119, 101, 119, 101, 112]); // "eewwewep" : 2
      case D(N([119, 101, 119, 119, 101, 101, 101, 54])): // "wewweee6" : 2
        return N([119, 119, 119, 101, 101, 101, 101, 99]); // "wwweeeec" : 3
      case D(N([101, 101, 101, 119, 119, 119, 101, 122])): // "eeewwwez" : 3
        return N([119, 119, 101, 101, 119, 119, 119, 111]); // "wweewwwo" : 4
      case D(N([101, 101, 101, 101, 101, 119, 101, 115])): // "eeeeewes" : 4
        return N([119, 119, 119, 119, 119, 101, 119, 107]); // "wwwwwewk" : 5
      case D(N([101, 119, 119, 119, 119, 101, 119, 50])): // "ewwwwew2" : 5
        return N([119, 101, 101, 101, 101, 101, 101, 100]); // "weeeeeed" : 6
      case D(N([101, 119, 119, 119, 119, 119, 119, 52])): // "ewwwwww4" : 6
        return N([101, 101, 119, 119, 101, 101, 119, 105]); // "eewweewi" : 7
      case D(N([119, 119, 101, 101, 119, 119, 101, 117])): // "wweewweu" : 7
        return N([101, 119, 119, 101, 119, 119, 119, 97]); // "ewwewwwa" : 8
      case D(N([119, 101, 119, 101, 119, 119, 101, 53])): // "wewewwe5" : 8
        return N([101, 101, 101, 101, 119, 119, 119, 102]); // "eeeewwwf" : 9
      case D(N([119, 119, 119, 101, 101, 101, 101, 116])): // "wwweeeet" : 9
        return N([119, 119, 101, 101, 119, 101, 119, 120]); // "wweewewx" : 10

      default: throw throwObj('sessionStorageLoss', 'findRound - find next round faild.');
    };
  } catch (error) {
    throw throwObj(error?.errCase ?? 'errorComn', error?.message ?? 'findRound.js error');
  }
}
