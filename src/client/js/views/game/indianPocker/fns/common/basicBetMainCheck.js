import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';

export default () => {
  const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
  const encryptKey2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  if (encryptVal2 === null) return false;
  const decryptVal2 = dec(encryptVal2); // coinsEnemy value number

  // if (COINS_PLAYER && COINS_ENEMY) {
  if (COINS_PLAYER && encryptVal2) {
    // if (Number(COINS_PLAYER) === 0 || Number(COINS_ENEMY) === 0) return true;
    if (Number(COINS_PLAYER) === 0 || Number(decryptVal2) === 0) return true;
  }
  return false;
};
