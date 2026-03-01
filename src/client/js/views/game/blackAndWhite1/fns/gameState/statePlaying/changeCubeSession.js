export default (_num) => {
  const CUBE = document.querySelector(".cube.ready");
  if (CUBE) {
    const CUBE_LIST = CUBE.querySelectorAll("li");
    if (CUBE_LIST.length > 0) {
      let numArr = [];
      for (let i = 0; i < CUBE_LIST.length; i++) {
        if (Number(CUBE_LIST[i].innerHTML) !== _num) {
          numArr.push(CUBE_LIST[i].innerHTML);
        }
      }

      console.log("changeCubeSession.js cube >>>>>>>>>>>>>>> ", numArr);

      window.sessionStorage.setItem("playerNumOrder", numArr);

      const BLOCK_SQUARE = document.querySelector(".black-square");
      if (BLOCK_SQUARE) {
        const SPAN_EL = BLOCK_SQUARE.querySelector("span");
        if (!SPAN_EL) {
          const ACTIVE_NUM = window.sessionStorage.getItem("beforePlayerNum");
          if (ACTIVE_NUM) {
            let spanEl = document.createElement("span");
            spanEl.innerHTML = ACTIVE_NUM;
            BLOCK_SQUARE.appendChild(spanEl);
          }
        }
      }
    }
  }
};
