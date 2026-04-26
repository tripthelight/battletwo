import throwObj from '@/client/js/module/errorHandler/throwObj';
import { timeInterval_1 } from "@/client/js/functions/variable";
import moveEnemyIcon from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/moveEnemyIcon";
import moveEnemyCards from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/moveEnemyCards";
import makeUserCard from "@/client/js/views/game/findTheSamePicture/fns/common/makeUserCard/makeUserCard";
import {
  getActiveList,
  getEnArr,
  getPnArr,
  setActiveList,
  setEnArr,
} from '@/client/js/views/game/findTheSamePicture/fns/common/sessionState';

export default async (_data) => {
  const PN_ARR = getPnArr();
  const EN_ARR = getEnArr();
  const PLAYER_ACTIVE_ARR = getActiveList();
  const enemyActiveIndex = Number(_data.enemyActiveIndex);

  if (!Number.isInteger(enemyActiveIndex)) {
    throw throwObj('dataManipulation', "enemyFail.js - enemyActiveIndex failed.");
  }

  const PLAYER_ACTIVE_NUM = PLAYER_ACTIVE_ARR[EN_ARR[1]];

  setEnArr(_data.en);
  const EN_ARTER_ARR = getEnArr();
  const ENEMY_ACTIVE_ARR = getActiveList();

  let randomNum = 0;
  for (let i = 0; i < ENEMY_ACTIVE_ARR.length; i++) {
    randomNum = Math.floor(Math.random() * 16);
    ENEMY_ACTIVE_ARR[i] = randomNum;
    if (i === PN_ARR[1]) {
      ENEMY_ACTIVE_ARR[i] = enemyActiveIndex;
    }
    if (i === EN_ARTER_ARR[1]) {
      ENEMY_ACTIVE_ARR[i] = PLAYER_ACTIVE_NUM;
    }
  }

  setActiveList(ENEMY_ACTIVE_ARR);

  const MAKE_USER_CARD = await makeUserCard();
  let newCard = document.createElement("li");
  let newImage = document.createElement("img");
  newImage.src = MAKE_USER_CARD[EN_ARTER_ARR[1]];
  newImage.style.width = "100%";
  newImage.style.height = "100%";
  newCard.appendChild(newImage);

  const AFTER_DATA = {
    enemyActive: Number(ENEMY_ACTIVE_ARR[PN_ARR[1]]),
    clickBoardNum: _data.clickBoardNum,
    clickNum: _data.clickNum,
  };

  setTimeout(() => {
    moveEnemyIcon(AFTER_DATA, false);
    moveEnemyCards(AFTER_DATA, newCard);
  }, timeInterval_1);
};
