import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';

export default () => {
  // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  const encryptKey1 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]);  // coinsPlayer
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);

  // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
  const encryptKey2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

  // if (COINS_PLAYER && COINS_ENEMY) {
  if (encryptVal1 !== null && encryptVal2 !== null) {
    const decryptVal1 = dec(encryptVal1); // coinsPlayer value number
    const decryptVal2 = dec(encryptVal2); // coinsEnemy value number
    // if (Number(COINS_PLAYER) === 0 || Number(COINS_ENEMY) === 0) return true;
    if (Number(decryptVal1) === 0 || Number(decryptVal2) === 0) return true;
  }
  return false;
};
