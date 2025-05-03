export default () => {
  const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  const COINS_ENEMY = window.sessionStorage.coinsEnemy;
  if (COINS_PLAYER && COINS_ENEMY) {
    if (Number(COINS_PLAYER) === 0 || Number(COINS_ENEMY) === 0) return true;
  }
  return false;
};
