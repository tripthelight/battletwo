// import waitEnemy from "../common/waitEnemy.js";

export default () => {
  const ENEMY_BLOCK = document.querySelector(".enemy-block");
  const PLAYER_BLOCK = document.querySelector(".player-block");
  if (ENEMY_BLOCK && PLAYER_BLOCK) {
    ENEMY_BLOCK.remove();
    PLAYER_BLOCK.remove();
  } else {
    // error
    // waitEnemy("err");
  }
};
