import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import findRandomName from "@/client/js/views/game/findTheSamePicture/fns/common/findRandomName";

export default (_user) => {
  const encryptKey1 = findCharCode([75, 79, 83, 78, 89, 82, 68, 69, 73, 86]); // pn
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (!encryptVal1) throw throwObj('sessionStorageLoss', "findTouchActive.js - pn not found");
  const encryptKey2 = findCharCode([80, 82, 68, 73, 86, 85, 90, 66, 87, 71]); // en
  const encryptVal2 = storageMethod('s', 'GET_ITEM', encryptKey2);
  if (!encryptVal2) throw throwObj('sessionStorageLoss', "findTouchActive.js - en not found");

  const PN_ARR = JSON.parse(encryptVal1);
  const EN_ARR = JSON.parse(encryptVal2);

  // const PN = window.sessionStorage.pn;
  // const EN = window.sessionStorage.en;
  // if (!PN) throw throwObj('sessionStorageLoss', "findTouchActive.js - pn not found");
  // if (!EN) throw throwObj('sessionStorageLoss', "findTouchActive.js - en not found");
  // const PN_ARR = JSON.parse(PN);
  // const EN_ARR = JSON.parse(EN);

  // const ACTIVE_LIST = window.sessionStorage.getItem(findRandomName(5));
  const ACTIVE_LIST = storageMethod('s', 'GET_ITEM', findRandomName(5));
  if (!ACTIVE_LIST) throw throwObj('sessionStorageLoss', "findTouchActive.js - active list not found");
  const ACTIVE_LIST_ARR = JSON.parse(ACTIVE_LIST);

  if (_user === "p") return PN_ARR[Number(ACTIVE_LIST_ARR[EN_ARR[1]] - 1)];
};
