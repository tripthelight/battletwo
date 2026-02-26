export default () => {
  const ACTIVE_USER = window.sessionStorage.getItem("activeUser");
  const MY_UID = window.localStorage.getItem("uid");
  const BLOCK_SQUARE = document.querySelector(".black-square");
  const ENEMY_BLACK_SQUARE = document.querySelector(".enemy-black-square");
  if (BLOCK_SQUARE && ENEMY_BLACK_SQUARE) {
    if (ACTIVE_USER == MY_UID) {
      BLOCK_SQUARE.classList.add("active");
    } else {
      ENEMY_BLACK_SQUARE.classList.add("active");
    }
  }
};
