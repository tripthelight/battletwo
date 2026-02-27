// import waitEnemy from "../common/waitEnemy.js";
import storageMethod from '@/client/js/module/storage/storageMethod';

export default () => {
  const USERS = window.sessionStorage.getItem("users");
  const USER_LIST = USERS?.split(",") ?? [];

  if (USER_LIST.length > 0) {
    for (let i = 0; i < USER_LIST.length; i++) {
      if (USER_LIST[i] !== storageMethod("l", "GET_ITEM", "localPlayer")) {
        return USER_LIST[i];
      }
    }
  } else {
    // return waitEnemy();
  }
};
