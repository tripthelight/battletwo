import { CARD_LEN } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";

export default () => {
  return new Promise((resolve, reject) => {
    let randomNums = [];
    for (let i = 0; i < CARD_LEN; i++) {
      let randomNum = Math.floor(Math.random() * CARD_LEN);
      if (randomNums.indexOf(randomNum) === -1) {
        randomNums.push(randomNum);
      } else {
        i--;
      }
    }
    resolve(randomNums);
  });
};
