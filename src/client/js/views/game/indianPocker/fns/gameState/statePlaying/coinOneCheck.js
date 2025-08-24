import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { RULES } from '@/client/js/views/game/indianPocker/fns/rule/rules.js';
import removeCardElem from '@/client/js/views/game/indianPocker/fns/common/removeCardElem.js';
import gameEnd from '@/client/js/views/game/indianPocker/fns/common/gameEnd.js';

export default () => {
  // element | seeeion 체크
  const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
  const encryptVal_2 = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false

  const DREW_CHECK = window.sessionStorage.drewState;
  if (DREW_CHECK || DREW_CHECK === 'true') return;
  // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  // if (!COINS_PLAYER) return errorManagement({ errCase: 'sessionStorageLoss', message: '코인 1 체크 중 coinsPlayer 세션이 없습니다.' });
  const encryptKey2 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  if (encryptVal2 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: '코인 1 체크 중 coinsPlayer 세션이 없습니다.' });
  const decryptVal2 = dec(encryptVal2); // coinsPlayer value number

  // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
  // if (!COINS_ENEMY) return errorManagement({ errCase: 'sessionStorageLoss', message: '코인 1 체크 중 coinsEnemy 세션이 없습니다.' });
  const encryptKey3 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
  const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
  if (encryptVal3 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: '코인 1 체크 중 coinsEnemy 세션이 없습니다.' });
  const decryptVal3 = dec(encryptVal3); // coinsEnemy value number

  // if (Number(COINS_PLAYER) > 0 && Number(COINS_ENEMY) > 0) return;
  if (Number(decryptVal2) > 0 && Number(decryptVal3) > 0) return;

  const encryptKey4 = findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]); // extFirstBet
  const decryptVal4 = window.sessionStorage.getItem(encryptKey4);
  if (decryptVal4 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: '코인 1 체크 중 extFirstBet 세션이 없습니다.' });
  if (decryptVal4 === encryptVal_1) return; // extFirstBet === true

  // 명령
  setTimeout(() => {
    // if (EXT_FIRST_BET === 'false' && (Number(COINS_PLAYER) === 0 || Number(COINS_ENEMY) === 0)) {
    if (
      decryptVal4 === encryptVal_2 && // extFirstBet === false
      (
        Number(decryptVal2) === 0 || // coinsPlayer === 0
        Number(decryptVal3) === 0 // coinsEnemy === 0
      )
    ) {
      RULES.COMN();
      removeCardElem().then(() => {
        gameEnd();
      });
    }
  }, timeInterval_1);
};
