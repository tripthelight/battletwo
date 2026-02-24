import selectCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectCube";
import disabledSelectInit from "./disabledSelectInit.js";
import setGameOrder from "./setGameOrder.js";
import firstCheck from "./firstCheck.js";
import findActiveUser from "./findActiveUser.js";

export default () => {
  let activeUser = "";
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
};
