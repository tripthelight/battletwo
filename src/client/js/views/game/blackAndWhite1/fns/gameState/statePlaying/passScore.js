import { dec } from '@/client/js/module/crypts/obf8lower';
import { RESULT_NUM } from '@/client/js/views/game/blackAndWhite1/fns/common/roundResultStorage';

/** @typedef {{ round: number, result: string }} ResultInterface */
/**
 * res의 result는 난독화된 "win", "die", "drew" 중 하나
 * @param {ResultInterface} res { round: 0, result: "win" | "die" | "drew" }
 */
export default (res) => {
  const SCORE_EL = document.querySelector(".score-board");
  if (SCORE_EL) {
    const PLAYER_SCORE = SCORE_EL.querySelector("dl.player dd");
    const ENEMY_SCORE = SCORE_EL.querySelector("dl.enemy dd");
    if (PLAYER_SCORE && ENEMY_SCORE) {
      let pScore = 0;
      let eScore = 0;
      for (let i = 0; i < res.length; i++) {
        const r = dec(res[i].result);
        if (r === RESULT_NUM.win()) {
          pScore += 1;
        } else if (r === RESULT_NUM.lose()) {
          eScore += 1;
        }
      }
      PLAYER_SCORE.innerHTML = pScore;
      ENEMY_SCORE.innerHTML = eScore;
    }
  }
};
