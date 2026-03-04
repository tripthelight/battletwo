import findCharDecCode from '@/client/js/functions/findCharDecCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';

/**
 * @param {boolean} _code even이거나 odd 에 해당하는 암호화된 code
 * @returns {string} even | odd
 */
export default (_code) => {
  try {
    switch (_code) {
      case findCharDecCode([89, 73, 69, 84, 67, 65, 72, 71, 80, 74]): return "even"; // EVEN_0
      case findCharDecCode([86, 87, 74, 85, 80, 75, 83, 77, 65, 67]): return "even"; // EVEN_1
      case findCharDecCode([73, 87, 71, 80, 75, 89, 90, 66, 81, 65]): return "even"; // EVEN_2
      case findCharDecCode([75, 82, 73, 86, 90, 70, 84, 85, 88, 87]): return "even"; // EVEN_3
      case findCharDecCode([71, 70, 79, 83, 67, 69, 90, 89, 86, 77]): return "even"; // EVEN_4
      case findCharDecCode([89, 77, 85, 80, 81, 70, 65, 66, 88, 69]): return "even"; // EVEN_5
      case findCharDecCode([75, 77, 73, 89, 71, 74, 67, 66, 70, 80]): return "even"; // EVEN_6
      case findCharDecCode([83, 65, 68, 67, 73, 69, 84, 66, 89, 75]): return "even"; // EVEN_7
      case findCharDecCode([67, 87, 89, 90, 83, 72, 71, 73, 88, 75]): return "even"; // EVEN_8
      case findCharDecCode([82, 83, 73, 86, 88, 77, 74, 89, 78, 66]): return "odd"; // ODD_0
      case findCharDecCode([73, 71, 68, 88, 83, 69, 74, 78, 72, 70]): return "odd"; // ODD_1
      case findCharDecCode([83, 67, 72, 89, 66, 75, 71, 69, 78, 88]): return "odd"; // ODD_2
      case findCharDecCode([87, 66, 80, 69, 73, 88, 83, 89, 67, 65]): return "odd"; // ODD_3
      case findCharDecCode([86, 77, 72, 89, 73, 88, 69, 80, 68, 71]): return "odd"; // ODD_4
      case findCharDecCode([67, 89, 71, 83, 78, 74, 75, 81, 70, 85]): return "odd"; // ODD_5
      case findCharDecCode([83, 86, 85, 76, 79, 74, 72, 73, 81, 84]): return "odd"; // ODD_6
      case findCharDecCode([90, 78, 79, 80, 65, 66, 81, 75, 73, 85]): return "odd"; // ODD_7
      case findCharDecCode([88, 87, 75, 69, 73, 74, 89, 81, 77, 66]): return "odd"; // ODD_8
      default: throw throwObj('sessionStorageLoss', 'cubeAddColor - cube even odd code faild.');
    }
  } catch (error) {
    throw throwObj(error?.errCase ?? 'errorComn', error?.message ?? 'cubeAddColor.js error');
  }
}
