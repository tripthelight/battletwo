export default () => {
  const PLAYER_BLACK = document.querySelector(".black-square");
  const ENEMY_BLACK = document.querySelector(".enemy-black-square");
  if (PLAYER_BLACK && ENEMY_BLACK) {
    PLAYER_BLACK.classList.remove("active");
    ENEMY_BLACK.classList.remove("active");
  }
};
