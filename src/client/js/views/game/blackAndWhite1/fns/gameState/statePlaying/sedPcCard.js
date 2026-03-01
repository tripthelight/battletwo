import sendComn from "@/client/js/views/game/blackAndWhite1/fns/common/sendComn";

export default (cube, num) => {
  const CUBE_LIST = cube.querySelectorAll("li");
  if (CUBE_LIST.length > 0) {
    for (let i = 0; i < CUBE_LIST.length; i++) {
      console.log("FOR >>>>>> 1 ", Number(CUBE_LIST[i].innerHTML));
      console.log("FOR >>>>>> 2 ", num);

      if (Number(CUBE_LIST[i].innerHTML) === num) {
        sendComn(num, i);
        break;
      }
    }
  }
};
