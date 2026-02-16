// import { dragSrcEl } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";
import { reactiveState } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";

export default (e) => {
  // this.style.opacity = "0.4";
  e.target.style.opacity = "0.4";
  reactiveState.dragSrcEl = e.target;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text", e.target.innerHTML);
};
