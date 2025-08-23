import findCharCode from '@/client/js/functions/findCharCode';

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
      return window.sessionStorage.betUserFirst;
    case 'EFB':
      const encryptKey3 = findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]); // extFirstBet
      const decryptVal3 = window.sessionStorage.getItem(encryptKey3);
      return decryptVal3;
    case 'CP':
      return window.sessionStorage.coinsPlayer && Number(window.sessionStorage.coinsPlayer) > 0 ? Number(window.sessionStorage.coinsPlayer) : 0;
    case 'CPB':
      return window.sessionStorage.coinsPlayerBet && Number(window.sessionStorage.coinsPlayerBet) > 0 ? Number(window.sessionStorage.coinsPlayerBet) : 0;
    case 'CPEB':
      return window.sessionStorage.coinsPlayerExtBet && Number(window.sessionStorage.coinsPlayerExtBet) > 0 ? Number(window.sessionStorage.coinsPlayerExtBet) : 0;
    case 'CE':
      return window.sessionStorage.coinsEnemy && Number(window.sessionStorage.coinsEnemy) > 0 ? Number(window.sessionStorage.coinsEnemy) : 0;
    case 'CEB':
      return window.sessionStorage.coinsEnemyBet && Number(window.sessionStorage.coinsEnemyBet) > 0 ? Number(window.sessionStorage.coinsEnemyBet) : 0;
    case 'CEEB':
      return window.sessionStorage.coinsEnemyExtBet && Number(window.sessionStorage.coinsEnemyExtBet) > 0 ? Number(window.sessionStorage.coinsEnemyExtBet) : 0;
    default:
      break;
  }
};
