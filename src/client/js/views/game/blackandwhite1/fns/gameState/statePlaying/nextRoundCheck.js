import turnReminderBlinkNull from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnReminderBlinkNull";

export default () => {
  window.sessionStorage.removeItem("beforePlayerNum");
  turnReminderBlinkNull();
};
