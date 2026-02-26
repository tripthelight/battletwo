export default (res) => {
  const SCORE_EL = document.querySelector(".score-board");
  if (SCORE_EL) {
    const PLAYER_SCORE = SCORE_EL.querySelector("dl.player dd");
    const ENEMY_SCORE = SCORE_EL.querySelector("dl.enemy dd");
    if (PLAYER_SCORE && ENEMY_SCORE) {
      let pScore = 0;
      let eScore = 0;
      for (let i = 0; i < res.length; i++) {
        if (res[i].result === "win") {
          pScore += 1;
        } else if (res[i].result === "die") {
          eScore += 1;
        }
      }
      PLAYER_SCORE.innerHTML = pScore;
      ENEMY_SCORE.innerHTML = eScore;
    }
  }
};
