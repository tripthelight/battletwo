import findCharCode from '@/client/js/functions/findCharCode';
import storageKeys from '@/client/js/functions/dataVerification/storageKeys';
import indianPockerClick from '@/client/js/functions/dataVerification/click/indianPocker/indianPockerClick';

export default (params) => {
  const { p1, p2, p3, clkData } = params;

  // gameName: indianPocker
  if (p1 === findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69])) {
    const params = {
      gameState: p2,
      storageKeys: storageKeys({ p1, p2 }),
      clickEvent: p3,
      clkData,
    };
    indianPockerClick(params);
  }
};
