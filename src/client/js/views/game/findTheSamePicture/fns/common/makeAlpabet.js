import { CARD_LEN, ALPABAT_LIST } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";

export default () => {
  return new Promise((resolve, reject) => {
    let alpabet = [];
    for (let i = 0; i < CARD_LEN; i++) {
      let randomNum = Math.floor(Math.random() * ALPABAT_LIST.length);
      if (alpabet.indexOf(ALPABAT_LIST[randomNum]) === -1) {
        alpabet.push(ALPABAT_LIST[randomNum]);
      } else {
        i--;
      }
    }
    resolve(alpabet);
  });
};
