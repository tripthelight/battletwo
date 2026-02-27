import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import selectCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectCube";
import disabledSelectInit from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/disabledSelectInit";
import setGameOrder from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/setGameOrder";
import firstCheck from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/firstCheck";
import findActiveUser from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/findActiveUser";

export default () => {
  let activeUser = "";

  const encryptKey1 = findCharCode([73, 71, 65, 80, 77, 75, 84, 66, 85, 82]); // activeUser
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);

  if (!encryptVal1) {
    if (firstCheck()) {
      selectCube();
      activeUser = storageMethod("l", "GET_ITEM", "localPlayer");
    } else {
      disabledSelectInit();
      // find active user
      activeUser = findActiveUser();
    }
    window.sessionStorage.setItem("activeUser", activeUser);
    setGameOrder();
  } else {
    // refresh
    const USERS = window.sessionStorage.getItem("userOrder");
    const USER_LIST = USERS.split(",");

    // change session activeUser
    activeUser = encryptVal1;
    if (activeUser == storageMethod("s", "GET_ITEM", "localPlayer")) {
      selectCube();
    } else {
      disabledSelectInit();
    }
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
