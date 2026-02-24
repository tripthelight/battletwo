import pcCubeDisabled from "@/client/js/views/game/blackAndWhite1/fns/common/pcCubeDisabled";
import addEventsSelectCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/addEventsSelectCube";

export default () => {
  const CUBE = document.querySelector(".cube");
  if (CUBE) {
    CUBE.classList.remove("disabled");
    pcCubeDisabled(true);
    let selectCubes = document.querySelectorAll("ul.cube li");
    [].forEach.call(selectCubes, function (item) {
      addEventsSelectCube(item);
    });
  }
};
