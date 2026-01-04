import findCharDecCode from '@/client/js/functions/findCharDecCode';
import { deobfuscateNumber } from '@/client/js/module/crypts/encryptNumber';


export default (_c, _n) => {
  // slice code
  const SC = (s) => _c.slice(0, deobfuscateNumber(s));

  // TODO: 아래 case 순서 1 ~ 10 은 섞어야 함
  try {
    switch (_n) {
      case findCharDecCode([79, 69, 74, 78, 73, 72, 77, 75, 88, 84]): return SC("p1bwof"); // CARD NUM : 1
      case findCharDecCode([71, 73, 90, 70, 78, 80, 84, 83, 86, 75]): return SC("p1bwo3"); // CARD NUM : 2
      case findCharDecCode([79, 67, 78, 76, 84, 71, 77, 70, 75, 83]): return SC("p1bwo7"); // CARD NUM : 3
      case findCharDecCode([68, 75, 72, 79, 88, 77, 73, 86, 69, 65]): return SC("p1bwor"); // CARD NUM : 4
      case findCharDecCode([80, 68, 66, 73, 90, 85, 79, 70, 77, 74]): return SC("p1bwov"); // CARD NUM : 5
      case findCharDecCode([75, 70, 79, 85, 68, 66, 82, 90, 86, 73]): return SC("p1bwoj"); // CARD NUM : 6
      case findCharDecCode([77, 73, 80, 71, 83, 72, 68, 65, 85, 70]): return SC("p1bwon"); // CARD NUM : 7
      case findCharDecCode([83, 74, 82, 87, 84, 68, 71, 85, 88, 72]): return SC("p1bwnf"); // CARD NUM : 8
      case findCharDecCode([72, 74, 90, 85, 84, 79, 88, 70, 81, 65]): return SC("p1bwnj"); // CARD NUM : 9
      case findCharDecCode([74, 82, 80, 70, 73, 71, 83, 66, 68, 78]): return _c; // CARD NUM : 10 - 42자리 코드는 slice 필요 없음
      default: throw throwObj('select card value', 'select card value not descryption');
    }
  } catch (error) {
    throw throwObj(error?.errCase ?? 'select card value descryption Validation', error?.message ?? 'select card value descryption Validation error');
  }
}
