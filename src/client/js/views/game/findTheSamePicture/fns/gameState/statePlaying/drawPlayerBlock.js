import throwObj from '@/client/js/module/errorHandler/throwObj';
import { USER_LEN } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";
import playerImageList from "@/client/js/views/game/findTheSamePicture/fns/common/playerImageList";

export default async () => {
  const PLAYER_IMAGE_LIst = await playerImageList();
  const PLAYER_BLOCK = document.querySelector(".player-block");
  if (PLAYER_BLOCK) return;
  const PLAYER_BLOCK_EL = document.createElement("div");
  const PLAYER_CARD_LIST = document.createElement("ul");
  let playerCard = new Object();
  let userImg;

  PLAYER_BLOCK_EL.classList.add("player-block");

  for (let i = 0; i < USER_LEN; i++) {
    userImg = new Image();
    userImg.src = PLAYER_IMAGE_LIst[i];
    playerCard = document.createElement("li");
    // playerCard.classList.add("player-card");
    playerCard.appendChild(userImg);
    PLAYER_CARD_LIST.appendChild(playerCard);
    // if (i === PLAYER_ACTIVE) {
    //   playerCard.classList.add("card-active");
    // }
  }

  PLAYER_BLOCK_EL.appendChild(PLAYER_CARD_LIST);

  const GAME_SCENE = document.getElementById("gameScene");
  if (!GAME_SCENE) throw throwObj('elementLoss', "drawPlayerBlock.js - #gameScene element failed.");
  GAME_SCENE.appendChild(PLAYER_BLOCK_EL);
};
