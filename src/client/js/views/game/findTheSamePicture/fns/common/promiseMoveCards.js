import { timeInterval_1000 } from "@/client/js/functions/variable";

export default (_data) => {
  return new Promise((resolve, reject) => {
    let x = 0;
    let y = 0;
    if (_data.playerList.clientHeight > _data.playerCards[0].clientHeight) {
      const NINE_IMG_X = 0 - _data.playerCards[9].offsetLeft;
      const NINE_IMG_Y = _data.playerCards[10].offsetTop;

      _data.playerCards[9].style.transform = `translate(${NINE_IMG_X}px, ${NINE_IMG_Y}px)`;
      _data.playerCards[9].style.zIndex = `1000`;
      // _data.playerCards[9].classList.add("move");
      for (let i = 0; i < _data.playerCards.length; i++) {
        if (i !== 0 && i !== _data.playerCards.length - 1 && i !== 9) {
          x = _data.playerCards[i].clientWidth;
          _data.playerCards[i].style.transform = `translate(${x}px, ${y}px)`;
        }
      }
    } else {
      // 한 줄일 경우
      for (let i = 0; i < _data.playerCards.length; i++) {
        if (i !== 0 && i !== _data.playerCards.length - 1) {
          x = _data.playerCards[i].clientWidth;
          _data.playerCards[i].style.transform = `translate(${x}px, ${y}px)`;
        }
      }
    }

    setTimeout(() => {
      const DATA = {
        playerCards: _data.playerCards,
        newCard: _data.newCard,
        endState: _data.endState,
        clickNum: _data.clickNum,
        clickBoardNum: _data.clickBoardNum,
      };
      resolve(DATA);
    }, timeInterval_1000);
  });
};
