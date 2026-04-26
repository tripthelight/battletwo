import { timeInterval_2001 } from "@/client/js/functions/variable";
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default (_data) => {
  return new Promise((resolve, reject) => {
    _data.newCard.style.top = `0px`;
    _data.newCard.style.opacity = 1;
    _data.playerCards[9].style.removeProperty("z-index");
    _data.playerCards[_data.playerCards.length - 1].remove();
    if (_data.endState) {
      const PLAYER_ICON = document.querySelector(".player-icon");
      // if (!PLAYER_ICON) errorComn(".player-icon not found");
      // if (!PLAYER_ICON) throw throwObj('elementLoss', "promiseMoveCardsEnd.js - .player-icon element failed.");;
      if (!PLAYER_ICON) reject("promiseMoveCardsEnd.js - .player-icon element failed.");
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
