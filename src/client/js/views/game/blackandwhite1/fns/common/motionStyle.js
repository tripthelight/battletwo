import { reactiveState } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";

export default (elem) => {
  const PLAYER_CARD = document.querySelector(".order-motion dl:first-child dd");
  const ENEMY_CARD = document.querySelector(".order-motion dl:last-child dd");
  const PLAYER_FRONT = PLAYER_CARD.querySelector("span.fornt");
  const PLAYER_BACK = PLAYER_CARD.querySelector("span.back");
  const ENEMY_FRONT = ENEMY_CARD.querySelector("span.fornt");
  const ENEMY_BACK = ENEMY_CARD.querySelector("span.back");
  const RES_WIDTH = PLAYER_FRONT.clientWidth >= PLAYER_BACK.clientWidth ? PLAYER_FRONT.clientWidth + 10 : PLAYER_BACK.clientWidth + 10;

  PLAYER_CARD.style.width = ENEMY_CARD.style.width = RES_WIDTH + "px";
  PLAYER_FRONT.style.width = PLAYER_BACK.style.width = RES_WIDTH + "px";
  ENEMY_FRONT.style.width = ENEMY_BACK.style.width = RES_WIDTH + "px";
  PLAYER_CARD.style.marginLeft = ENEMY_CARD.style.marginLeft = -(RES_WIDTH / 2) + "px";

  reactiveState.InnerSquareW = RES_WIDTH;

  elem.classList.add("active");
};
