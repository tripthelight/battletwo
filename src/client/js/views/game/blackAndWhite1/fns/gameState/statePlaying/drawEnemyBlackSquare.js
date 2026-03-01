import cubesStyle from "@/client/js/views/game/blackAndWhite1/fns/common/cubesStyle";

export default () => {
  if (!document.querySelector(".enemy-black-square")) {
    let elem = document.createElement("div");
    elem.classList.add("enemy-black-square");
    let w = cubesStyle().w;
    let h = cubesStyle().h;
    elem.style.width = w + "px";
    elem.style.height = h + "px";
    elem.style.marginLeft = 0 - w / 2 + "px";
    const ENEMY_BLOCK = document.querySelector("#gameScene .enemy-block");
    if (ENEMY_BLOCK) {
      ENEMY_BLOCK.appendChild(elem);
    }
  }
};
