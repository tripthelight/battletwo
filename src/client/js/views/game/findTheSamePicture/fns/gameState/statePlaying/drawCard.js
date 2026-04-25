import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from "@/client/js/functions/variable";
import { CARD_LEN } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";
import findRandomName from "@/client/js/views/game/findTheSamePicture/fns/common/findRandomName";
import clickCard from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/clickCard";
import drawPlayerBlock from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/drawPlayerBlock";
import drawEnemyBlock from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/drawEnemyBlock";

export default (_board) => {
  // const ALPABAT = window.sessionStorage.getItem(findRandomName(0));
  const ALPABAT = storageMethod('s', 'GET_ITEM', findRandomName(0));
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
  }, timeInterval_1);
};
