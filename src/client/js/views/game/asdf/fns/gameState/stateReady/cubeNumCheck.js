import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/blackAndWhite1/request';

export default () => {
  const numArr = [];
  const CUBE_LIST = document.querySelectorAll("ul.cube li");
  if (CUBE_LIST) {
    for (let i = 0; i < CUBE_LIST.length; i++) {
      numArr.push(Number(CUBE_LIST[i].innerHTML) % 2 === 0 ? "even" : "odd");
    };
    storageMethod("s", "SET_ITEM",
      findCharCode([79, 77, 69, 88, 68, 89, 65, 70, 67, 78]), // numArr
      JSON.stringify(numArr)
    );
  };

  request('enemyCubeOrder', { order: numArr });
};
