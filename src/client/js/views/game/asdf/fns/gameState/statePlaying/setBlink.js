import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';

export default () => {
  const encryptVal1 = storageMethod("l", "GET_ITEM", "localPlayer");
  const encryptKey2 = findCharCode([73, 71, 65, 80, 77, 75, 84, 66, 85, 82]); // activeUser
  const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);

  const BLOCK_SQUARE = document.querySelector(".black-square");
  const ENEMY_BLACK_SQUARE = document.querySelector(".enemy-black-square");
  if (BLOCK_SQUARE && ENEMY_BLACK_SQUARE) {
    if (encryptVal2 == encryptVal1) {
      BLOCK_SQUARE.classList.add("active");
    } else {
      ENEMY_BLACK_SQUARE.classList.add("active");
    }
  }
};
