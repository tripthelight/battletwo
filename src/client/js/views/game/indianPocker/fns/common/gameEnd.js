import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import {GRS} from '@/client/js/module/crypts/generateRandomString';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import indianPockerGameState from '@/client/js/gameState/indianPocker';

export default () => {
  // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  // if (!COINS_PLAYER) return errorManagement({ errCase: 'sessionStorageLoss', message: 'gameover 체크에서 coinsPlayer 세션이 없습니다.' });
  const encryptKey1 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  if (encryptVal1 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'gameover 체크에서 coinsPlayer 세션이 없습니다.' });
  const decryptVal1 = dec(encryptVal1); // coinsEnemy value number

  // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
  // if (!COINS_ENEMY) return errorManagement({ errCase: 'sessionStorageLoss', message: 'gameover 체크에서 coinsEnemy 세션이 없습니다.' });
  const encryptKey2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  if (encryptVal2 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'gameover 체크에서 coinsEnemy 세션이 없습니다.' });
  const decryptVal2 = dec(encryptVal2); // coinsEnemy value number

  setTimeout(() => {
    const compairPeer = encryptNumOfStr(GRS([_t([101]), _t([119])],parseInt(_t([50])))); // ex) "ew" : 0
    const encryptKey3 = findCharCode([79, 85, 77, 74, 71, 78, 80, 67, 81, 72]); // result
    // if (Number(COINS_PLAYER) === 0) storageMethod('s', 'SET_ITEM', 'result', false);
    // decryptVal1 === 0
    if (Number(decryptVal1) === compairPeer) {
      storageMethod('s', 'SET_ITEM',
        encryptKey3, // result
        X.enc(decodeTF(_t([106, 111, 118, 105, 117]))) // "joviu" : false
      );
    };

    // if (Number(COINS_ENEMY) === 0) storageMethod('s', 'SET_ITEM', 'result', true);
    // decryptVal2 === 0
    if (Number(decryptVal2) === compairPeer) {
      storageMethod('s', 'SET_ITEM',
        encryptKey3, // result
        X.enc(decodeTF(_t([99, 109, 114, 110]))) // "cmrn" : true
      );
    };

    setTimeout(() => {
      indianPockerGameState.gameOver();
    }, timeInterval_1);
  }, timeInterval_1);
};
