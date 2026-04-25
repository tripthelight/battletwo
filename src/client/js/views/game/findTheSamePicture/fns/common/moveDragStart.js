import { pcActiveEl, selectX, selectY, pcOffsetLeft, pcOffsetTop } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";

export default (event) => {
  event.target.style.opacity = 0.01;
  pcActiveEl = event;
  selectX = event.clientX;
  selectY = event.clientY;
  pcOffsetLeft = event.target.offsetLeft;
  pcOffsetTop = event.target.offsetTop;
  event.dataTransfer.setData("Text", event.target.innerHTML);
};
