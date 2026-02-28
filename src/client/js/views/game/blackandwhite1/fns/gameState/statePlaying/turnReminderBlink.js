import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import turnReminderBlinkNull from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnReminderBlinkNull";

export default () => {
  turnReminderBlinkNull();
  const PLAYER_BLACK = document.querySelector(".black-square");
  const ENEMY_BLACK = document.querySelector(".enemy-black-square");
  if (PLAYER_BLACK && ENEMY_BLACK) {
    const encryptKey1 = findCharCode([73, 81, 90, 83, 68, 86, 69, 89, 78, 70]); // firstUser
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
    const encryptVal2 = storageMethod("l", "GET_ITEM", "localPlayer");

    // const FIRST_PLAYER = window.sessionStorage.getItem("firstUser");
    // const PLAYER = window.localStorage.getItem("uid");
    if (encryptVal1 == encryptVal2) {
      ENEMY_BLACK.classList.remove("active");
      PLAYER_BLACK.classList.add("active");
    } else {
      PLAYER_BLACK.classList.remove("active");
      ENEMY_BLACK.classList.add("active");
    }
  }
};
