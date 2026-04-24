import throwObj from '@/client/js/module/errorHandler/throwObj';
import cardMoveAnimation from "@/client/js/views/game/findTheSamePicture/fns/gameState/stateFirstUserAni/cardMoveAnimation";

export default (_cards) => {
  let percentData;
  let activeCards = [];
  const BOARD = document.querySelector(".board");
  if (!BOARD) throw throwObj('elementLoss', "cardOpacityAnimation.js - .board element failed.");
  for (let i = 0; i < _cards.length; i++) {
    const STATE = _cards[i].classList.contains("active");
    if (!STATE) {
      let randomArray = [];
      const ARRAY_LEN = Math.floor(Math.random() * 10) + 2;
      for (let i = 0; i < ARRAY_LEN; i++) {
        const randomNumber = Math.floor(Math.random() * 500) + 1;
        randomArray.push(randomNumber);
      }
      const RANDOM_ARR_SORT = randomArray.sort((a, b) => {
        if (a > b) return 1;
        if (a === b) return 0;
        if (a < b) return -1;
      }); // setTimeout delay time array

      // console.log("RANDOM_ARR_SORT :: ", RANDOM_ARR_SORT);

      for (let j = 0; j < RANDOM_ARR_SORT.length; j++) {
        setTimeout(() => {
          _cards[i].style.opacity = (Math.random() * 1).toFixed(2);
        }, RANDOM_ARR_SORT[j]);
      }
      setTimeout(() => {
        _cards[i].style.opacity = 0;
      }, 500);
    } else {
      const BACK = _cards[i].querySelector("span.back");
      const ACTIVE_CARD = document.createElement("li");
      const ACTIVE_FRONT = document.createElement("span");
      const ACTIVE_BACK = document.createElement("span");
      ACTIVE_CARD.classList.add("active-card");
      ACTIVE_FRONT.classList.add("front");
      ACTIVE_BACK.classList.add("back");
      ACTIVE_CARD.style.cssText = `
        width: ${_cards[i].clientWidth}px;
        height: ${_cards[i].clientHeight}px;
        left: ${_cards[i].offsetLeft}px;
        top: ${_cards[i].offsetTop}px;
      `;
      ACTIVE_FRONT.style.cssText = `
        font-size: ${getComputedStyle(_cards[i]).fontSize};
      `;
      ACTIVE_FRONT.innerHTML = _cards[i].querySelector("span.back").textContent;
      ACTIVE_CARD.appendChild(ACTIVE_FRONT);
      ACTIVE_CARD.appendChild(ACTIVE_BACK);
      ACTIVE_CARD.setAttribute("data-active", _cards[i].dataset.active);
      BOARD.appendChild(ACTIVE_CARD);
      _cards[i].style.opacity = 0;

      activeCards.push(ACTIVE_CARD);
    }
  }
  setTimeout(() => {
    if (activeCards.length > 0) {
      cardMoveAnimation(activeCards);
    } else {
      // 다음 STEP 진행
    }
  }, 501);
};
