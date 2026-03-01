// import { dragSrcEl } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";
import { reactiveState } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";
import evenOdd from "@/client/js/views/game/blackAndWhite1/fns/common/evenOdd";

export default (e) => {
  if (reactiveState.dragSrcEl != e.target) {
    reactiveState.dragSrcEl.innerHTML = e.target.innerHTML;
    e.target.innerHTML = e.dataTransfer.getData("text");
    evenOdd(e.target);
  }
  return false;
};
