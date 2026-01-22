import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import findCharDecCode from '@/client/js/functions/findCharDecCode';


export default (_code) => {
  try {
    switch (_code) {
      // CARD NUM : 1
      case findCharCode([70, 75, 89, 88, 73, 78, 67, 86, 85, 80]): {
        return findCharDecCode([79, 69, 74, 78, 73, 72, 77, 75, 88, 84])
      }
      // CARD NUM : 2
      case findCharCode([67, 87, 89, 84, 72, 77, 85, 71, 76, 68]): {
        return findCharDecCode([71, 73, 90, 70, 78, 80, 84, 83, 86, 75])
      }
      // CARD NUM : 3
      case findCharCode([76, 88, 83, 71, 77, 90, 65, 89, 85, 70]): {
        return findCharDecCode([79, 67, 78, 76, 84, 71, 77, 70, 75, 83])
      }
      // CARD NUM : 4
      case findCharCode([84, 82, 72, 76, 85, 69, 75, 89, 80, 73]): {
        return findCharDecCode([68, 75, 72, 79, 88, 77, 73, 86, 69, 65])
      }
      // CARD NUM : 5
      case findCharCode([72, 70, 83, 80, 79, 69, 87, 66, 68, 73]): {
        return findCharDecCode([80, 68, 66, 73, 90, 85, 79, 70, 77, 74])
      }
      // CARD NUM : 6
      case findCharCode([82, 84, 65, 83, 81, 79, 67, 71, 73, 90]): {
        return findCharDecCode([75, 70, 79, 85, 68, 66, 82, 90, 86, 73])
      }
      // CARD NUM : 7
      case findCharCode([89, 75, 73, 81, 72, 82, 87, 79, 77, 74]): {
        return findCharDecCode([77, 73, 80, 71, 83, 72, 68, 65, 85, 70])
      }
      // CARD NUM : 8
      case findCharCode([82, 80, 83, 71, 76, 68, 84, 89, 70, 67]): {
        return findCharDecCode([83, 74, 82, 87, 84, 68, 71, 85, 88, 72])
      }
      // CARD NUM : 9
      case findCharCode([69, 74, 76, 85, 73, 77, 84, 88, 80, 67]): {
        return findCharDecCode([72, 74, 90, 85, 84, 79, 88, 70, 81, 65])
      }
      // CARD NUM : 10
      case findCharCode([75, 69, 67, 68, 78, 66, 70, 65, 88, 77]): {
        return findCharDecCode([74, 82, 80, 70, 73, 71, 83, 66, 68, 78])
      }
      default: throw {errCase: 'cardNum', message: 'battle card value not found'};
    }
  } catch (error) {
    throw throwObj(error?.errCase ?? 'cardNum', error?.message ?? 'battle card value not found');
  }
};
