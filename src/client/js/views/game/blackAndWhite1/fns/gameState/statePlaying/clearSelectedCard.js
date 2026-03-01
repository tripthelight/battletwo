export default (cube, num) => {
  const CUBE_LIST = cube.querySelectorAll("li");
  if (CUBE_LIST.length > 0) {
    for (let i = 0; i < CUBE_LIST.length; i++) {
      if (Number(CUBE_LIST[i].innerHTML) === num) {
        console.log("여기서 다 지우는 구만 ????? ");
        CUBE_LIST[i].remove();
      }
    }
  }
};
