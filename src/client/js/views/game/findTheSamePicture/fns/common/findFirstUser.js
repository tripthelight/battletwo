export default () => {
  return new Promise((resolve, reject) => {
    const FIRST_USER = window.sessionStorage.clickUser;
    if (!FIRST_USER) reject("not found clickUser");
    const MY_NICKNAME = window.localStorage.nickname;
    if (!MY_NICKNAME) reject("not found nickname");
    const NICKNAME_LIST = window.sessionStorage.nicknameList;
    if (!NICKNAME_LIST) reject("not found nickname list");
    const NICKNAME_LIST_ARR = JSON.parse(NICKNAME_LIST);
    for (let i = 0; i < NICKNAME_LIST_ARR.length; i++) {
      if (FIRST_USER === "true") {
        resolve(MY_NICKNAME);
      } else {
        resolve(
          NICKNAME_LIST_ARR.filter((item) => {
            return item !== MY_NICKNAME;
          }).join("")
        );
      }
    }
  });
};
