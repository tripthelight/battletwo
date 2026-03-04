import findCharDecCode from '@/client/js/functions/findCharDecCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';

/**
 * @param {boolean} _even 짝수면 true | 홀수면 false
 * @param {number} _idx playerNumOrder index -> ul.cube 내 li 큐브의 순서 index를 의미
 */
export default (_even, _idx) => {
  try {
    if (_even) {
      // 짝수
      switch (_idx) {
        case 0: return findCharDecCode([89, 73, 69, 84, 67, 65, 72, 71, 80, 74]); // EVEN_0
        case 1: return findCharDecCode([86, 87, 74, 85, 80, 75, 83, 77, 65, 67]); // EVEN_1
        case 2: return findCharDecCode([73, 87, 71, 80, 75, 89, 90, 66, 81, 65]); // EVEN_2
        case 3: return findCharDecCode([75, 82, 73, 86, 90, 70, 84, 85, 88, 87]); // EVEN_3
        case 4: return findCharDecCode([71, 70, 79, 83, 67, 69, 90, 89, 86, 77]); // EVEN_4
        case 5: return findCharDecCode([89, 77, 85, 80, 81, 70, 65, 66, 88, 69]); // EVEN_5
        case 6: return findCharDecCode([75, 77, 73, 89, 71, 74, 67, 66, 70, 80]); // EVEN_6
        case 7: return findCharDecCode([83, 65, 68, 67, 73, 69, 84, 66, 89, 75]); // EVEN_7
        case 8: return findCharDecCode([67, 87, 89, 90, 83, 72, 71, 73, 88, 75]); // EVEN_8
        default: throw throwObj("sessionStorageLoss", "cubeColorCode - cube even index faild.");
      }
    } else {
      // 홀수
      switch (_idx) {
        case 0: return findCharDecCode([82, 83, 73, 86, 88, 77, 74, 89, 78, 66]); // ODD_0
        case 1: return findCharDecCode([73, 71, 68, 88, 83, 69, 74, 78, 72, 70]); // ODD_1
        case 2: return findCharDecCode([83, 67, 72, 89, 66, 75, 71, 69, 78, 88]); // ODD_2
        case 3: return findCharDecCode([87, 66, 80, 69, 73, 88, 83, 89, 67, 65]); // ODD_3
        case 4: return findCharDecCode([86, 77, 72, 89, 73, 88, 69, 80, 68, 71]); // ODD_4
        case 5: return findCharDecCode([67, 89, 71, 83, 78, 74, 75, 81, 70, 85]); // ODD_5
        case 6: return findCharDecCode([83, 86, 85, 76, 79, 74, 72, 73, 81, 84]); // ODD_6
        case 7: return findCharDecCode([90, 78, 79, 80, 65, 66, 81, 75, 73, 85]); // ODD_7
        case 8: return findCharDecCode([88, 87, 75, 69, 73, 74, 89, 81, 77, 66]); // ODD_8
        default: throw throwObj("sessionStorageLoss", "cubeColorCode - cube odd index faild.");
      }
    }
  } catch (error) {
    throw throwObj(error?.errCase ?? 'cardNum', error?.message ?? 'cubeColorCode.js error');
  }
}
