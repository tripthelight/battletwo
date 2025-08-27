import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';

export default (event) => {
  event.preventDefault();

  // if (window.sessionStorage.dropState === "true") return;
  const encryptKey1 = findCharCode([81, 69, 71, 84, 85, 90, 82, 67, 77, 89]); // dropState
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  // dropState === true
  if (
    encryptVal1 !== null &&
    encryptVal1 !== '' &&
    X.dec(encryptVal1)
  ) return;

  const PLAYER_BLOCK = document.querySelector(".player-block");
  if (!PLAYER_BLOCK.classList.contains("over")) {
    PLAYER_BLOCK.classList.add("over");
  }
};
