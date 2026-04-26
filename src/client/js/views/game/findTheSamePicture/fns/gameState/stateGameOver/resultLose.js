import { timeInterval_1 } from "@/client/js/functions/variable";

import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';

import loopPromise from "@/client/js/module/loopPromise";
import resultBoardMotion from "@/client/js/views/game/findTheSamePicture/fns/gameState/stateGameOver/resultBoardMotion";
// import REFRESH_GAMEOVER from "../../../../../refresh/findsamepicture/refreshGameOver/refreshInit.js";

export default () => {
  console.log("-------------------");
  console.log("내가 졌소 !!!!!");
  console.log("-------------------");

  const ENEMY_BLOCK = document.querySelector(".enemy-block");
  // 이 부분은 새로 고침
  // ENEMY_BLOCK이 없으면 새로고침 한거임
  // if (!ENEMY_BLOCK) return REFRESH_GAMEOVER.main();

  const PLAYER_BLOCK = document.querySelector(".player-block");
  if (!PLAYER_BLOCK) throw throwObj('elementLoss', "resultLose.js - .player-block element failed.");

  const ENEMY_LIST = ENEMY_BLOCK.querySelector("ul");
  if (!ENEMY_LIST) throw throwObj('elementLoss', "resultLose.js - .enemy-block element failed.");

  const PLAYER_LIST = PLAYER_BLOCK.querySelector("ul");
  if (!PLAYER_LIST) throw throwObj('elementLoss', "resultLose.js - .player-block element failed.");

  const ENEMY_CARDS = ENEMY_LIST.querySelectorAll("li");
  if (!ENEMY_CARDS || ENEMY_CARDS.length < 20) throw throwObj('elementLoss', "resultLose.js - enemy cards element failed.");

  const PLAYER_CARDS = PLAYER_LIST.querySelectorAll("li");
  if (!PLAYER_CARDS || ENEMY_CARDS.length < 20) throw throwObj('elementLoss', "resultLose.js - player cards element failed.");

  const ENEMY_ICON = ENEMY_BLOCK.querySelector(".enemy-icon");

  const PLAYER_ICON = PLAYER_BLOCK.querySelector(".player-icon");

  if (ENEMY_ICON) ENEMY_ICON.remove();
  if (PLAYER_ICON) PLAYER_ICON.remove();

  for (let i = ENEMY_CARDS.length - 1, p = Promise.resolve(); i >= 0; i--) {
    ENEMY_CARDS[i].style.transition = "opacity .2s ease-in";
    p = p
      .then(() => {
        return loopPromise(200);
      })
      .then(() => {
        ENEMY_CARDS[i].style.opacity = 0;
      })
      .catch((error) => {
        errorManager(error, true);
      });
  }
  for (let i = 0, p = Promise.resolve(); i < PLAYER_CARDS.length; i++) {
    PLAYER_CARDS[i].style.transition = "opacity .2s ease-in";
    p = p
      .then(() => {
        return loopPromise(200);
      })
      .then(() => {
        PLAYER_CARDS[i].style.opacity = 0;
      })
      .catch((error) => {
        errorManager(error, true);
      });
  }

  setTimeout(resultBoardMotion, timeInterval_1);
};
