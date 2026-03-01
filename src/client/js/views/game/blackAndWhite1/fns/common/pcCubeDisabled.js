import deviceStateStore from '@/client/store/deviceStateStore';

export default (state) => {
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
  if (deviceState === "pc") {
    const CUBE = document.querySelector(".cube");
    if (CUBE) {
      const CUBES = CUBE.querySelectorAll("li");
      if (CUBES.length > 0) {
        for (let i = 0; i < CUBES.length; i++) {
          CUBES[i].setAttribute("draggable", state ? true : false);
        }
      }
    }
  }
};
