export default (_idx) => {
  const ENEMY_BLOCK_LIST = document.querySelector(".enemy-block-list");
  if (!ENEMY_BLOCK_LIST) return;
  const ENEMY_CUBE = window.sessionStorage.emenyCube;
  if (!ENEMY_CUBE) return;
  const ENEMY_CUBE_ARR = JSON.parse(ENEMY_CUBE);
  if (!ENEMY_CUBE_ARR || ENEMY_CUBE_ARR.length <= 0) return;
  ENEMY_CUBE_ARR.splice(_idx, 1);
  window.sessionStorage.setItem("emenyCube", JSON.stringify(ENEMY_CUBE_ARR));
};
