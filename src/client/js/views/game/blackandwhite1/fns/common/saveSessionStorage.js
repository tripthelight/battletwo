import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';

export default () => {
  const CUBE = document.querySelector(".cube");
  if (CUBE) {
    const CUBE_LIST = CUBE.querySelectorAll("li");
    const playerNumOrder = [];
    for (let i = 0; i < CUBE_LIST.length; i++) {
      playerNumOrder.push(CUBE_LIST[i].innerHTML);
    };

    storageMethod("s", "SET_ITEM",
      findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]), // playerNumOrder
      playerNumOrder
    );
  }
};
