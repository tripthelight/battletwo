// import { dragSrcEl } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";
import { reactiveState } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";

export default (e) => {
  // console.log("shuffleStart : e.target >>>>>>> ", e.target);

  const WRAP_UL = e.target.closest("ul.cube");
  const SELC_LI = e.target;
  const LI_IDX = Array.prototype.indexOf.call(WRAP_UL.children, SELC_LI);
  // console.log("선택한 큐브의 index ::::::::::::: ", LI_IDX);
  reactiveState.idxS = LI_IDX;

  // this.style.opacity = "0.4";
  e.target.style.opacity = "0.4";
  reactiveState.dragSrcEl = e.target;

  // console.log("shuffleStart : e.target >>>>>>> ", e.target);
  // console.log("shuffleStart : dragSrcEl >>>>>> ", reactiveState.dragSrcEl);

  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text", e.target.innerHTML);
};
