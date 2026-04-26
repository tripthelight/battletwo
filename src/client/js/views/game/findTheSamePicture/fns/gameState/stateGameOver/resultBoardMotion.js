import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';

import { timeInterval_1 } from "@/client/js/functions/variable";
import { CARD_LIST } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";
import findRandomName from "@/client/js/views/game/findTheSamePicture/fns/common/findRandomName";
import compareSync from "@/client/js/views/game/findTheSamePicture/fns/common/compareSync";
import loopPromise from "@/client/js/module/loopPromise";
import resultTxtMotion from "@/client/js/views/game/findTheSamePicture/fns/gameState/stateGameOver/resultTxtMotion";

export default () => {
  // .board card를 랜덤하게 회전시키기
  const BOARD = document.querySelector(".board");
  if (!BOARD) throw throwObj('elementLoss', "resultBoardMotion.js - .board element failed.");
  const CARDS = BOARD.querySelectorAll("li");
  if (!CARDS || CARDS.length < 16) throw throwObj('elementLoss', "resultBoardMotion.js - .board card element failed.");

  // 1. .board card 뒷먼에 카드 심기
  let back = new Object();
  let imgCard = new Object();

  const SESS_ORDER_NUM = window.sessionStorage.getItem(findRandomName(1));
  const SESS_ORDER_NUM_LIST = JSON.parse(SESS_ORDER_NUM);
  const SESS_RANDOM_NUM = window.sessionStorage.getItem(findRandomName(2));
  const SESS_RANDOM_NUM_LIST = JSON.parse(SESS_RANDOM_NUM);

  // 1. .board card 회전
  let randomDegArr = [180, 540, 900];
  let randomDeg = 0;
  let delayArr = [];
  let maxDelay = 0;
  for (let i = 0, p = Promise.resolve(); i < CARDS.length; i++) {
    p = p
      .then(() => {
        return loopPromise(1);
      })
      .then(() => {
        const BTN = CARDS[i].querySelector("button");

        back = document.createElement("span");
        back.classList.add("back");
        imgCard = document.createElement("img");

        let compareNum = compareSync(SESS_RANDOM_NUM_LIST, i);
        let orderNum = SESS_ORDER_NUM_LIST[compareNum];
        imgCard.src = CARD_LIST[orderNum];
        back.appendChild(imgCard);
        BTN.appendChild(back);

        randomDeg = Math.floor(Math.random() * 2);
        let randomDealy = Number((Math.random() * 3 + 1).toFixed(3));
        BTN.style.transition = `transform ${randomDealy}s ease-in`; // 1부터 3사이 랜덤한 숫자
        delayArr.push(randomDealy);
        maxDelay = Math.max(...delayArr);
        return {
          delay: maxDelay,
          deg: randomDeg,
          el: BTN,
        };
      })
      .then((_data) => {
        setTimeout(() => {
          _data.el.style.transform = `rotateY(${randomDegArr[_data.deg]}deg)`;
          if (i === CARDS.length - 1) {
            setTimeout(() => {
              resultTxtMotion();
            }, _data.delay * 1000);
          }
        }, timeInterval_1);
      })
      .catch((error) => {
        errorManager(error, true);
      });
  }
};
