import { timeInterval_3000 } from '@/client/js/functions/variable';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import cardOpacityAnimation from "@/client/js/views/game/findTheSamePicture/fns/gameState/stateFirstUserAni/cardOpacityAnimation";
import picCardFlip from "@/client/js/views/game/findTheSamePicture/fns/common/picCardFlip";
import loopPromise from "@/client/js/module/loopPromise";

export default async () => {
  try {
    const CARDS = await picCardFlip();
    let flipArr = [360, 720];
    let flipActiveArr = [180, 540, 900];
    for (let i = 0, p = Promise.resolve(); i < CARDS.length; i++) {
      p = p
        .then(() => {
          return loopPromise(1);
        })
        .then(() => {
          let flipNum = 0;
          if (CARDS[i].classList.contains("active")) {
            flipNum = flipActiveArr[Math.floor(Math.random() * flipActiveArr.length)];
          } else {
            flipNum = flipArr[Math.floor(Math.random() * flipArr.length)];
          }
          return { cards: CARDS[i], num: flipNum };
        })
        .then((_data) => {
          setTimeout(() => {
            _data.cards.style.transform = `rotateY(${_data.num}deg)`;
          }, 1);
        })
        .catch((error) => {
          errorManager(error, true);
        });
    }
    setTimeout(cardOpacityAnimation, timeInterval_3000, CARDS);
    // for (let i = 0; i < CARDS.length; i++) {
    //   let flipNum = 0;
    //   if (CARDS[i].classList.contains("active")) {
    //     flipNum = flipActiveArr[Math.floor(Math.random() * flipActiveArr.length)];
    //   } else {
    //     flipNum = flipArr[Math.floor(Math.random() * flipArr.length)];
    //   }
    //   CARDS[i].style.transform = `rotateY(${flipNum}deg)`;
    // }
  } catch (error) {
    throw throwObj(error?.errCase ?? 'cardNum', error?.message ?? `flipAnimation :  ${error}`);
  }
};
