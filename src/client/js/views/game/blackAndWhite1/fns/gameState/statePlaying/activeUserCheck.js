import selectCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectCube";
import disabledSelectInit from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/disabledSelectInit";
import {
  ensureActiveUser,
  isLocalTurn
} from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnState";

export default () => {
  const activeUser = ensureActiveUser();

  if (!activeUser) {
    disabledSelectInit();
  } else if (isLocalTurn()) {
    selectCube();
  } else {
    disabledSelectInit();
  }


  /*
  if (window.sessionStorage.getItem("activeUser")) {
    // refresh
    const USERS = window.sessionStorage.getItem("userOrder");
    const USER_LIST = USERS.split(",");

    // change session activeUser
    activeUser = window.sessionStorage.getItem("activeUser");
    if (activeUser == window.localStorage.getItem("uid")) {
      selectCube();
    } else {
      disabledSelectInit();
    }
  } else {
    // not refresh : only first game
    if (firstCheck()) {
      selectCube();
      activeUser = window.localStorage.getItem("uid");
    } else {
      disabledSelectInit();
      // find active user
      activeUser = findActiveUser();
    }
    window.sessionStorage.setItem("activeUser", activeUser);
    setGameOrder();
  }
  */
};
