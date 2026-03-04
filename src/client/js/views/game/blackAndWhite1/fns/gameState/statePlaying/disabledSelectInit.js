import pcCubeDisabled from "@/client/js/views/game/blackAndWhite1/fns/common/pcCubeDisabled";
import addEventsSelectCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/addEventsSelectCube";

export default () => {
  pcCubeDisabled(true);
  const disabledselectCubes = document.querySelectorAll("ul.cube li");
  [].forEach.call(disabledselectCubes, (item) => {
    addEventsSelectCube(item, false);
  });
};
