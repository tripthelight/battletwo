import dataHandler from '@/client/js/functions/dataVerification/load/dataHandler';
import findCharCode from '@/client/js/functions/findCharCode';

export default {
  main: () => {
    dataHandler({
      p1: findCharCode([69, 66, 77, 86, 73, 90, 71, 78, 89, 79]), // blackAndWhite1
      p2: findCharCode([67, 68, 72, 69, 90, 77, 80, 81, 75, 85]), // gameOver
    });
  },
  nextStep: () => {
    //
  },
};
