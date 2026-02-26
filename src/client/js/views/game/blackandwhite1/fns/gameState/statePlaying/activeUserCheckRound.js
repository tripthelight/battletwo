import firstCheckRound from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/firstCheckRound";
import selectCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectCube";
import disabledSelectInit from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/disabledSelectInit";
import findActiveUser from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/findActiveUser";

export default () => {
  let activeUser = "";
  if (firstCheckRound()) {
    selectCube();
    activeUser = window.localStorage.getItem("uid");
  } else {
    disabledSelectInit();
    // find active user
    activeUser = findActiveUser();
  }
  window.sessionStorage.setItem("activeUser", activeUser);
};
