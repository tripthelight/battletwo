import addEventsShuffleCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/addEventsShuffleCube";
import pcCubeDisabled from "@/client/js/views/game/blackAndWhite1/fns/common/pcCubeDisabled";

export default () => {
  pcCubeDisabled(false);
  let shuffleCubes = document.querySelectorAll("ul.cube li");
  [].forEach.call(shuffleCubes, (item) => {
    addEventsShuffleCube(item, false);
  });
};
