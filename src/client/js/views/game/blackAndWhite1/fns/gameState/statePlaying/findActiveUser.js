// import waitEnemy from "../common/waitEnemy.js";
import storageMethod from '@/client/js/module/storage/storageMethod';
import USERS from '@/client/js/views/game/blackAndWhite1/fns/common/users';

export default () => {
  const USER_LIST = USERS();

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
