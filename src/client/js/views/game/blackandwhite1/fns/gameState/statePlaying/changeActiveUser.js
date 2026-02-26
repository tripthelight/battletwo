import changeActiveBlackSquare from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/changeActiveBlackSquare";
import changeDisabledCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/changeDisabledCube";

export default () => {
  const MY_UID = window.localStorage.getItem("uid");
  const ACTIVE_USER = window.sessionStorage.getItem("activeUser");
  const USERS = window.sessionStorage.getItem("users");
  const USER_LIST = USERS.split(",");
  let changeUser = "";
  if (ACTIVE_USER && MY_UID) {
    if (USER_LIST.length > 0) {
      if (ACTIVE_USER == MY_UID) {
        for (let i = 0; i < USER_LIST.length; i++) {
          if (USER_LIST[i] !== MY_UID) {
            changeUser = USER_LIST[i];
            break;
          }
        }
      } else {
        changeUser = MY_UID;
      }
      window.sessionStorage.setItem("activeUser", changeUser);
      changeActiveBlackSquare(changeUser, MY_UID);
      changeDisabledCube(changeUser, MY_UID);
    }
  }
};
