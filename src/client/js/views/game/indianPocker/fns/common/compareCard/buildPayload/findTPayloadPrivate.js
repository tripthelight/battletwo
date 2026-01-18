import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import fnv1a32 from '@/client/js/module/base64/fnv1a32';

export default (_hash, _key) => {
  const key = (code) => fnv1a32(String(code), _key);
  // TODO: 아래 case 순서 1 ~ 10 은 섞어야 함
  // private card nums
  try {
    switch (_hash) {
      case key(findCharCode([70, 75, 89, 88, 73, 78, 67, 86, 85, 80])): return {mode: 1, recs: [[75, 68, 0],[75, 188, 1]]}; // CARD NUM : 2
      case key(findCharCode([67, 87, 89, 84, 72, 77, 85, 71, 76, 68])): return {mode: 0, recs: [[75, 128, 0]]}; // CARD NUM : 1
      case key(findCharCode([76, 88, 83, 71, 77, 90, 65, 89, 85, 70])): return {mode: 1, recs: [[75, 61, 0],[75, 128, 0],[75, 195, 1]]}; // CARD NUM : 3
      case key(findCharCode([84, 82, 72, 76, 85, 69, 75, 89, 80, 73])): return {mode: 1, recs: [[35, 61, 0],[115, 61, 0],[35, 195, 1],[115, 195, 1]]}; // CARD NUM : 4
      case key(findCharCode([72, 70, 83, 80, 79, 69, 87, 66, 68, 73])): return {mode: 1, recs: [[35, 61, 0],[115, 61, 0],[75, 128, 0],[35, 195, 1],[115, 195, 1]]}; // CARD NUM : 5
      case key(findCharCode([82, 84, 65, 83, 81, 79, 67, 71, 73, 90])): return {mode: 1, recs: [[35, 61, 0],[115, 61, 0],[35, 128, 0],[115, 128, 0],[35, 195, 1],[115, 195, 1]]}; // CARD NUM : 6
      case key(findCharCode([89, 75, 73, 81, 72, 82, 87, 79, 77, 74])): return {mode: 1, recs: [[35, 61, 0],[115, 61, 0],[75, 95, 0],[35, 128, 0],[115, 128, 0],[35, 195, 1],[115, 195, 1]]}; // CARD NUM : 7
      case key(findCharCode([82, 80, 83, 71, 76, 68, 84, 89, 70, 67])): return {mode: 1, recs: [[35, 61, 2],[115, 61, 2],[75, 95, 2],[35, 128, 2],[115, 128, 2],[75, 161, 3],[35, 195, 3],[115, 195, 3]]}; // CARD NUM : 8
      case key(findCharCode([69, 74, 76, 85, 73, 77, 84, 88, 80, 67])): return {mode: 1, recs: [[35, 61, 2],[115, 61, 2],[35, 108, 2],[115, 108, 2],[75, 128, 2],[35, 148, 3],[115, 148, 3],[35, 195, 3],[115, 195, 3]]}; // CARD NUM : 9
      case key(findCharCode([75, 69, 67, 68, 78, 66, 70, 65, 88, 77])): return {mode: 1, recs: [[35, 61, 2],[115, 61, 2],[75, 88, 2],[35, 108, 2],[115, 108, 2],[35, 148, 3],[115, 148, 3],[75, 168, 3],[35, 195, 3],[115, 195, 3]]}; // CARD NUM : 10

      default: throw throwObj('private card T payload value', 'public card T payload value not descryption');
    }
  } catch (error) {
    throw throwObj(error?.errCase ?? 'private payload value descryption Validation', error?.message ?? 'find payload Validation error');
  }
}
