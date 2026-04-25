import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { timeInterval_1 } from "@/client/js/functions/variable";
import findRandomName from "@/client/js/views/game/findTheSamePicture/fns/common/findRandomName";

import { USER_LEN } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";
import drawUserIcon from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/drawUserIcon";
import activeNum from "@/client/js/views/game/findTheSamePicture/fns/common/activeNum";
import enemyImageList from "@/client/js/views/game/findTheSamePicture/fns/common/enemyImageList";

export default async () => {
  const ENEMY_IMAGE_LIST = await enemyImageList();

  const ENEMY_BLOCK = document.querySelector(".enemy-block");
  if (ENEMY_BLOCK) return;
  const ENEMY_BLOCK_EL = document.createElement("div");
  ENEMY_BLOCK_EL.classList.add("enemy-block");
  const ENEMY_CARD_LiST = document.createElement("ul");

  let enemyCard = new Object();
  let userImg;
  for (let i = 0; i < USER_LEN; i++) {
    userImg = new Image();
    userImg.src = ENEMY_IMAGE_LIST[i];
    enemyCard = document.createElement("li");
    // enemyCard.classList.add("enemy-card");
    enemyCard.appendChild(userImg);
    ENEMY_CARD_LiST.appendChild(enemyCard);
  }
  ENEMY_BLOCK_EL.prepend(ENEMY_CARD_LiST);
  const GAME_SCENE = document.getElementById("gameScene");
  if (!GAME_SCENE) throw throwObj('elementLoss', "drawEnemyBlock.js - #gameScene element failed.");
  GAME_SCENE.prepend(ENEMY_BLOCK_EL);

  // player icon active number 저장
  // const ACTIVE_NUM = window.sessionStorage.getItem(findRandomName(5));
  const ACTIVE_NUM = storageMethod('s', 'GET_ITEM', findRandomName(5));
  if (ACTIVE_NUM) {
    const ACTIVE_NUM_ARR = JSON.parse(ACTIVE_NUM);
    // window.sessionStorage.setItem(findRandomName(5), JSON.stringify(ACTIVE_NUM_ARR));
    storageMethod('s', 'SET_ITEM', findRandomName(5), JSON.stringify(ACTIVE_NUM_ARR));
  } else {
    // window.sessionStorage.setItem(findRandomName(5), JSON.stringify(activeNum()));
    storageMethod('s', 'SET_ITEM', findRandomName(5), JSON.stringify(activeNum()));
  }

  setTimeout(drawUserIcon, timeInterval_1);
  setTimeout(LOADING_EVENT.hide, 872);
};
