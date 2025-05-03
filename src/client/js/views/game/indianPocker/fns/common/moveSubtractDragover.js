export default (event) => {
  event.preventDefault();
  if (window.sessionStorage.dropState === "true") return;
  const PLAYER_BLOCK = document.querySelector(".player-block");
  if (!PLAYER_BLOCK.classList.contains("over")) {
    PLAYER_BLOCK.classList.add("over");
  }
};
