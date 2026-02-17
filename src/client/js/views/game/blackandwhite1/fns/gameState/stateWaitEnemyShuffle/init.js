import dataHandler from '@/client/js/functions/dataVerification/load/dataHandler';
import findCharCode from '@/client/js/functions/findCharCode';

export default {
  main: () => {
    dataHandler({
      p1: findCharCode([69, 66, 77, 86, 73, 90, 71, 78, 89, 79]), // blackAndWhite1
      p2: findCharCode([67, 86, 80, 69, 76, 66, 77, 73, 72, 71]), // waitEnemyShuffle
    });
  },
  nextStep: () => {
    //
  },
};
