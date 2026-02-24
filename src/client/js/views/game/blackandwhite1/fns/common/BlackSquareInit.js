export default () => {
  const GAME_SCENE = document.getElementById("gameScene");
  if (GAME_SCENE) {
    const PLAYER_BLOCK = GAME_SCENE.querySelector(".player-block");
    if (PLAYER_BLOCK) {
      const CUBE = PLAYER_BLOCK.querySelector(".cube.ready");
      if (CUBE) {
        const LI = CUBE.querySelectorAll("li");
        if (LI.length > 0) {
          return {
            w: LI[0].clientWidth,
            h: LI[0].clientHeight,
          };
        }
      }
    }
  }
  return {
    w: 50,
    h: 100,
  };
};
