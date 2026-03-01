import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import activeUserCheckRound from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/activeUserCheckRound";
import setGameOrderRoundCheck from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/setGameOrderRoundCheck";
import setBlink from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/setBlink";

export default (res) => {
  const encryptKey1 = findCharCode([73, 71, 65, 80, 77, 75, 84, 66, 85, 82]); // activeUser
  const encryptVal3 = storageMethod("l", "GET_ITEM", "localPlayer");

  const encryptKey2 = findCharCode([74, 65, 88, 72, 66, 84, 83, 67, 69, 85]); // userOrder
  const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);
  const USER_ORDER = JSON.parse(encryptVal2);
  const USER_LIST = USER_ORDER.map(s => s.split(",")); // [["", "", "", ""], ["", "", "", ""]] 형태

  let fUser = "";
  let sUser = "";
  switch (res) {
    case "win":
      storageMethod("s", "SET_ITEM", encryptKey1, encryptVal3);
      fUser = encryptVal3;
      for (let i = 0; i < USER_LIST.length; i++) {
        const str = USER_LIST[i].join(",").replace(/\s+/g, "");
        if (str !== encryptVal3) {
          sUser = str;
          break;
        }
      }
      break;
    case "die":
      sUser = encryptVal3;
      for (let i = 0; i < USER_LIST.length; i++) {
        const str = USER_LIST[i].join(",").replace(/\s+/g, "");
        if (str !== encryptVal3) {
          fUser = str;
          storageMethod("s", "SET_ITEM", encryptKey1, str);
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
  };

  storageMethod("s", "SET_ITEM",
    encryptKey2, // userOrder
    JSON.stringify([fUser, sUser])
  );
  activeUserCheckRound();
  setGameOrderRoundCheck();
  setBlink();
};
