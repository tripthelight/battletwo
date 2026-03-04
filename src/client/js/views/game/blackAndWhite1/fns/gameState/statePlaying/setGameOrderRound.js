import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import activeUserCheckRound from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/activeUserCheckRound";
import setGameOrderRoundCheck from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/setGameOrderRoundCheck";
import setBlink from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/setBlink";

// 한 라운드 종료 후 진입
export default (res) => {
  const encryptKey1 = findCharCode([73, 71, 65, 80, 77, 75, 84, 66, 85, 82]); // activeUser
  const encryptVal3 = storageMethod("l", "GET_ITEM", "localPlayer");

  // const encryptKey2 = findCharCode([74, 65, 88, 72, 66, 84, 83, 67, 69, 85]); // userOrder
  // const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);
  // const USER_ORDER = JSON.parse(encryptVal2);
  // const USER_LIST = USER_ORDER.map(s => s.split(",")); // [["", "", "", ""], ["", "", "", ""]] 형태

  const encryptKey2 = findCharCode([73, 81, 90, 83, 68, 86, 69, 89, 78, 70]); // firstUser
  // const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);

  const encryptKey4 = findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90]); // enemyNick
  const encryptVal4 = storageMethod("s", "GET_ITEM", encryptKey4);

  // let fUser = "";
  // let sUser = "";
  switch (res) {
    case "win":
      storageMethod("s", "SET_ITEM", encryptKey1, encryptVal3); // activeUser -> local Nick
      storageMethod("s", "SET_ITEM", encryptKey2, encryptVal3); // firstUser -> local Nick
      break;
    case "die":
      storageMethod("s", "SET_ITEM", encryptKey1, encryptVal4); // activeUser -> enemyNick
      storageMethod("s", "SET_ITEM", encryptKey2, encryptVal4); // firstUser -> local Nick
      break;
    case "drew":
      // storageMethod("s", "SET_ITEM", encryptKey1, fUser);

      // if (encryptVal3 == USER_LIST[0]) {
      //   fUser = encryptVal3;
      //   for (let i = 0; i < USER_LIST.length; i++) {
      //     if (USER_LIST[i] !== encryptVal3) {
      //       sUser = USER_LIST[i];
      //       break;
      //     }
      //   }
      // } else {
      //   sUser = encryptVal3;
      //   for (let i = 0; i < USER_LIST.length; i++) {
      //     if (USER_LIST[i] !== encryptVal3) {
      //       fUser = USER_LIST[i];
      //       break;
      //     }
      //   }
      // }
      // storageMethod("s", "SET_ITEM", encryptKey1, fUser);
      break;
    default:
      break;
  };

  // storageMethod("s", "SET_ITEM",
  //   encryptKey2, // userOrder
  //   JSON.stringify([fUser, sUser])
  // );
  activeUserCheckRound();
  setGameOrderRoundCheck();
  setBlink();
};
