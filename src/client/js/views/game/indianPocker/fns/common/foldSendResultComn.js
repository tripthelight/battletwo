import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';

export default () => {
  // const COINS_PLAYER_RES = window.sessionStorage.coinsPlayer;
  const encryptKey = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]);  // coinsPlayer
  const encryptVal = window.sessionStorage.getItem(encryptKey);
  const decryptVal = dec(encryptVal); // coinsPlayer value number

  const PLAYER_COINS = document.querySelector(".coins-player");
  const PLAYER_COINS_LI = PLAYER_COINS.querySelectorAll("li");
  if (PLAYER_COINS_LI.length > 0) for (let i = 0; i < PLAYER_COINS_LI.length; i++) PLAYER_COINS_LI[i].remove();
  // for (let j = 0; j < Number(COINS_PLAYER_RES); j++) PLAYER_COINS.appendChild(document.createElement("li"));
  for (let j = 0; j < Number(decryptVal); j++) PLAYER_COINS.appendChild(document.createElement("li"));
};
