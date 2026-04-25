import { timeInterval_2001 } from "@/client/js/functions/variable";

export default (_data) => {
  return new Promise((resolve, reject) => {
    _data.newCard.style.top = `0px`;
    _data.newCard.style.opacity = 1;
    _data.playerCards[9].style.removeProperty("z-index");
    _data.playerCards[_data.playerCards.length - 1].remove();
    if (_data.endState) {
      const PLAYER_ICON = document.querySelector(".player-icon");
      if (!PLAYER_ICON) errorComn(".player-icon not found");
      PLAYER_ICON.remove();
    }
    setTimeout(() => {
      const DATA = {
        endState: _data.endState,
        clickNum: _data.clickNum,
        clickBoardNum: _data.clickBoardNum,
      };
      resolve(DATA);
    }, timeInterval_2001);
  });
};
