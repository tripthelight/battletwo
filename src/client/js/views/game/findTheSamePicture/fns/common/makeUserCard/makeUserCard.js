import findRandomName from "@/client/js/views/game/findTheSamePicture/fns/common/findRandomName";
import compareSync from "@/client/js/views/game/findTheSamePicture/fns/common/compareSync";
import { CARD_LIST } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";

export default () => {
  return new Promise((resolve, reject) => {
    const ORDER_NUM = window.sessionStorage.getItem(findRandomName(1));
    const ORDER_NUM_LIST = JSON.parse(ORDER_NUM);
    const RANDOM_NUM = window.sessionStorage.getItem(findRandomName(2));
    const RANDOM_NUM_LIST = JSON.parse(RANDOM_NUM);

    let cardList = [];
    for (let i = 0; i < 16; i++) {
      cardList.push(CARD_LIST[ORDER_NUM_LIST[compareSync(RANDOM_NUM_LIST, i)]]);
    }

    resolve(cardList);
  });
};
