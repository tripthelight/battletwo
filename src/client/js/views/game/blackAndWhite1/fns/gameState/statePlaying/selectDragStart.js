import { reactiveState } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";

export default (e) => {
  // e.dataTransfer.setData("Text", event.target.innerHTML);

  const WRAP_UL = e.target.closest("ul.cube.ready.start");
  const SELC_LI = e.target;
  const LI_IDX = Array.prototype.indexOf.call(WRAP_UL.children, SELC_LI);
  console.log("선택한 큐브의 index ::::::::::::: ", LI_IDX);
  reactiveState.idxS = LI_IDX;
};
