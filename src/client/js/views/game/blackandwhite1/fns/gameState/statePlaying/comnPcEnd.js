import { timeInterval_1, timeInterval_2, timeInterval_3, timeInterval_4 } from "@/client/js/functions/variable";
import sedPcCard from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/sedPcCard";
import clearSelectedCard from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/clearSelectedCard";
import cubeListStyle from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/cubeListStyle";
import hideInnerSquare from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/hideInnerSquare";

export default (cube, num) => {
  console.log("큐브 옮김 >>>>>>>> ", cube);
  console.log("큐브 옮김 >>>>>>>> ", num);

  setTimeout(() => {
    sedPcCard(cube, num);
  }, timeInterval_1);
  setTimeout(() => {
    clearSelectedCard(cube, num);
  }, timeInterval_2);
  setTimeout(() => {
    cubeListStyle(cube);
  }, timeInterval_3);
  setTimeout(() => {
    hideInnerSquare();
  }, timeInterval_4);
};
