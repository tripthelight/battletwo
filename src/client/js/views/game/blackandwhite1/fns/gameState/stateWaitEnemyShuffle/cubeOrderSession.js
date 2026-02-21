import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';

export default () => {
  // not
  const CUBE = document.querySelector(".cube.ready");
  const encryptKey1 = findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]); // playerNumOrder
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
  if (CUBE) {
    if (encryptVal1 !== '' && encryptVal1 !== null) {
      // const NUMS_ARR = NUMS.split(",");
      // const NUMS_ARR = encryptVal1.split(",").map(Number);
      const NUMS_ARR = JSON.parse(encryptVal1);
      const numArr = [];
      if (NUMS_ARR.length > 0) {
        for (let i = 0; i < NUMS_ARR.length; i++) {
          numArr.push(NUMS_ARR[i]);
        };
        storageMethod("s", "SET_ITEM", encryptKey1, JSON.stringify(numArr));
      }
    } else {
      const CUBE_LIST = CUBE.querySelectorAll("li");
      const numArr = [];
      if (CUBE_LIST.length > 0) {
        for (let i = 0; i < CUBE_LIST.length; i++) {
          numArr.push(CUBE_LIST[i].innerHTML);
        };
        storageMethod("s", "SET_ITEM", encryptKey1, JSON.stringify(numArr));
      }
    }
  }
};
