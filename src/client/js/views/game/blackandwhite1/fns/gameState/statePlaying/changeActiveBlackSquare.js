import turnReminderBlinkNull from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnReminderBlinkNull";

export default (activeUser, uid) => {
  const BLACK_SQUARE = document.querySelector(".black-square");
  const ENEMY_BLACK_SQUARE = document.querySelector(".enemy-black-square");
  if (BLACK_SQUARE && ENEMY_BLACK_SQUARE) {
    turnReminderBlinkNull();
    if (activeUser === uid) {
      BLACK_SQUARE.classList.add("active");
    } else {
      ENEMY_BLACK_SQUARE.classList.add("active");
    }
  }
};
