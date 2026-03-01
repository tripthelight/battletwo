import addEventsShuffleCubeStop from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateWaitEnemyShuffle/addEventsShuffleCubeStop";
import pcCubeDisabled from "@/client/js/views/game/blackAndWhite1/fns/common/pcCubeDisabled";

export default () => {
  pcCubeDisabled(false);
  let shuffleCubes = document.querySelectorAll("ul.cube li");
  [].forEach.call(shuffleCubes, (item) => {
    addEventsShuffleCubeStop(item);
  });
};
