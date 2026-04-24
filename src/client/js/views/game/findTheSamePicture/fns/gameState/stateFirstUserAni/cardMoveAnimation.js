import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import { timeInterval_400 } from "@/client/js/functions/variable";
import loopPromise from "@/client/js/module/loopPromise";
import gameBorderAnimation from "@/client/js/views/game/findTheSamePicture/fns/gameState/stateFirstUserAni/gameBorderAnimation";

// betUser: true인 user의 닉네임 카드가 움직이는 애니메이션
export default (_activeCards) => {
  const BOARD = document.querySelector(".board");
  if (!BOARD) throw throwObj('elementLoss', "cardMoveAnimation.js - .board element failed.");
  BOARD.style.transition = `width .4s ease-in, height .4s ease-in`;
  const BOARD_BOARD = (_pos) => {
    let res = 0;
    switch (_pos) {
      case "t":
        res = getComputedStyle(BOARD).borderTopWidth;
        break;
      case "r":
        res = getComputedStyle(BOARD).borderRightWidth;
        break;
      case "b":
        res = getComputedStyle(BOARD).borderBottomWidth;
        break;
      case "l":
        res = getComputedStyle(BOARD).borderLeftWidth;
        break;
      default:
        break;
    }
    return Number(res.replace("px", ""));
  };

  const ACTIVE_CARDS = _activeCards.sort((a, b) => a.dataset.active - b.dataset.active);

  let blank = 100;
  let x = 0;
  let y = 0;
  let cardSize = 0;
  let bh = 0;
  let bw = 0;

  let ws = window.innerWidth >= window.innerHeight ? true : false;
  let wSize = window.innerWidth >= window.innerHeight ? window.innerWidth : window.innerHeight;

  const BW_TB = BOARD_BOARD("t") + BOARD_BOARD("b");
  const BW_LR = BOARD_BOARD("t") + BOARD_BOARD("b");

  cardSize = Math.floor((wSize - (ws ? BW_LR : BW_TB) - blank) / ACTIVE_CARDS.length);
  if (_activeCards.length < 5) {
    if (ws) {
      cardSize = (window.innerHeight - 20) / 4;
    } else {
      cardSize = (window.innerWidth - 20) / 4;
    }
  }

  for (let i = 0; i < ACTIVE_CARDS.length; i++) {
    const FRONT = ACTIVE_CARDS[i].querySelector("span.front");
    ACTIVE_CARDS[i].style.width = `${cardSize}px`;
    ACTIVE_CARDS[i].style.height = `${cardSize}px`;
    FRONT.style.fontSize = `${cardSize - 16}px`;
  }

  for (let i = 0; i < ACTIVE_CARDS.length; i++) {
    x = ws ? cardSize * i : 0;
    y = ws ? 0 : cardSize * i;
    if (_activeCards.length < 5) {
      x = cardSize * i;
      y = 0;
    }
    ACTIVE_CARDS[i].style.left = `${x}px`;
    ACTIVE_CARDS[i].style.top = `${y}px`;
  }

  bw = ws ? Math.floor(cardSize * ACTIVE_CARDS.length + BW_LR) : Math.floor(cardSize + BW_LR);
  bh = ws ? Math.floor(cardSize + BW_TB) : Math.floor(cardSize * ACTIVE_CARDS.length + BW_TB);
  if (_activeCards.length < 5) {
    bw = Math.floor(cardSize * ACTIVE_CARDS.length + BW_LR);
    bh = Math.floor(cardSize + BW_TB);
  }

  BOARD.style.transition = "all .2s ease-in";
  BOARD.style.maxWidth = `${bw}px`;
  BOARD.style.maxHeight = `${bh}px`;
  BOARD.style.width = `${bw}px`;
  BOARD.style.height = `${bh}px`;
  if (_activeCards.length >= 5) {
    if (ws) {
      BOARD.style.maxWidth = `${bw}px`;
    } else {
      BOARD.style.maxHeight = `${bh}px`;
    }
  }

  setTimeout(() => {
    const PICTURE_CARD = document.querySelectorAll(".picture-card");
    if (PICTURE_CARD.length < 1) throw throwObj('elementLoss', "cardMoveAnimation.js - .picture-card element failed.");
    for (let i = 0; i < PICTURE_CARD.length; i++) {
      PICTURE_CARD[i].remove();
    }
    setTimeout(() => {
      BOARD.classList.add("flip-active");
      // BOARD.style.backgroundColor = "transparent";
      for (let i = 0, p = Promise.resolve(); i < _activeCards.length; i++) {
        p = p
          .then(() => {
            return loopPromise(200 / _activeCards.length);
          })
          .then(() => {
            _activeCards[i].classList.add("flip");
          })
          .then(() => {
            setTimeout(() => {
              _activeCards[i].remove();
              if (i === _activeCards.length - 1) gameBorderAnimation(BOARD);
            }, timeInterval_400);
          })
          .catch((error) => errorManager(error, true));
      }
    }, timeInterval_400);
  }, timeInterval_400);
};
