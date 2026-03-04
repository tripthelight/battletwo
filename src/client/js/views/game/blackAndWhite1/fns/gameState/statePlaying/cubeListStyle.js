export default () => {
  const CUBE_UL = document.querySelector(".cube");
  const CUBE_LI = CUBE_UL.querySelectorAll("li");
  let w = 0;
  if (CUBE_LI.length > 0) {
    if (CUBE_UL.getBoundingClientRect().height > CUBE_LI[0].getBoundingClientRect().height) {
      // 2줄
      if (CUBE_LI.length % 2 === 0) {
        // 짝수개 남음
        w = Number((CUBE_LI.length / 2) * Math.ceil(CUBE_LI[0].getBoundingClientRect().width));
      } else {
        // 홀수개 남음
        w = Number(Math.ceil(CUBE_LI.length / 2) * Math.ceil(CUBE_LI[0].getBoundingClientRect().width));
      }
    } else {
      // 1줄
      w = Number(CUBE_LI.length * Math.ceil(CUBE_LI[0].getBoundingClientRect().width));
    }
    CUBE_UL.style.padding = 0;
    CUBE_UL.style.width = w + "px";
  }
};
