import turnReminderBlinkNull from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnReminderBlinkNull";

export default () => {
  turnReminderBlinkNull();
  const PLAYER_BLACK = document.querySelector(".black-square");
  const ENEMY_BLACK = document.querySelector(".enemy-black-square");
  if (PLAYER_BLACK && ENEMY_BLACK) {
    const FIRST_PLAYER = window.sessionStorage.getItem("firstUser");
    const PLAYER = window.localStorage.getItem("uid");
    if (FIRST_PLAYER == PLAYER) {
      ENEMY_BLACK.classList.remove("active");
      PLAYER_BLACK.classList.add("active");
    } else {
      PLAYER_BLACK.classList.remove("active");
      ENEMY_BLACK.classList.add("active");
    }
  }
};
