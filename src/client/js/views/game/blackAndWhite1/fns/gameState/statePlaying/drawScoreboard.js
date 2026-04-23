import drawRoundCircle from "./drawRoundCircle.js";
import {
  getDisplayNames,
  loadRoundResults,
  scoreFromResults
} from '@/client/js/views/game/blackAndWhite1/fns/common/roundResultStorage';

const applyScoreboardData = (scoreBoardEl) => {
  const names = getDisplayNames();
  const score = scoreFromResults(loadRoundResults());

  const playerName = scoreBoardEl.querySelector('dl.player dt span:nth-child(2)');
  const enemyName = scoreBoardEl.querySelector('dl.enemy dt span:nth-child(2)');
  const playerScore = scoreBoardEl.querySelector('dl.player dd');
  const enemyScore = scoreBoardEl.querySelector('dl.enemy dd');

  if (playerName) playerName.innerText = names.player;
  if (enemyName) enemyName.innerText = names.enemy;
  if (playerScore) playerScore.innerText = score.player;
  if (enemyScore) enemyScore.innerText = score.enemy;
};

export default () => {
  const SCORE_BOARD_EL = document.querySelector(".score-board");
  if (SCORE_BOARD_EL) {
    applyScoreboardData(SCORE_BOARD_EL);
    return;
  }

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
    sbEl.classList.add("score-board");
    const CONTAINER_EL = document.getElementById("container");
    if (CONTAINER_EL) {
      CONTAINER_EL.appendChild(sbEl);
      applyScoreboardData(sbEl);
      drawRoundCircle(sbEl);
    }
  }
};
