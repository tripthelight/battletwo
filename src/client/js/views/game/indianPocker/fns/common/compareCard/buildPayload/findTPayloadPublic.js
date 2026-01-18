import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharDecCode from '@/client/js/functions/findCharDecCode';
import fnv1a32 from '@/client/js/module/base64/fnv1a32';

export default (_hash, _key) => {
  const key = (code) => fnv1a32(String(code), _key);
  // TODO: 아래 case 순서 1 ~ 10 은 섞어야 함
  // public card nums
  try {
    switch (_hash) {
      case key(findCharDecCode([79, 69, 74, 78, 73, 72, 77, 75, 88, 84])): return {mode: 0, recs: [[75, 128, 0]]}; // CARD NUM : 1
      case key(findCharDecCode([71, 73, 90, 70, 78, 80, 84, 83, 86, 75])): return {mode: 1, recs: [[75, 68, 0],[75, 188, 1]]}; // CARD NUM : 2
      case key(findCharDecCode([79, 67, 78, 76, 84, 71, 77, 70, 75, 83])): return {mode: 1, recs: [[75, 61, 0],[75, 128, 0],[75, 195, 1]]}; // CARD NUM : 3
      case key(findCharDecCode([68, 75, 72, 79, 88, 77, 73, 86, 69, 65])): return {mode: 1, recs: [[35, 61, 0],[115, 61, 0],[35, 195, 1],[115, 195, 1]]}; // CARD NUM : 4
      case key(findCharDecCode([80, 68, 66, 73, 90, 85, 79, 70, 77, 74])): return {mode: 1, recs: [[35, 61, 0],[115, 61, 0],[75, 128, 0],[35, 195, 1],[115, 195, 1]]}; // CARD NUM : 5
      case key(findCharDecCode([75, 70, 79, 85, 68, 66, 82, 90, 86, 73])): return {mode: 1, recs: [[35, 61, 0],[115, 61, 0],[35, 128, 0],[115, 128, 0],[35, 195, 1],[115, 195, 1]]}; // CARD NUM : 6
      case key(findCharDecCode([77, 73, 80, 71, 83, 72, 68, 65, 85, 70])): return {mode: 1, recs: [[35, 61, 0],[115, 61, 0],[75, 95, 0],[35, 128, 0],[115, 128, 0],[35, 195, 1],[115, 195, 1]]}; // CARD NUM : 7
      case key(findCharDecCode([83, 74, 82, 87, 84, 68, 71, 85, 88, 72])): return {mode: 1, recs: [[35, 61, 2],[115, 61, 2],[75, 95, 2],[35, 128, 2],[115, 128, 2],[75, 161, 3],[35, 195, 3],[115, 195, 3]]}; // CARD NUM : 8
      case key(findCharDecCode([72, 74, 90, 85, 84, 79, 88, 70, 81, 65])): return {mode: 1, recs: [[35, 61, 2],[115, 61, 2],[35, 108, 2],[115, 108, 2],[75, 128, 2],[35, 148, 3],[115, 148, 3],[35, 195, 3],[115, 195, 3]]}; // CARD NUM : 9
      case key(findCharDecCode([74, 82, 80, 70, 73, 71, 83, 66, 68, 78])): return {mode: 1, recs: [[35, 61, 2],[115, 61, 2],[75, 88, 2],[35, 108, 2],[115, 108, 2],[35, 148, 3],[115, 148, 3],[75, 168, 3],[35, 195, 3],[115, 195, 3]]}; // CARD NUM : 10

      default: throw throwObj('public card T payload value', 'public card T payload value not descryption');
    }
  } catch (error) {
    throw throwObj(error?.errCase ?? 'find payload value descryption Validation', error?.message ?? 'find payload Validation error');
  }
}
