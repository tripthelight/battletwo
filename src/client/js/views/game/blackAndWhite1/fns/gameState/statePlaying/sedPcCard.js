import sendComn from "@/client/js/views/game/blackAndWhite1/fns/common/sendComn";

export default (playerNumOrder, selectCubeNum) => {
  for (let i = 0; i < playerNumOrder.length; i++) {
    if (playerNumOrder[i] === selectCubeNum) {
      sendComn(selectCubeNum, i);
      break;
    }
  }
};
