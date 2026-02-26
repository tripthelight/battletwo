import drawRoundCircle from "./drawRoundCircle.js";

export default () => {
  const SCORE_BOARD_EL = document.querySelector(".score-board");
  if (!SCORE_BOARD_EL) {
    let sbEl = document.createElement("div");
    let dlElPlayer = document.createElement("dl");
    let dtElPlayer = document.createElement("dt");
    let dtElPlayerSpan1 = document.createElement("span");
    let dtElPlayerSpan2 = document.createElement("span");
    let ddElPlayer = document.createElement("dd");
    let dlElEnemy = document.createElement("dl");
    let dtElEnemy = document.createElement("dt");
    let dtElEnemySpan1 = document.createElement("span");
    let dtElEnemySpan2 = document.createElement("span");
    let ddElEnemy = document.createElement("dd");
    dtElPlayerSpan1.innerText = "PLAYER";
    dtElEnemySpan1.innerText = "OPPONENT";
    dtElPlayerSpan2.innerText = window.localStorage.getItem("nickname");
    dtElEnemySpan2.innerText = window.sessionStorage.getItem("enemyNick");
    dtElPlayer.appendChild(dtElPlayerSpan1);
    dtElPlayer.appendChild(dtElPlayerSpan2);
    dtElEnemy.appendChild(dtElEnemySpan1);
    dtElEnemy.appendChild(dtElEnemySpan2);
    dlElPlayer.appendChild(dtElPlayer);
    dlElPlayer.appendChild(ddElPlayer);
    dlElEnemy.appendChild(dtElEnemy);
    dlElEnemy.appendChild(ddElEnemy);
    sbEl.appendChild(dlElPlayer);
    sbEl.appendChild(dlElEnemy);
    dlElPlayer.classList.add("player");
    dlElEnemy.classList.add("enemy");
    ddElPlayer.innerText = 0;
    ddElEnemy.innerText = 0;
    sbEl.classList.add("score-board");
    const CONTAINER_EL = document.getElementById("container");
    if (CONTAINER_EL) {
      CONTAINER_EL.appendChild(sbEl);
      drawRoundCircle(sbEl);
    }
  }
};
