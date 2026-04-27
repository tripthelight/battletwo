import { USER_LEN } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { timeInterval_1000 } from "@/client/js/functions/variable";
import findTheSamePictureGameState from '@/client/js/gameState/findTheSamePicture';

import saveResult from "@/client/js/views/game/findTheSamePicture/fns/gameState/stateGameOver/saveResult";

export default (_data, _state) => {
  const enemyActive = Number(_data.enemyActive);

  if (!Number.isInteger(enemyActive) || enemyActive < 0 || enemyActive > 20) {
    throw throwObj('dataManipulation', "moveEnemyIcon.js - enemyActive value failed.");
  }

  if (enemyActive === USER_LEN) {
    // 게임 결과 저장
    saveResult(true, [107, 109, 114, 117], [100, 113, 98, 105, 110]); // "kmru" : true | "dqbin" : false
    findTheSamePictureGameState.gameOver();
    return;
  }

  const ENEMY_BLOCK = document.querySelector(".enemy-block");
  if (!ENEMY_BLOCK) throw throwObj('elementLoss', "moveEnemyIcon.js - .enemy-block element failed.");
  const ENEMY_LIST = ENEMY_BLOCK.querySelector("ul");
  if (!ENEMY_LIST) throw throwObj('elementLoss', "moveEnemyIcon.js - .enemy-block ul element failed.");
  const ENEMY_CARDS = ENEMY_LIST.querySelectorAll("li");
  if (!ENEMY_CARDS || ENEMY_CARDS.length < 20) throw throwObj('elementLoss', "moveEnemyIcon.js - enemy card element failed.");

  const ENEMY_ICON = ENEMY_BLOCK.querySelector(".enemy-icon");
  if (!ENEMY_ICON) throw throwObj('elementLoss', "moveEnemyIcon.js - .enemy-icon element failed.");

  if (_state) {
    ENEMY_ICON.classList.add("move");
    setTimeout(() => {
      ENEMY_ICON.classList.remove("move");

      if (enemyActive === 0) {
        // 게임 결과 저장
        saveResult(false);
        findTheSamePictureGameState.gameOver();
      }
    }, timeInterval_1000);
  }

  const ACTIVE_CARD = ENEMY_CARDS[Number(19 - enemyActive)];
  if (!ACTIVE_CARD) throw throwObj('elementLoss', "moveEnemyIcon.js - enemy active card element failed.");

  const x = ACTIVE_CARD.offsetLeft;
  const y = ACTIVE_CARD.offsetTop;
  const w = ACTIVE_CARD.clientWidth;
  const h = ACTIVE_CARD.clientHeight;

  ENEMY_ICON.style.left = `${x + 1}px`;
  ENEMY_ICON.style.top = `${y + 1}px`;
  ENEMY_ICON.style.width = `${w - 2}px`;
  ENEMY_ICON.style.height = `${h - 2}px`;
};
