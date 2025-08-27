import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import booleanReturn from '@/client/js/functions/validation/booleanReturn';

export default (_name) => {
  switch (_name) {
    case 'RN':
      // TODO: roomName을 리턴애서 어디에 쓰지?
      // return window.sessionStorage.roomName;
      return window.sessionStorage.getItem(findCharCode([74, 86, 88, 78, 80, 70, 85, 72, 87, 68]));
    case 'BU':
      // return window.sessionStorage.betUser;
      const keys2 = [72, 70, 85, 67, 83, 68, 89, 82, 77, 88];  // betUser
      const encryptKey2 = findCharCode(keys2);
      const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
      const decryptVal2 = booleanCheck(keys2);
      return booleanReturn(keys2); // true/false/''
    case 'BUF':
      // return window.sessionStorage.betUserFirst;
      const keys3 = [90, 89, 80, 70, 68, 84, 65, 77, 74, 78];  // betUserFirst
      const encryptKey3 = findCharCode(keys3);
      const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
      const decryptVal3 = booleanCheck(keys3);
      return booleanReturn(keys3); // true/false/''
    case 'EFB':
      const encryptKey4 = findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]); // extFirstBet
      const encryptVal4 = window.sessionStorage.getItem(encryptKey4);
      // return decryptVal4;
      return X.dec(encryptVal4); // {boolean} true / false
    case 'CP':
      // return window.sessionStorage.coinsPlayer && Number(window.sessionStorage.coinsPlayer) > 0 ? Number(window.sessionStorage.coinsPlayer) : 0;
      const encryptKey5 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]);  // coinsPlayer
      const encryptVal5 = window.sessionStorage.getItem(encryptKey5);
      const decryptVal5 = encryptVal5 !== null && encryptVal5 !== '' ? dec(encryptVal5) : 0; // coinsPlayer value number
      return encryptVal5 !== null && decryptVal5 > 0 ? decryptVal5 : 0;
    case 'CPB':
      // return window.sessionStorage.coinsPlayerBet && Number(window.sessionStorage.coinsPlayerBet) > 0 ? Number(window.sessionStorage.coinsPlayerBet) : 0;
      const encryptKey6 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
      const encryptVal6 = window.sessionStorage.getItem(encryptKey6);
      const decryptVal6 = encryptVal6 !== null && encryptVal6 !== '' ? dec(encryptVal6) : 0; // coinsPlayerBet value number
      return encryptVal6 !== null && decryptVal6 > 0 ? decryptVal6 : 0;
    case 'CPEB':
      // return window.sessionStorage.coinsPlayerExtBet && Number(window.sessionStorage.coinsPlayerExtBet) > 0 ? Number(window.sessionStorage.coinsPlayerExtBet) : 0;
      const encryptKey7 = findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]); // coinsPlayerExtBet
      const encryptVal7 = window.sessionStorage.getItem(encryptKey7);
      const decryptVal7 = encryptVal7 !== null && encryptVal7 !== '' ? dec(encryptVal7) : 0; // coinsPlayerExtBet value number
      return decryptVal7 !== null && decryptVal7 > 0 ? decryptVal7 : 0;
    case 'CE':
      // return window.sessionStorage.coinsEnemy && Number(window.sessionStorage.coinsEnemy) > 0 ? Number(window.sessionStorage.coinsEnemy) : 0;
      const encryptKey8 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
      const encryptVal8 = window.sessionStorage.getItem(encryptKey8);
      const decryptVal8 = encryptVal8 !== null && encryptVal8 !== '' ? dec(encryptVal8) : 0; // coinsEnemy value number
      return encryptVal8 !== null && decryptVal8 > 0 ? decryptVal8 : 0;
    case 'CEB':
      return window.sessionStorage.coinsEnemyBet && Number(window.sessionStorage.coinsEnemyBet) > 0 ? Number(window.sessionStorage.coinsEnemyBet) : 0;
    case 'CEEB':
      return window.sessionStorage.coinsEnemyExtBet && Number(window.sessionStorage.coinsEnemyExtBet) > 0 ? Number(window.sessionStorage.coinsEnemyExtBet) : 0;
    default:
      break;
  }
};
