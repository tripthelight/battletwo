import dataHandler from '@/client/js/functions/dataVerification/load/dataHandler';
import findCharCode from '@/client/js/functions/findCharCode';

export default {
  main: () => {
    dataHandler({
      p1: findCharCode([65, 78, 82, 83, 75, 81, 66, 72, 67, 87]), // memoryMaze
      p2: findCharCode([82, 77, 74, 79, 73, 81, 86, 78, 80, 65]), // gameOver
    });
  },
  nextStep: () => {
    //
  },
};
