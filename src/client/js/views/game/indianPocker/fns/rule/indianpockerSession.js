export default (_name) => {
  switch (_name) {
    case "RN":
      return window.sessionStorage.roomName;
    case "BU":
      return window.sessionStorage.betUser;
    case "BUF":
      return window.sessionStorage.betUserFirst;
    case "EFB":
      return window.sessionStorage.extFirstBet;
    case "CP":
      return window.sessionStorage.coinsPlayer && Number(window.sessionStorage.coinsPlayer) > 0 ? Number(window.sessionStorage.coinsPlayer) : 0;
    case "CPB":
      return window.sessionStorage.coinsPlayerBet && Number(window.sessionStorage.coinsPlayerBet) > 0 ? Number(window.sessionStorage.coinsPlayerBet) : 0;
    case "CPEB":
      return window.sessionStorage.coinsPlayerExtBet && Number(window.sessionStorage.coinsPlayerExtBet) > 0 ? Number(window.sessionStorage.coinsPlayerExtBet) : 0;
    case "CE":
      return window.sessionStorage.coinsEnemy && Number(window.sessionStorage.coinsEnemy) > 0 ? Number(window.sessionStorage.coinsEnemy) : 0;
    case "CEB":
      return window.sessionStorage.coinsEnemyBet && Number(window.sessionStorage.coinsEnemyBet) > 0 ? Number(window.sessionStorage.coinsEnemyBet) : 0;
    case "CEEB":
      return window.sessionStorage.coinsEnemyExtBet && Number(window.sessionStorage.coinsEnemyExtBet) > 0 ? Number(window.sessionStorage.coinsEnemyExtBet) : 0;
    default:
      break;
  }
};
