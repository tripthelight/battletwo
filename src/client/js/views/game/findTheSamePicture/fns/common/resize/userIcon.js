import findIconActive from "@/client/js/views/game/findTheSamePicture/fns/common/findIconActive";

export default () => {
  const PLAYER_BLOCK = document.querySelector(".player-block");
  if (!PLAYER_BLOCK) return;
  const PLAYER_CARD_LIST = PLAYER_BLOCK.querySelector("ul");
  if (!PLAYER_CARD_LIST) return;
  const PLAYER_CARDS = PLAYER_BLOCK.querySelectorAll("li");
  if (!PLAYER_CARDS || PLAYER_CARDS.length < 1) return;
  const PLAYER_ICON = PLAYER_BLOCK.querySelector(".player-icon");
  if (!PLAYER_ICON) return;

  const ENEMY_BLOCK = document.querySelector(".enemy-block");
  if (!ENEMY_BLOCK) return;
  const ENEMY_CARD_LIST = ENEMY_BLOCK.querySelector("ul");
  if (!ENEMY_CARD_LIST) return;
  const ENEMY_CARDS = ENEMY_BLOCK.querySelectorAll("li");
  if (!ENEMY_CARDS || ENEMY_CARDS.length < 1) return;
  const ENEMY_ICON = ENEMY_BLOCK.querySelector(".enemy-icon");
  if (!ENEMY_ICON) return;

  const PLAYER_ACTIVE = findIconActive("p");
  const ENEMY_ACTIVE = findIconActive("e");

  let pData = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  };
  let eData = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  };
  for (let i = 0; i < PLAYER_CARDS.length; i++) {
    if (i === PLAYER_ACTIVE) {
      pData.x = PLAYER_CARDS[i].offsetLeft;
      pData.y = PLAYER_CARDS[i].offsetTop;
      pData.w = PLAYER_CARDS[i].clientWidth;
      pData.h = PLAYER_CARDS[i].clientHeight;
      break;
    }
  }
  // enemy의 경우 배열을 뒤에서 부터 시작
  for (let i = ENEMY_CARDS.length - 1; i >= 0; i--) {
    if (i === ENEMY_ACTIVE) {
      eData.x = ENEMY_CARDS[i].offsetLeft;
      eData.y = ENEMY_CARDS[i].offsetTop;
      eData.w = ENEMY_CARDS[i].clientWidth;
      eData.h = ENEMY_CARDS[i].clientHeight;
      break;
    }
  }

  PLAYER_ICON.style.left = `${pData.x + 1}px`;
  PLAYER_ICON.style.top = `${pData.y + 1}px`;
  PLAYER_ICON.style.width = `${pData.w - 2}px`;
  PLAYER_ICON.style.height = `${pData.h - 2}px`;

  ENEMY_ICON.style.left = `${eData.x + 1}px`;
  ENEMY_ICON.style.top = `${eData.y + 1}px`;
  ENEMY_ICON.style.width = `${eData.w - 2}px`;
  ENEMY_ICON.style.height = `${eData.h - 2}px`;
};
