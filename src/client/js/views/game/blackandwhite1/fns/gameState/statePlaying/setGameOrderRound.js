import findCharCode from '@/client/js/functions/findCharCode';
import activeUserCheckRound from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/activeUserCheckRound";
import setGameOrderRoundCheck from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/setGameOrderRoundCheck";
import setBlink from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/setBlink";

export default (res) => {
  const encryptKey1 = findCharCode([73, 71, 65, 80, 77, 75, 84, 66, 85, 82]); // activeUser

  const USERS = window.sessionStorage.getItem("userOrder");
  const USER_LIST = USERS.split(",");

  const encryptVal3 = storageMethod("l", "GET_ITEM", "localPlayer");

  let orderArr = [];
  let fUser = "";
  let sUser = "";
  switch (res) {
    case "win":
      storageMethod("s", "SET_ITEM", encryptKey1, encryptVal3);
      fUser = encryptVal3;
      for (let i = 0; i < USER_LIST.length; i++) {
        if (USER_LIST[i] !== encryptVal3) {
          sUser = USER_LIST[i];
          break;
        }
      }
      break;
    case "die":
      sUser = encryptVal3;
      for (let i = 0; i < USER_LIST.length; i++) {
        if (USER_LIST[i] !== encryptVal3) {
          fUser = USER_LIST[i];
          storageMethod("s", "SET_ITEM", encryptKey1, USER_LIST[i]);
          break;
        }
      }
      break;
    case "drew":
      if (encryptVal3 == USER_LIST[0]) {
        fUser = encryptVal3;
        for (let i = 0; i < USER_LIST.length; i++) {
          if (USER_LIST[i] !== encryptVal3) {
            sUser = USER_LIST[i];
            break;
          }
        }
      } else {
        sUser = encryptVal3;
        for (let i = 0; i < USER_LIST.length; i++) {
          if (USER_LIST[i] !== encryptVal3) {
            fUser = USER_LIST[i];
            break;
          }
        }
      }
      storageMethod("s", "SET_ITEM", encryptKey1, fUser);
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
