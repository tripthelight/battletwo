import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';

// true / false module
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';

/**
 * 게임 결과를 sessionStorage에 저장하는 공통함수
 * @param {boolean} _result true | false
 * @param {Array<number>} _te true 배열
 * @param {Array<number>} _fe false 배열
 */
export default (_result, _te, _fe) => {
  storageMethod('s', 'SET_ITEM',
    findCharCode([67, 72, 86, 68, 83, 77, 74, 65, 88, 78]), // result
    _result ?
      X.enc(decodeTF(_t(_te))) // true
      :
      X.enc(decodeTF(_t(_fe))) // false
  );
}
