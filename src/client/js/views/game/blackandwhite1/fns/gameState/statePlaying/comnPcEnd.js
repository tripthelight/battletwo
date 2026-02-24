import { timeInterval_1, timeInterval_2, timeInterval_3, timeInterval_4 } from "@/client/js/functions/variable";
import sedPcCard from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/sedPcCard";
import clearSelectedCard from "./clearSelectedCard.js";
import cubeListStyle from "./cubeListStyle.js";
import hideInnerSquare from "./hideInnerSquare.js";

export default (cube, num) => {
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
