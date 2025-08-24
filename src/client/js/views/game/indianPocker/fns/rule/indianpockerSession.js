import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';

export default (_name) => {
  switch (_name) {
    case 'RN':
      // TODO: roomName을 리턴애서 어디에 쓰지?
      // return window.sessionStorage.roomName;
      return window.sessionStorage.getItem(findCharCode([74, 86, 88, 78, 80, 70, 85, 72, 87, 68]));
    case 'BU':
      // return window.sessionStorage.betUser;
      const encryptKey2 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser
      const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
      return encryptVal2;
    case 'BUF':
      // return window.sessionStorage.betUserFirst;
      const encryptKey3 = findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst
      const decryptVal3 = window.sessionStorage.getItem(encryptKey3);
      return decryptVal3;
    case 'EFB':
      const encryptKey4 = findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]); // extFirstBet
      const decryptVal4 = window.sessionStorage.getItem(encryptKey4);
      return decryptVal4;
    case 'CP':
      // return window.sessionStorage.coinsPlayer && Number(window.sessionStorage.coinsPlayer) > 0 ? Number(window.sessionStorage.coinsPlayer) : 0;
      const encryptKey5 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]);  // coinsPlayer
      const encryptVal5 = window.sessionStorage.getItem(encryptKey5);
      const decryptVal5 = encryptVal5 ? dec(encryptVal5) : 0; // coinsPlayer value number
      return encryptVal5 !== null && decryptVal5 > 0 ? decryptVal5 : 0;
    case 'CPB':
      // return window.sessionStorage.coinsPlayerBet && Number(window.sessionStorage.coinsPlayerBet) > 0 ? Number(window.sessionStorage.coinsPlayerBet) : 0;
      const encryptKey6 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
      const encryptVal6 = window.sessionStorage.getItem(encryptKey6);
      const decryptVal6 = encryptVal6 ? dec(encryptVal6) : 0; // coinsPlayerBet value number
      return encryptVal6 !== null && decryptVal6 > 0 ? decryptVal6 : 0;
    case 'CPEB':
      return window.sessionStorage.coinsPlayerExtBet && Number(window.sessionStorage.coinsPlayerExtBet) > 0 ? Number(window.sessionStorage.coinsPlayerExtBet) : 0;
    case 'CE':
      // return window.sessionStorage.coinsEnemy && Number(window.sessionStorage.coinsEnemy) > 0 ? Number(window.sessionStorage.coinsEnemy) : 0;
      const encryptKey8 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
      const encryptVal8 = window.sessionStorage.getItem(encryptKey8);
      const decryptVal8 = encryptVal8 ? dec(encryptVal8) : 0; // coinsEnemy value number
      return encryptVal8 !== null && decryptVal8 > 0 ? decryptVal8 : 0;
    case 'CEB':
      return window.sessionStorage.coinsEnemyBet && Number(window.sessionStorage.coinsEnemyBet) > 0 ? Number(window.sessionStorage.coinsEnemyBet) : 0;
    case 'CEEB':
      return window.sessionStorage.coinsEnemyExtBet && Number(window.sessionStorage.coinsEnemyExtBet) > 0 ? Number(window.sessionStorage.coinsEnemyExtBet) : 0;
    default:
      break;
  }
};
