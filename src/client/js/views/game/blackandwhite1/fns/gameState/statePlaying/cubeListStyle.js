export default (cube) => {
  const CUBE_LIST = cube.querySelectorAll("li");
  let w = 0;
  if (CUBE_LIST.length > 0) {
    if (cube.getBoundingClientRect().height > CUBE_LIST[0].getBoundingClientRect().height) {
      // 2줄
      if (CUBE_LIST.length % 2 === 0) {
        // 짝수개 남음
        w = Number((CUBE_LIST.length / 2) * Math.ceil(CUBE_LIST[0].getBoundingClientRect().width));
      } else {
        // 홀수개 남음
        w = Number(Math.ceil(CUBE_LIST.length / 2) * Math.ceil(CUBE_LIST[0].getBoundingClientRect().width));
      }
    } else {
      // 1줄
      w = Number(CUBE_LIST.length * Math.ceil(CUBE_LIST[0].getBoundingClientRect().width));
    }
    cube.style.padding = 0;
    cube.style.width = w + "px";
  }
};
