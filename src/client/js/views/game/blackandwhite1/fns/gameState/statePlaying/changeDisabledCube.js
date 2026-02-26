import disabledSelectInit from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/disabledSelectInit";
import selectCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectCube";

export default (activeUser, uid) => {
  if (activeUser !== uid) {
    disabledSelectInit();
  } else {
    selectCube();
  }
};
