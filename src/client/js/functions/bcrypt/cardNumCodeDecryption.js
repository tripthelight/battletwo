import bcrypt from 'bcryptjs';
import { selectCompairNumbers } from '@/client/store/encryptionStore';
import findCardNum from '@/client/js/views/game/indianPocker/fns/common/findCardNum';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharDecCode from '@/client/js/functions/findCharDecCode';

export default function (_num) {
  const arr = [
    findCharDecCode([79, 69, 74, 78, 73, 72, 77, 75, 88, 84]),
    findCharDecCode([71, 73, 90, 70, 78, 80, 84, 83, 86, 75]),
    findCharDecCode([79, 67, 78, 76, 84, 71, 77, 70, 75, 83]),
    findCharDecCode([68, 75, 72, 79, 88, 77, 73, 86, 69, 65]),
    findCharDecCode([80, 68, 66, 73, 90, 85, 79, 70, 77, 74]),
    findCharDecCode([75, 70, 79, 85, 68, 66, 82, 90, 86, 73]),
    findCharDecCode([77, 73, 80, 71, 83, 72, 68, 65, 85, 70]),
    findCharDecCode([83, 74, 82, 87, 84, 68, 71, 85, 88, 72]),
    findCharDecCode([72, 74, 90, 85, 84, 79, 88, 70, 81, 65]),
    findCharDecCode([74, 82, 80, 70, 73, 71, 83, 66, 68, 78])
  ];

  // TODO: 바로 숫자를 리턴시키면 안되고 javascript로 SVG 만들 코드 리턴 필요
  // 아래 case 순서 1 ~ 10 은 섞어야 함
  try {
    switch (_num) {
      case findCharDecCode([79, 69, 74, 78, 73, 72, 77, 75, 88, 84]):
        // CARD NUM : 1
        return 1;
      case findCharDecCode([71, 73, 90, 70, 78, 80, 84, 83, 86, 75]):
        // CARD NUM : 2
        return 2;
      case findCharDecCode([79, 67, 78, 76, 84, 71, 77, 70, 75, 83]):
        // CARD NUM : 3
        return 3;
      case findCharDecCode([68, 75, 72, 79, 88, 77, 73, 86, 69, 65]):
        // CARD NUM : 4
        return 4;
      case findCharDecCode([80, 68, 66, 73, 90, 85, 79, 70, 77, 74]):
        // CARD NUM : 5
        return 5;
      case findCharDecCode([75, 70, 79, 85, 68, 66, 82, 90, 86, 73]):
        // CARD NUM : 6
        return 6;
      case findCharDecCode([77, 73, 80, 71, 83, 72, 68, 65, 85, 70]):
        // CARD NUM : 7
        return 7;
      case findCharDecCode([83, 74, 82, 87, 84, 68, 71, 85, 88, 72]):
        // CARD NUM : 8
        return 8;
      case findCharDecCode([72, 74, 90, 85, 84, 79, 88, 70, 81, 65]):
        // CARD NUM : 9
        return 9;
      case findCharDecCode([74, 82, 80, 70, 73, 71, 83, 66, 68, 78]):
        // CARD NUM : 10
        return 10;
      default:
        return '';
    }
  } catch (error) {
    throw throwObj(error?.errCase ?? 'cardNum', error?.message ?? 'card number not found');
  }
}
