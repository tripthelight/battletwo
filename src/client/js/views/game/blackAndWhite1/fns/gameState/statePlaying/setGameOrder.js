// import waitEnemy from "../common/waitEnemy.js";
import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';

/**
 * gameState playing 진입 순간 여기로 진입됨
 */
export default () => {
  // const ROUND = window.sessionStorage.getItem("round");
  // const USERS = window.sessionStorage.getItem("users");

  const encryptKey1 = findCharCode([77, 84, 83, 88, 69, 85, 82, 87, 90, 79]); // round
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);

  // const USER_LIST = USERS?.split(",") ?? [];
  // const ACTIVE_USER = window.sessionStorage.getItem("activeUser");
  // const MY_UID = window.localStorage.getItem("uid");

  const encryptKey2 = findCharCode([73, 71, 65, 80, 77, 75, 84, 66, 85, 82]); // activeUser
  const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);
  const encryptVal3 = storageMethod("l", "GET_ITEM", "localPlayer");
  const encryptKey4 = findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90]); // enemyNick
  const encryptVal4 = storageMethod("s", "GET_ITEM", encryptKey4); // enemyNick code

  let fUser = "";
  let sUser = "";
  let orderArr = [];
  // if (ROUND < 9) {
  if (dec(encryptVal1) < 9) { // round < 9
    console.log("activeUser 검사할 때 : ", encryptVal2);
    console.log("activeUser :::::::::::::::::::::: ", encryptVal2);
    console.log("localPlayer ::::::::::::::::::::: ", encryptVal3);
    console.log("activeUser == localPlayer ::::::: ", encryptVal2 == encryptVal3);

    // 1 ~ 8 ROUND
    if (encryptVal2 == encryptVal3) {
      fUser = encryptVal3; // localPlayer
      sUser = encryptVal4; // enemyNick
      // for (let i = 0; i < USER_LIST.length; i++) {
      //   if (USER_LIST[i] !== encryptVal3) {
      //     sUser = USER_LIST[i];
      //   }
      // }
    } else {
      sUser = encryptVal3; // localPlayer
      fUser = encryptVal4; // enemyNick
      // for (let i = 0; i < USER_LIST.length; i++) {
      //   if (USER_LIST[i] !== encryptVal3) {
      //     fUser = USER_LIST[i];
      //   }
      // }
    }
  // } else if (ROUND == 9) {
  } else if (dec(encryptVal1) == 9) { // round == 9
    // LAST ROUND
    // console.log('LAST ROUND');
  } else {
    // error
    // waitEnemy("error");
  }
  orderArr = [fUser, sUser];
  storageMethod("s", "SET_ITEM",
    findCharCode([74, 65, 88, 72, 66, 84, 83, 67, 69, 85]), // userOrder
    JSON.stringify(orderArr)
  );
};
