import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';

export default (event) => {
  event.preventDefault();

  // if (window.sessionStorage.dropState === "false") return;
  const encryptKey1 = findCharCode([81, 69, 71, 84, 85, 90, 82, 67, 77, 89]); // dropState
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  // dropState === false
  if (
    encryptVal1 !== null &&
    encryptVal1 !== '' &&
    !X.dec(encryptVal1)
  ) return;

  const BATTING_ZONE = document.querySelector(".betting-zone");
  if (BATTING_ZONE.classList.contains("over")) {
    BATTING_ZONE.classList.remove("over");
  }
};
