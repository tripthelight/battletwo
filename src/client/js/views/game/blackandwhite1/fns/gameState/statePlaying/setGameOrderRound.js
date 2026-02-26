import activeUserCheckRound from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/activeUserCheckRound";
import setGameOrderRoundCheck from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/setGameOrderRoundCheck";
import setBlink from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/setBlink";

export default (res) => {
  const USERS = window.sessionStorage.getItem("userOrder");
  const USER_LIST = USERS.split(",");
  const MY_UID = window.localStorage.getItem("uid");
  let orderArr = [];
  let fUser = "";
  let sUser = "";
  switch (res) {
    case "win":
      window.sessionStorage.setItem("activeUser", MY_UID);
      fUser = MY_UID;
      for (let i = 0; i < USER_LIST.length; i++) {
        if (USER_LIST[i] !== MY_UID) {
          sUser = USER_LIST[i];
          break;
        }
      }
      break;
    case "die":
      sUser = MY_UID;
      for (let i = 0; i < USER_LIST.length; i++) {
        if (USER_LIST[i] !== MY_UID) {
          fUser = USER_LIST[i];
          window.sessionStorage.setItem("activeUser", USER_LIST[i]);
          break;
        }
      }
      break;
    case "drew":
      if (MY_UID == USER_LIST[0]) {
        fUser = MY_UID;
        for (let i = 0; i < USER_LIST.length; i++) {
          if (USER_LIST[i] !== MY_UID) {
            sUser = USER_LIST[i];
            break;
          }
        }
      } else {
        sUser = MY_UID;
        for (let i = 0; i < USER_LIST.length; i++) {
          if (USER_LIST[i] !== MY_UID) {
            fUser = USER_LIST[i];
            break;
          }
        }
      }
      window.sessionStorage.setItem("activeUser", fUser);
      break;
    default:
      break;
  }
  orderArr = [fUser, sUser];
  window.sessionStorage.setItem("userOrder", orderArr);
  activeUserCheckRound();
  setGameOrderRoundCheck();
  setBlink();
};
