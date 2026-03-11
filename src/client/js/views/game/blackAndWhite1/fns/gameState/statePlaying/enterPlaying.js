import cubeReady from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/cubeReady';
import cubePlaying from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/cubePlaying";
import showEnemyCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/showEnemyCube";
import shuffleCubeStop from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateWaitEnemyShuffle/shuffleCubeStop';
import drawInnerSquare from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawInnerSquare";
import btnStartChange from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/btnStartChange';
import selectCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectCube";

export default function () {
  cubeReady();
  cubePlaying();
  showEnemyCube();
  shuffleCubeStop();
  drawInnerSquare();
  btnStartChange();
  selectCube();
}
