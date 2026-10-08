import dataHandler from '@/client/js/functions/dataVerification/load/dataHandler';
import findCharCode from '@/client/js/functions/findCharCode';

export default {
  main: () => {
    dataHandler({
      p1: findCharCode([65, 78, 82, 83, 75, 81, 66, 72, 67, 87]), // memoryMaze
      p2: findCharCode([72, 80, 76, 68, 90, 82, 81, 89, 75, 69]), // ready
    });
  },
  nextStep: () => {
    //
  },
};
