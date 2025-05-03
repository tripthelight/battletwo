export default (event) => {
  event.preventDefault();
  const PLAYER_BLOCK = document.querySelector(".player-block");
  if (PLAYER_BLOCK.classList.contains("over")) {
    PLAYER_BLOCK.classList.remove("over");
  }
};
