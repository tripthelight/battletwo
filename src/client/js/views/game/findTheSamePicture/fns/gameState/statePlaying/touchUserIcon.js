import throwObj from '@/client/js/module/errorHandler/throwObj';
import moveIcon from "@/client/js/views/game/findTheSamePicture/fns/common/moveIcon";

export default () => {
  const P_ICON = document.querySelector(".player-icon");
  if (!P_ICON) throw throwObj('elementLoss', "touchUserIcon.js - .player-icon element failed.");

  const ICONS = [P_ICON];

  [].forEach.call(ICONS, (item) => {
    moveIcon(item);
  });
};
