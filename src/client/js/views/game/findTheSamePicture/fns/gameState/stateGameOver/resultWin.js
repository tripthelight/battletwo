import { timeInterval_1, timeInterval_100 } from "@/client/js/functions/variable";

import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';

import enemyImageList from "@/client/js/views/game/findTheSamePicture/fns/common/enemyImageList";
import playerImageList from "@/client/js/views/game/findTheSamePicture/fns/common/playerImageList";
import makeUserCard from "@/client/js/views/game/findTheSamePicture/fns/common/makeUserCard/makeUserCard";
import loopPromise from "@/client/js/module/loopPromise";
import resultBoardMotion from "@/client/js/views/game/findTheSamePicture/fns/gameState/stateGameOver/resultBoardMotion";
// import REFRESH_GAMEOVER from "../../../../../refresh/findsamepicture/refreshGameOver/refreshInit.js";

export default async () => {
  console.log("-------------------");
  console.log("내가 이겼소 !!!!!");
  console.log("-------------------");

  const ENEMY_IMAGE_LIST = await enemyImageList();
  const PLAYER_IMAGE_LIST = await playerImageList("win");
  const MAKE_NEW_CARD = await makeUserCard();

  const PLAYER_BLOCK = document.querySelector(".player-block");
  // 이 부분은 새로 고침
  // PLAYER_BLOCK이 없으면 새로고침 한거임
  // if (!PLAYER_BLOCK) return REFRESH_GAMEOVER.main();
  const PLAYER_LIST = PLAYER_BLOCK.querySelector("ul");
  if (!PLAYER_LIST) throw throwObj('elementLoss', "resultWin.js - .player-block ul element failed.");
  const PLAYER_CARDS = PLAYER_LIST.querySelectorAll("li");
  if (!PLAYER_CARDS || PLAYER_CARDS.length < 20) throw throwObj('elementLoss', "resultWin.js - .player-block ul li length element failed.");

  // 전체 카드 그리기
  const WIN_CARD_WRAP = document.createElement("div");
  WIN_CARD_WRAP.classList.add("win-card-wrap");
  const T_BLOCK = document.createElement("ul");
  const B_BLOCK = document.createElement("ul");
  T_BLOCK.classList.add("top");
  B_BLOCK.classList.add("bottom");
  WIN_CARD_WRAP.appendChild(T_BLOCK);
  WIN_CARD_WRAP.appendChild(B_BLOCK);

  let cards = new Object();
  let imaEl = new Object();
  let multiState = PLAYER_BLOCK.clientHeight > PLAYER_CARDS[0].clientHeight ? true : false;
  let size = multiState ? window.innerWidth / 10 : window.innerWidth / 20;
  let wLen = multiState ? 10 : 20;
  let hLen = Math.ceil(window.innerHeight / 2 / size);
  let len = wLen * hLen;

  T_BLOCK.style.height = `${Math.ceil(window.innerHeight / 2 / size) * size}px`;
  B_BLOCK.style.height = `${Math.ceil(window.innerHeight / 2 / size) * size}px`;
  for (let i = 0; i < len; i++) {
    cards = document.createElement("li");
    imaEl = document.createElement("img");
    if (i < 20) {
      // enemy card 리스트
      imaEl.src = ENEMY_IMAGE_LIST[i];
    } else {
      imaEl.src = MAKE_NEW_CARD[Math.floor(Math.random() * 16)];
    }
    cards.appendChild(imaEl);
    cards.style.width = `${size}px`;
    cards.style.height = `${size}px`;
    T_BLOCK.appendChild(cards);
  }
  for (let i = 0; i < len; i++) {
    cards = document.createElement("li");
    imaEl = document.createElement("img");
    if (i > len - 20) {
      // player card 리스트 reverse
      imaEl.src = PLAYER_IMAGE_LIST[len - 1 - i];
    } else {
      imaEl.src = MAKE_NEW_CARD[Math.floor(Math.random() * 16)];
    }
    cards.appendChild(imaEl);
    cards.style.width = `${size}px`;
    cards.style.height = `${size}px`;
    B_BLOCK.appendChild(cards);
  }

  const CONTAINER = document.getElementById("container");
  if (!CONTAINER) throw throwObj('elementLoss', "resultWin.js - #container element failed.");
  CONTAINER.appendChild(WIN_CARD_WRAP);

  setTimeout(() => {
    const AFTER_BLOCK = document.querySelector(".win-card-wrap");
    const AFTER_T = AFTER_BLOCK.querySelector("ul.top");
    const AFTER_B = AFTER_BLOCK.querySelector("ul.bottom");
    const T_LIST = AFTER_T.querySelectorAll("li");
    const B_LIST = AFTER_B.querySelectorAll("li");
    for (let i = 0, p = Promise.resolve(); i < T_LIST.length; i++) {
      p = p
        .then(() => {
          return loopPromise(10);
        })
        .then(() => {
          T_LIST[i].style.opacity = 1;
        })
        .catch((error) => {
          errorManager(error, true);
        });
    }
    for (let i = B_LIST.length - 1, p = Promise.resolve(); i >= 0; i--) {
      p = p
        .then(() => {
          return loopPromise(10);
        })
        .then(() => {
          B_LIST[i].style.opacity = 1;
        })
        .catch((error) => {
          errorManager(error, true);
        });
    }

    setTimeout(resultBoardMotion, timeInterval_1);
  }, timeInterval_100);
};
