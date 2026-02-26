// import waitEnemy from "../common/waitEnemy.js";
import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';

export default () => {
  // const ROUND = window.sessionStorage.getItem("round");
  // const USERS = window.sessionStorage.getItem("users");

  const encryptKey1 = findCharCode([77, 84, 83, 88, 69, 85, 82, 87, 90, 79]); // round
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);

  const USER_LIST = USERS.split(",");
  const ACTIVE_USER = window.sessionStorage.getItem("activeUser");
  const MY_UID = window.localStorage.getItem("uid");
  let fUser = "";
  let sUser = "";
  let orderArr = [];
  // if (ROUND < 9) {
  if (dec(encryptVal1) < 9) { // round < 9
    // 1 ~ 8 ROUND
    if (ACTIVE_USER == MY_UID) {
      fUser = MY_UID;
      for (let i = 0; i < USER_LIST.length; i++) {
        if (USER_LIST[i] !== MY_UID) {
          sUser = USER_LIST[i];
        }
      }
    } else {
      sUser = MY_UID;
      for (let i = 0; i < USER_LIST.length; i++) {
        if (USER_LIST[i] !== MY_UID) {
          fUser = USER_LIST[i];
        }
      }
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
  window.sessionStorage.setItem("userOrder", orderArr);
};
