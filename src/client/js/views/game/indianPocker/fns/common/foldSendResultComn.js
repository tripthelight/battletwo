export default () => {
  const COINS_PLAYER_RES = window.sessionStorage.coinsPlayer;
  const PLAYER_COINS = document.querySelector(".coins-player");
  const PLAYER_COINS_LI = PLAYER_COINS.querySelectorAll("li");
  if (PLAYER_COINS_LI.length > 0) for (let i = 0; i < PLAYER_COINS_LI.length; i++) PLAYER_COINS_LI[i].remove();
  for (let j = 0; j < Number(COINS_PLAYER_RES); j++) PLAYER_COINS.appendChild(document.createElement("li"));
};
