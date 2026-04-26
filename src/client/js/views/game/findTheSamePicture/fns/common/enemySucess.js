import throwObj from '@/client/js/module/errorHandler/throwObj';

import { timeInterval_1 } from "@/client/js/functions/variable";
import moveEnemyIcon from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/moveEnemyIcon";
import {
  getActiveList,
  getEnArr,
  getPnArr,
  setActiveList,
} from '@/client/js/views/game/findTheSamePicture/fns/common/sessionState';

export default (_data) => {
  const ENEMY_ACTIVE_ARR = getActiveList();
  const PN_ARR = getPnArr();
  const EN_ARR = getEnArr();
  const enemyActiveIndex = Number(_data.enemyActiveIndex);

  if (!Number.isInteger(enemyActiveIndex)) {
    throw throwObj('dataManipulation', "enemySucess.js - enemyActiveIndex failed.");
  }

  const PLAYER_ACTIVE_NUM = ENEMY_ACTIVE_ARR[EN_ARR[1]];

  let randomNum = 0;
  for (let i = 0; i < ENEMY_ACTIVE_ARR.length; i++) {
    randomNum = Math.floor(Math.random() * 16);
    ENEMY_ACTIVE_ARR[i] = randomNum;
    if (i === PN_ARR[1]) {
      ENEMY_ACTIVE_ARR[i] = enemyActiveIndex;
    }
    if (i === EN_ARR[1]) {
      ENEMY_ACTIVE_ARR[i] = PLAYER_ACTIVE_NUM;
    }
  }

  setActiveList(ENEMY_ACTIVE_ARR);

  const AFTER_DATA = {
    enemyActive: Number(ENEMY_ACTIVE_ARR[PN_ARR[1]]),
    clickBoardNum: _data.clickBoardNum,
    clickNum: _data.clickNum,
  };
  setTimeout(moveEnemyIcon, timeInterval_1, AFTER_DATA, true);
};
