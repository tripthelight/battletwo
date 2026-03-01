import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';

export default () => {
  const CUBE = document.querySelector(".cube");
  if (CUBE) {
    const CUBE_LIST = CUBE.querySelectorAll("li");
    const playerNumOrder = [];
    // START 버튼을 누르는 순간 큐브에 있는 숫자들의 순서로 배열 생성
    for (let i = 0; i < CUBE_LIST.length; i++) {
      playerNumOrder.push(CUBE_LIST[i].innerHTML);
    };

    console.log("saveSessionStorage.js cube >>>>>>>>>>>>>>> ", playerNumOrder);

    storageMethod("s", "SET_ITEM",
      findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]), // playerNumOrder
      JSON.stringify(playerNumOrder)
    );
  }
};
