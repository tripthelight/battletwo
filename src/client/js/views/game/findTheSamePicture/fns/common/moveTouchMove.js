import { selectX, selectY } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";

export default (e) => {
  let moveX = -(selectX - e.targetTouches[0].clientX);
  let moveY = -(selectY - e.targetTouches[0].clientY);
  e.target.style.zIndex = "3000";
  e.target.style.transform = "translate(" + moveX + "px, " + moveY + "px)";
};
