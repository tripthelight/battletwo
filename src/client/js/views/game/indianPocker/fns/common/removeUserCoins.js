export default (_coinsUl) => {
  const COINS = _coinsUl.querySelectorAll("li");
  if (!COINS || COINS.length < 1) return;
  for (let i = 0; i < COINS.length; i++) {
    COINS[i].remove();
  }
};
