import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';

export default () => {
  return new Promise((resolve, reject) => {
    const encryptKey1 = findCharCode([81, 77, 68, 70, 74, 82, 69, 67, 75, 80]); // picTxt
    const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);

    if (encryptVal1) {
      resolve(JSON.parse(encryptVal1));
    } else {
      const encryptKey2 = findCharCode([70, 80, 83, 79, 71, 87, 75, 78, 76, 84]); // nicknameList
      const encryptVal2 = storageMethod('s', 'GET_ITEM', encryptKey2);
      if (!encryptVal2) reject("not found nickname list");
      const NICKNAME_ARR = JSON.parse(encryptVal2);
      const NICKNAME_JOIN = NICKNAME_ARR.join("");
      const NICKNAME_CHAR = NICKNAME_JOIN.split("");
      resolve(NICKNAME_CHAR);
    }
  });
};
