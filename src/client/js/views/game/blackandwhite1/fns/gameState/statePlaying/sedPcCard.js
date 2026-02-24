import sendComn from "./sendComn.js";

export default (cube, num) => {
  const CUBE_LIST = cube.querySelectorAll("li");
  if (CUBE_LIST.length > 0) {
    for (let i = 0; i < CUBE_LIST.length; i++) {
      if (Number(CUBE_LIST[i].innerHTML) === num) {
        sendComn(num, i);
        break;
      }
    }
  }
};
