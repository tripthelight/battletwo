import cubesStyle from "@/client/js/views/game/blackAndWhite1/fns/common/cubesStyle";
import drawEnemyBlackSquare from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawEnemyBlackSquare";

export default () => {
  const ENEMY_BLOCK_LIST = document.querySelector(".enemy-block-list");
  if (!ENEMY_BLOCK_LIST) {
    let enemyCubeList = document.createElement("ul");
    enemyCubeList.classList.add("enemy-block-list");
    let cubeArr = JSON.parse(window.sessionStorage.getItem("emenyCube"));
    let w = cubesStyle().w;
    let h = cubesStyle().h;
    for (let i = 0; i < cubeArr.length; i++) {
      let enemyCubeBlock = document.createElement("li");
      enemyCubeBlock.style.width = w + "px";
      enemyCubeBlock.style.height = h + "px";
      if (cubeArr[i] === "even") enemyCubeBlock.classList.add("even");
      if (cubeArr[i] === "odd") enemyCubeBlock.classList.add("odd");
      enemyCubeList.appendChild(enemyCubeBlock);
    }
    const ENEMY_BLOCK = document.querySelector("#gameScene .enemy-block");
    if (ENEMY_BLOCK) {
      ENEMY_BLOCK.appendChild(enemyCubeList);
      drawEnemyBlackSquare();
    }
  }
};
