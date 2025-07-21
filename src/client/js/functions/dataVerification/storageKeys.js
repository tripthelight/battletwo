import findCharCode from '@/client/js/functions/findCharCode';
import indianPockerKeys from '@/client/js/functions/dataVerification/keys/indianPockerKeys';

export default (params) => {
  const { p1, p2 } = params;

  // gameName: indianPocker
  // if (p1 === findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69])) { //
  if (p1 === 'indianPocker') {
    return indianPockerKeys(p2);
  }
};
