// import waitEnemy from "../common/waitEnemy.js";

export default () => {
  const USERS = window.sessionStorage.getItem("users");
  const USER_LIST = USERS.split(",");
  if (USER_LIST.length > 0) {
    for (let i = 0; i < USER_LIST.length; i++) {
      if (USER_LIST[i] !== window.localStorage.getItem("uid")) {
        return USER_LIST[i];
      }
    }
  } else {
    // return waitEnemy();
  }
};
