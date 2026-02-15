import findCharCode from '@/client/js/functions/findCharCode';
import indianPockerKeys from '@/client/js/functions/dataVerification/keys/indianPockerKeys';
import blackAndWhite1Keys from '@/client/js/functions/dataVerification/keys/blackAndWhite1Keys';

export default (params) => {
  const { p1, p2 } = params;

  // gameName: indianPocker
  if (p1 === findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69])) { //
    return indianPockerKeys(p2);
  };

  // gameName: blackAndWhite1
  if (p1 === findCharCode([69, 66, 77, 86, 73, 90, 71, 78, 89, 79])) { //
    return blackAndWhite1Keys(p2);
  };
};
