import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';

export default (_user) => {
  // const PN_LIST = window.sessionStorage.pn;
  // const EN_LIST = window.sessionStorage.en;
  // const PN_ARR = JSON.parse(PN_LIST);
  // const EN_ARR = JSON.parse(EN_LIST);

  const encryptKey1 = findCharCode([75, 79, 83, 78, 89, 82, 68, 69, 73, 86]); // pn
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  const PN_ARR = JSON.parse(encryptVal1);

  const encryptKey2 = findCharCode([80, 82, 68, 73, 86, 85, 90, 66, 87, 71]); // en
  const encryptVal2 = storageMethod('s', 'GET_ITEM', encryptKey2);
  const EN_ARR = JSON.parse(encryptVal2);

  if (_user === "p") return EN_ARR[1];
  return PN_ARR[1];
};
