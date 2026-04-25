import { timeInterval_1 } from "@/client/js/functions/variable";
import { CARD_LEN, CARD_LIST } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";

import findRandomName from "@/client/js/views/game/findTheSamePicture/fns/common/findRandomName";
import clickCard from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/clickCard";
import drawPlayerBlock from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/drawPlayerBlock";
import drawEnemyBlock from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/drawEnemyBlock";

import makeUserCard from "@/client/js/views/game/findTheSamePicture/fns/common/makeUserCard/makeUserCard";
import compareSync from "@/client/js/views/game/findTheSamePicture/fns/common/compareSync";

export default async (_board) => {
  const MAKE_USER_CARD = await makeUserCard();
  const ORDER_NUM = window.sessionStorage.getItem(findRandomName(1));
  const ORDER_NUM_LIST = JSON.parse(ORDER_NUM);
  const RANDOM_NUM = window.sessionStorage.getItem(findRandomName(2));
  const RANDOM_NUM_LIST = JSON.parse(RANDOM_NUM);

  const ALPABAT = window.sessionStorage.getItem(findRandomName(0));
  const ALPABAT_LIST = JSON.parse(ALPABAT);

  let card = new Object();
  let btn = new Object();
  let front = new Object();
  for (let i = 0; i < CARD_LEN; i++) {
    card = document.createElement("li");
    btn = document.createElement("button");
    front = document.createElement("span");

    front.classList.add("front");
    btn.classList.add("btn");
    card.classList.add("card");

    btn.setAttribute("aria-label", "flip card");
    front.innerHTML = ALPABAT_LIST[i];

    btn.appendChild(front);
    card.appendChild(btn);
    _board.appendChild(card);
  }
  setTimeout(() => {
    const BTN = document.querySelectorAll(".btn");
    for (let i = 0; i < BTN.length; i++) {
      const FRONT = BTN[i].querySelector(".front");
      FRONT.style.fontSize = `${BTN[i].clientWidth / 2}px`;
    }
    setTimeout(clickCard, timeInterval_1);
    setTimeout(drawPlayerBlock, timeInterval_1);
    setTimeout(drawEnemyBlock, timeInterval_1);

    /**
     * 맞출 경우 테스트를 위한 card 다시 그리기
     */
    const BOARD = document.querySelector(".board");
    const CARDS = BOARD.querySelectorAll("li");
    let btn = new Object();
    let inner = new Object();
    let img = new Object();
    for (let i = 0; i < CARDS.length; i++) {
      let compareNum = compareSync(RANDOM_NUM_LIST, i);
      let orderNum = ORDER_NUM_LIST[compareNum];
      let cardUrl = CARD_LIST[orderNum];

      btn = CARDS[i].querySelector("button");
      inner = btn.querySelector("span.front");
      inner.innerHTML = "";
      img = document.createElement("img");
      img.src = cardUrl;
      img.style.width = "100%";
      img.style.height = "100%";
      inner.appendChild(img);
    }
  }, timeInterval_1);
};
