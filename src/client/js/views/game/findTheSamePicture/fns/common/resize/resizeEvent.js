import pictureBoard from "@/client/js/views/game/findTheSamePicture/fns/common/resize/pictureBoard";
import bodyClass from "@/client/js/views/game/findTheSamePicture/fns/common/resize/bodyClass";
import userIcon from "@/client/js/views/game/findTheSamePicture/fns/common/resize/userIcon";
import infoPop from "@/client/js/views/game/findTheSamePicture/fns/common/resize/infoPop";
import resultBoardTxt from "@/client/js/views/game/findTheSamePicture/fns/common/resize/resultBoardTxt";
import resultWinCardWrap from "@/client/js/views/game/findTheSamePicture/fns/common/resize/resultWinCardWrap";

export default () => {
  bodyClass();
  userIcon();
  window.addEventListener("resize", () => {
    bodyClass();
    pictureBoard();
    userIcon();
    infoPop();
    resultBoardTxt();
    resultWinCardWrap();
  });
};
