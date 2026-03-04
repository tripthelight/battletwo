export default (playerNumOrder, selectCubeNum) => {
  const CUBE_UL = document.querySelector(".cube");
  const CUBE_LI = CUBE_UL.querySelectorAll("li");
  if (CUBE_LI.length > 0) {
    for (let i = 0; i < playerNumOrder.length; i++) {
      if (playerNumOrder[i] === selectCubeNum) {
        CUBE_LI[i].remove();
      }
    }
  }
};
