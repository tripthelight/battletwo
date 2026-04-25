import { timeInterval_1001 } from "@/client/js/functions/variable";

export default (_data, _newCard) => {
  return new Promise((resolve, reject) => {
    const ENEMY_BLOCK = document.querySelector(".enemy-block");
    if (!ENEMY_BLOCK) errorComn(".enemy-block not found");
    const ENEMY_LIST = ENEMY_BLOCK.querySelector("ul");
    if (!ENEMY_LIST) errorComn(".enemy-block ul not found");
    const ENEMY_CARDS = ENEMY_LIST.querySelectorAll("li");
    if (!ENEMY_CARDS || ENEMY_CARDS.length < 20) errorComn("enemy card not found");

    // 첫번째 카드 떨어트리기
    const FIRST_CARD_POS = Math.floor(Math.random() * ENEMY_CARDS[0].clientWidth + 1) + ENEMY_CARDS[0].clientWidth;
    ENEMY_CARDS[0].style.transform = `
      translate(${FIRST_CARD_POS}px, ${FIRST_CARD_POS}px)
      scale(${(Math.random() * 3 + 1).toFixed(2)})
      rotate(${(Math.random() * (541 - 180) + 180).toFixed(2)}deg)`;
    ENEMY_CARDS[0].style.opacity = 0;
    ENEMY_CARDS[0].style.zIndex = 1001;

    let x = 0;
    let y = 0;

    if (ENEMY_BLOCK.clientHeight > ENEMY_CARDS[0].clientHeight) {
      // 2줄
      for (let i = 0; i < ENEMY_CARDS.length; i++) {
        if (i !== 0) {
          x = 0 - ENEMY_CARDS[i].clientWidth;
          if (i === 10) {
            x = ENEMY_CARDS[i - 1].offsetLeft;
            y = 0 - ENEMY_CARDS[i - 1].clientHeight;
            ENEMY_CARDS[i].style.zIndex = "1000";
          } else {
            y = 0;
          }

          if (i === ENEMY_CARDS.length - 1) {
            x = 0;
          }
          ENEMY_CARDS[i].style.transform = `translate(${x}px, ${y}px)`;
        }
      }
    } else {
      // 1줄
      for (let i = 0; i < ENEMY_CARDS.length; i++) {
        if (i !== 0) {
          x = 0 - ENEMY_CARDS[i].clientWidth;
          if (i === ENEMY_CARDS.length - 1) {
            x = 0;
          }
          ENEMY_CARDS[i].style.transform = `translate(${x}px, ${y}px)`;
        }
      }
    }
    // 새로 생성된 카드 위치 잡기
    _newCard.style.position = "absolute";
    _newCard.style.opacity = 0;
    _newCard.style.transition = `bottom 1s ease-in, opacity 1s ease-in`;
    _newCard.style.bottom = `${0 - ENEMY_CARDS[18].clientHeight}px`;
    _newCard.style.right = `${ENEMY_CARDS[0].clientWidth}px`;
    ENEMY_LIST.appendChild(_newCard);

    setTimeout(() => {
      const RETURN_DATE = {
        data: _data,
        newCard: _newCard,
        removeCard: ENEMY_CARDS[0],
      };
      resolve(RETURN_DATE);
    }, timeInterval_1001);
  });
};
