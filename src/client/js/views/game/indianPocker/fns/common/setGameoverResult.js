import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import { GRS } from '@/client/js/module/crypts/generateRandomString';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import storageMethod from '@/client/js/module/storage/storageMethod';

export default function setGameoverResult() {
  const coinsPlayerKey = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
  const coinsEnemyKey = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
  const coinsPlayerValue = window.sessionStorage.getItem(coinsPlayerKey);
  const coinsEnemyValue = window.sessionStorage.getItem(coinsEnemyKey);

  if (coinsPlayerValue === null || coinsEnemyValue === null) return false;

  const zero = encryptNumOfStr(GRS([_t([101]), _t([119])], parseInt(_t([50])))); // ex) "ew" : 0
  const resultKey = findCharCode([79, 85, 77, 74, 71, 78, 80, 67, 81, 72]); // result
  let resultSaved = false;

  if (Number(dec(coinsPlayerValue)) === zero) {
    storageMethod(
      's',
      'SET_ITEM',
      resultKey,
      X.enc(decodeTF(_t([106, 111, 118, 105, 117]))) // "joviu" : false
    );
    resultSaved = true;
  }

  if (Number(dec(coinsEnemyValue)) === zero) {
    storageMethod(
      's',
      'SET_ITEM',
      resultKey,
      X.enc(decodeTF(_t([99, 109, 114, 110]))) // "cmrn" : true
    );
    resultSaved = true;
  }

  return resultSaved;
}
