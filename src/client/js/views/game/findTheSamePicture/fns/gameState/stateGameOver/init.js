import dataHandler from '@/client/js/functions/dataVerification/load/dataHandler';
import findCharCode from '@/client/js/functions/findCharCode';

export default {
  main: () => {
    dataHandler({
      p1: findCharCode([76, 87, 77, 88, 82, 81, 66, 71, 65, 86]), // findTheSamePicture
      p2: findCharCode([66, 85, 77, 82, 70, 74, 67, 81, 76, 87]), // gameOver
    });
  },
  nextStep: () => {
    //
  },
};
