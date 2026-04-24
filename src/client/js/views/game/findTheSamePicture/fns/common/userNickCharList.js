export default () => {
  return new Promise((resolve, reject) => {
    const PIC_TXT = window.sessionStorage.picTxt;
    if (PIC_TXT) {
      resolve(JSON.parse(PIC_TXT));
    } else {
      const NICKNAME_LIST = window.sessionStorage.nicknameList;
      if (!NICKNAME_LIST) reject("not found nickname list");
      const NICKNAME_ARR = JSON.parse(NICKNAME_LIST);
      const NICKNAME_JOIN = NICKNAME_ARR.join("");
      const NICKNAME_CHAR = NICKNAME_JOIN.split("");
      resolve(NICKNAME_CHAR);
    }
  });
};
