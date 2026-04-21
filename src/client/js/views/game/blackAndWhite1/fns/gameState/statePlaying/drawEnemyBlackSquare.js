import cubesStyle from "@/client/js/views/game/blackAndWhite1/fns/common/cubesStyle";
import cubeAddColor from '@/client/js/views/game/blackAndWhite1/fns/common/cubeAddColor';
import { loadEnemyBeforeCube } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/enemyBeforeCube';

export default () => {
  if (!document.querySelector(".enemy-black-square")) {
    let elem = document.createElement("div");
    elem.classList.add("enemy-black-square");
    let w = cubesStyle().w;
    let h = cubesStyle().h;
    elem.style.width = w + "px";
    elem.style.height = h + "px";
    elem.style.marginLeft = 0 - w / 2 + "px";
    const enemyBeforeCube = loadEnemyBeforeCube();
    if (enemyBeforeCube) {
      elem.classList.add(cubeAddColor(enemyBeforeCube));
    }
    const ENEMY_BLOCK = document.querySelector("#gameScene .enemy-block");
    if (ENEMY_BLOCK) {
      ENEMY_BLOCK.appendChild(elem);
    }
  }
};
