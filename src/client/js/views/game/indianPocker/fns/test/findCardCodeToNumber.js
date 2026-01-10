import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharDecCode from '@/client/js/functions/findCharDecCode';

/**
 * TEST:
 * PUBLIC_CARD_NUMS 중 하나를 받아서 코드에 매칭되는 카드 숫자를 리턴
 * @param {string} _code public card number code
 * @returns {number} 카드 코드에 매칭되는 카드 숫자
 */
export default function (_code) {
  try {
    switch (_code) {
      // CARD NUM : 1
      case findCharDecCode([79, 69, 74, 78, 73, 72, 77, 75, 88, 84]): {
        return 1;
      }
      // CARD NUM : 2
      case findCharDecCode([71, 73, 90, 70, 78, 80, 84, 83, 86, 75]): {
        return 2;
      }
      // CARD NUM : 3
      case findCharDecCode([79, 67, 78, 76, 84, 71, 77, 70, 75, 83]): {
        return 3;
      }
      // CARD NUM : 4
      case findCharDecCode([68, 75, 72, 79, 88, 77, 73, 86, 69, 65]): {
        return 4;
      }
      // CARD NUM : 5
      case findCharDecCode([80, 68, 66, 73, 90, 85, 79, 70, 77, 74]): {
        return 5;
      }
      // CARD NUM : 6
      case findCharDecCode([75, 70, 79, 85, 68, 66, 82, 90, 86, 73]): {
        return 6;
      }
      // CARD NUM : 7
      case findCharDecCode([77, 73, 80, 71, 83, 72, 68, 65, 85, 70]): {
        return 7;
      }
      // CARD NUM : 8
      case findCharDecCode([83, 74, 82, 87, 84, 68, 71, 85, 88, 72]): {
        return 8;
      }
      // CARD NUM : 9
      case findCharDecCode([72, 74, 90, 85, 84, 79, 88, 70, 81, 65]): {
        return 9;
      }
      // CARD NUM : 10
      case findCharDecCode([74, 82, 80, 70, 73, 71, 83, 66, 68, 78]): {
        return 10;
      }
      default: throw throwObj('select card value', 'select card value not found');
    }
  } catch (error) {
    throw throwObj(error?.errCase ?? 'select card value Validation', error?.message ?? 'select card value Validation error');
  }
}
