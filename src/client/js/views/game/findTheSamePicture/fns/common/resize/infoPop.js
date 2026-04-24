export default () => {
  // const INFO_POP_BG = document.querySelectorAll(".info-play-pop-bg");
  // if (INFO_POP_BG.length < 1) return;

  const CONTAINER = document.getElementById("container");
  if (!CONTAINER) return;
  // console.log("CONTAINER ::: ", CONTAINER.classList.contains("info-play-pop"));
  // console.log("!CONTAINER :: ", !CONTAINER.classList.contains("info-play-pop"));
  if (!CONTAINER.classList.contains("info-play-pop")) return;
  const PLAYER_BLOCK = CONTAINER.querySelector(".player-block");
  if (!PLAYER_BLOCK) return;
  const MODAL = CONTAINER.querySelector(".modal");
  if (!MODAL) return;

  const MODAL_TXT = MODAL.innerHTML;

  MODAL.classList.remove("multi-line");
  MODAL.classList.remove("one-line");

  const MODAL_WIDTH = MODAL_TXT.length * 14 + 24 + 32;

  if (MODAL_WIDTH > window.innerWidth) {
    MODAL.classList.add("multi-line");
  } else {
    MODAL.classList.add("one-line");
  }
  MODAL.style.bottom = `${PLAYER_BLOCK.clientHeight + 10}px`;

  /*
  const BOARD = document.querySelector(".board");
  if (!BOARD) return;
  const PLAYER_ICON = document.querySelector(".player-icon");
  if (!PLAYER_ICON) return;

  const PLAYER_BLOCK = document.querySelector(".player-block");
  if (!PLAYER_BLOCK) return;
  const PLAYER_CARD_LIST = PLAYER_BLOCK.querySelector("ul");
  if (!PLAYER_CARD_LIST) return;
  const PLAYER_CARDS = PLAYER_CARD_LIST.querySelectorAll("li");
  if (!PLAYER_CARDS || PLAYER_CARDS.length < 1) return;
  */
};
