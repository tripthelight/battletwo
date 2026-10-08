import dataHandler from '@/client/js/functions/dataVerification/load/dataHandler';
import findCharCode from '@/client/js/functions/findCharCode';

export default {
  main: () => {
    dataHandler({
      p1: findCharCode([76, 83, 81, 73, 68, 75, 77, 80, 89, 66]), // blackAndWhite2
      p2: findCharCode([81, 86, 90, 89, 70, 66, 83, 75, 84, 77]), // playing
    });
  },
  nextStep: () => {
    //
  },
};
