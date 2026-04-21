import cubeReady from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/cubeReady';
import cubePlaying from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/cubePlaying";
import showEnemyCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/showEnemyCube";
import shuffleCubeStop from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateWaitEnemyShuffle/shuffleCubeStop';
import drawInnerSquare from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawInnerSquare";
import btnStartChange from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/btnStartChange';
import activeUserCheck from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/activeUserCheck";
import turnReminderBlink from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnReminderBlink";
import { timeInterval_203 } from '@/client/js/functions/variable';

export default function () {
  cubeReady();
  cubePlaying();
  showEnemyCube();
  shuffleCubeStop();
  drawInnerSquare();
  btnStartChange();
  setTimeout(() => {
    activeUserCheck();
    turnReminderBlink();
  }, timeInterval_203);
}
