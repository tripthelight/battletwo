import dataHandler from '@/client/js/functions/dataVerification/load/dataHandler';
import findCharCode from '@/client/js/functions/findCharCode';

export default {
  main: () => {
    dataHandler({
      p1: findCharCode([69, 66, 77, 86, 73, 90, 71, 78, 89, 79]), // blackAndWhite1
      p2: findCharCode([65, 71, 81, 72, 85, 75, 78, 74, 86, 73]), // setOrder
    });
  },
  nextStep: () => {
    //
  },
};
