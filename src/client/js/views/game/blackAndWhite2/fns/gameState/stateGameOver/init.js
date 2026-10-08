import dataHandler from '@/client/js/functions/dataVerification/load/dataHandler';
import findCharCode from '@/client/js/functions/findCharCode';

export default {
  main: () => {
    dataHandler({
      p1: findCharCode([76, 83, 81, 73, 68, 75, 77, 80, 89, 66]), // blackAndWhite2
      p2: findCharCode([80, 83, 88, 65, 79, 75, 86, 76, 87, 73]), // gameOver
    });
  },
  nextStep: () => {
    //
  },
};
