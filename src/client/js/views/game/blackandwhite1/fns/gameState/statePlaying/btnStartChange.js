import { removeElem } from "@/client/js/functions/comnExport";
import drawScoreboard from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawScoreboard";
import drawRoundCircle from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawRoundCircle";

export default () => {
  removeElem(".info-shuffle, .btn-start");
  drawScoreboard();
  drawRoundCircle();
};
