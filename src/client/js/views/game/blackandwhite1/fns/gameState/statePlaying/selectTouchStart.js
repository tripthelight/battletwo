// import { selectX, selectY } from "./variable.js";
import { reactiveState } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";

export default (e) => {
  reactiveState.selectX = e.targetTouches[0].clientX;
  reactiveState.selectY = e.targetTouches[0].clientY;
};
