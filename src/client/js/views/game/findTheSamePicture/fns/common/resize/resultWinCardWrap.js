import enemyImageList from "@/client/js/views/game/findTheSamePicture/fns/common/enemyImageList";
import playerImageList from "@/client/js/views/game/findTheSamePicture/fns/common/playerImageList";
import makeUserCard from "@/client/js/views/game/findTheSamePicture/fns/common/makeUserCard/makeUserCard";

export default async () => {
  const WIN_CARD_WRAP_CHK = document.querySelector(".win-card-wrap");
  if (!WIN_CARD_WRAP_CHK) return;

  const ENEMY_IMAGE_LIST = await enemyImageList();
  const PLAYER_IMAGE_LIST = await playerImageList("win");
  const MAKE_NEW_CARD = await makeUserCard();

  const PLAYER_BLOCK = document.querySelector(".player-block");
  if (!PLAYER_BLOCK) throw throwObj('elementLoss', 'player block not found');
  const PLAYER_LIST = PLAYER_BLOCK.querySelector("ul");
  if (!PLAYER_LIST) throw throwObj('elementLoss', 'player block ul not found');
  const PLAYER_CARDS = PLAYER_LIST.querySelectorAll("li");
  if (!PLAYER_CARDS || PLAYER_CARDS.length < 20) throw throwObj('elementLoss', 'player cards not found');

  // 전체 카드 그리기
  // const WIN_CARD_WRAP_CHK = document.querySelector(".win-card-wrap");
  const T_BLOCK = WIN_CARD_WRAP_CHK.querySelector("ul.top");
  const B_BLOCK = WIN_CARD_WRAP_CHK.querySelector("ul.bottom");
  const T_BLOCK_LIST = T_BLOCK.querySelectorAll("li");
  const B_BLOCK_LIST = B_BLOCK.querySelectorAll("li");

  for (let i = 0; i < T_BLOCK_LIST.length; i++) {
    T_BLOCK_LIST[i].remove();
  }
  for (let i = 0; i < B_BLOCK_LIST.length; i++) {
    B_BLOCK_LIST[i].remove();
  }

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
    cards.style.opacity = 1;
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
    cards.style.opacity = 1;
    B_BLOCK.appendChild(cards);
  }
};
