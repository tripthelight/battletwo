import storageMethod from '@/client/js/module/storage/storageMethod';
import { ensureActiveUser } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnState';

export default () => {
  const encryptVal1 = storageMethod("l", "GET_ITEM", "localPlayer");
  const encryptVal2 = ensureActiveUser();

  const BLOCK_SQUARE = document.querySelector(".black-square");
  const ENEMY_BLACK_SQUARE = document.querySelector(".enemy-black-square");
  if (BLOCK_SQUARE && ENEMY_BLACK_SQUARE) {
    if (!encryptVal1 || !encryptVal2) return;

    if (encryptVal2 == encryptVal1) {
      BLOCK_SQUARE.classList.add("active");
    } else {
      ENEMY_BLACK_SQUARE.classList.add("active");
    }
  }
};
