import { selectX, selectY, pcOffsetLeft, pcOffsetTop } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";

export default (e) => {
  e.target.style.transition = `transform 0s ease-in`;
  selectX = e.targetTouches[0].clientX;
  selectY = e.targetTouches[0].clientY;
  pcOffsetLeft = e.target.offsetLeft;
  pcOffsetTop = e.target.offsetTop;
};
