import lastRoundState from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/lastRoundState";
import lastRoundShow from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/lastRoundShow";

export default () => {
  // [260309]
  const RESULT_VALUE = window.sessionStorage.getItem("result");
  const RESULT_ARR = JSON.parse(RESULT_VALUE);
  let win = 0;
  let die = 0;
  let drew = 0;
  for (let i = 0; i < RESULT_ARR.length; i++) {
    if (RESULT_ARR[i].result === "win") {
      win += 1;
    } else if (RESULT_ARR[i].result === "die") {
      die += 1;
    } else if (RESULT_ARR[i].result === "drew") {
      drew += 1;
    }
  }
  const result = lastRoundState(win, die, drew);
  lastRoundShow(result);
};
