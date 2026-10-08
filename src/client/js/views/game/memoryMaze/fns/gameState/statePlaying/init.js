import dataHandler from '@/client/js/functions/dataVerification/load/dataHandler';
import findCharCode from '@/client/js/functions/findCharCode';

export default {
  main: () => {
    dataHandler({
      p1: findCharCode([65, 78, 82, 83, 75, 81, 66, 72, 67, 87]), // memoryMaze
      p2: findCharCode([82, 81, 79, 73, 85, 90, 66, 78, 77, 75]), // playing
    });
  },
  nextStep: () => {
    //
  },
};
