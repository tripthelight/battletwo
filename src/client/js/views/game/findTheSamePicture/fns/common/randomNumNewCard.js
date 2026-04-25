import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';

export default () => {
  let randomNum = Math.floor(Math.random() * 16);



  const encryptKey2 = findCharCode([80, 82, 68, 73, 86, 85, 90, 66, 87, 71]); // en
  const encryptVal2 = storageMethod('s', 'GET_ITEM', encryptKey2);
  if (!encryptVal2) throw throwObj('sessionStorageLoss', "randomNumNewCard.js - en not found");

  const EN_ARR = JSON.parse(encryptVal2);

  // const EN = window.sessionStorage.en;
  // if (!EN) throw throwObj('sessionStorageLoss', "randomNumNewCard.js - en not found");
  // const EN_ARR = JSON.parse(EN);

  do {
    randomNum = Math.floor(Math.random() * 16);
  } while (randomNum === EN_ARR[1]);

  return randomNum;
};
