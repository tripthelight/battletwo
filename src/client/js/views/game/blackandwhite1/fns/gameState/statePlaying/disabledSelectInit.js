import pcCubeDisabled from "@/client/js/views/game/blackAndWhite1/fns/common/pcCubeDisabled";
import disabledSelect from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/disabledSelect";

export default () => {
  pcCubeDisabled(true);
  let disabledselectCubes = document.querySelectorAll("ul.cube li");
  [].forEach.call(disabledselectCubes, (item) => {
    disabledSelect(item);
  });
};
