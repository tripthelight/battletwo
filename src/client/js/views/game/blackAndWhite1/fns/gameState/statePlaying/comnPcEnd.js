import { timeInterval_1, timeInterval_2, timeInterval_3, timeInterval_4 } from "@/client/js/functions/variable";
import sedPcCard from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/sedPcCard";
import clearSelectedCard from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/clearSelectedCard";
import cubeListStyle from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/cubeListStyle";
import hideInnerSquare from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/hideInnerSquare";

export default (playerNumOrder, selectCubeNum) => {
  setTimeout(() => {
    sedPcCard(playerNumOrder, selectCubeNum);
  }, timeInterval_1);
  setTimeout(() => {
    clearSelectedCard(playerNumOrder, selectCubeNum);
  }, timeInterval_2);
  setTimeout(() => {
    cubeListStyle();
  }, timeInterval_3);
  setTimeout(() => {
    hideInnerSquare();
  }, timeInterval_4);
};
