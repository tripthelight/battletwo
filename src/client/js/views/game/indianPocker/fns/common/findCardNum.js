import findCharCode from '@/client/js/functions/findCharCode';
import { errorManagement } from '@/client/js/module/errorManagement';

export default (_code) => {
  switch (_code) {
    case findCharCode([79, 69, 74, 78, 73, 72, 77, 75, 88, 84]):
      return 1;
    case findCharCode([71, 73, 90, 70, 78, 80, 84, 83, 86, 75]):
      return 2;
    case findCharCode([79, 67, 78, 76, 84, 71, 77, 70, 75, 83]):
      return 3;
    case findCharCode([68, 75, 72, 79, 88, 77, 73, 86, 69, 65]):
      return 4;
    case findCharCode([80, 68, 66, 73, 90, 85, 79, 70, 77, 74]):
      return 5;
    case findCharCode([75, 70, 79, 85, 68, 66, 82, 90, 86, 73]):
      return 6;
    case findCharCode([77, 73, 80, 71, 83, 72, 68, 65, 85, 70]):
      return 7;
    case findCharCode([83, 74, 82, 87, 84, 68, 71, 85, 88, 72]):
      return 8;
    case findCharCode([72, 74, 90, 85, 84, 79, 88, 70, 81, 65]):
      return 9;
    case findCharCode([74, 82, 80, 70, 73, 71, 83, 66, 68, 78]):
      return 10;
    default:
      // return errorManagement({ errCase: 'cardNum', message: 'drawEnemyCard.js - not find card' });
      throw { errCase: 'cardNum', message: 'drawEnemyCard.js - not find card' }
  }
};
