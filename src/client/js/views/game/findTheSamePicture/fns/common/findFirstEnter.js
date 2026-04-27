import { getInitRole } from '@/client/js/module/webRTC/connectSignaling';

// true / false module
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';

/**
 * @param {Array<number>} _te true 배열
 * @param {Array<number>} _fe false 배열
 * @param {string} _fileName 실행 파일명
 */
export default (_te, _fe, _fileName) => {
  const ROLE = getInitRole();
  const FIRST_ENTER = ROLE === "impolite" ?
    X.dec(X.enc(decodeTF(_t(_te)))) // true
    :
    ROLE === "polite" ?
      X.dec(X.enc(decodeTF(_t(_fe)))) // false;
      :
      null;
  if (FIRST_ENTER === null) throw throwObj('dataManipulation', `${_fileName}.js > findFirstEnter.js - role failed.`);



  return FIRST_ENTER;
};
