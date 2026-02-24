export default () => {
  const CUBES = document.querySelectorAll(".cube.ready li");
  if (CUBES.length > 0) {
    console.log("CUBES[0].clientWidth :: ", CUBES[0].clientWidth);
    console.log("CUBES[0].clientHeight :: ", CUBES[0].clientHeight);
    return {
      w: Math.floor(CUBES[0].clientWidth / 2),
      h: Math.floor(CUBES[0].clientHeight / 2),
    };
  }

  if (document.body.classList.contains("portrait")) {
    // 세로가 김
    return {
      w: window.clientHeight / 9,
      h: window.clientHeight / 9 + 10,
    };
  } else {
    // 가로가 김
    return {
      w: window.clientWidth / 9,
      h: window.clientWidth / 9 + 10,
    };
  }
};
