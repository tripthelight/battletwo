import { selectX, selectY } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";

export default (e) => {
  selectX = 0;
  selectY = 0;
  e.target.style.zIndex = "1";
  e.target.style.transform = "translate(" + selectX + "px, " + selectY + "px)";
  e.target.style.transition = `transform .2s ease-in`;
};
