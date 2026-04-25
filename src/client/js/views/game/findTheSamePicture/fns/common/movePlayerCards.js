import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import makeUserCard from "@/client/js/views/game/findTheSamePicture/fns/common/makeUserCard/makeUserCard";
import promiseMoveCards from "@/client/js/views/game/findTheSamePicture/fns/common/promiseMoveCards";
import promiseMoveCardsEnd from "@/client/js/views/game/findTheSamePicture/fns/common/promiseMoveCardsEnd";
import sendPlayerClickData from "@/client/js/views/game/findTheSamePicture/fns/common/sendPlayerClickData";
import infoPlayPop from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/infoPlayPop";
import findTheSamePictureGameState from '@/client/js/gameState/findTheSamePicture';
import findCharCode from '@/client/js/functions/findCharCode';
import errorManager from '@/client/js/module/errorHandler/errorManager';

export default async (_num, _card1Num, _orderNum, _clickBoardNum) => {
  try {
    // .player-icon 이 마지막 칸에 있으면 endState: true
    let endState = false;
    if (_num > 19) endState = true;

    const MAKE_USER_CARD = await makeUserCard();

    // const PN = window.sessionStorage.pn;
    // if (!PN) return errorComn("pn not found");
    // const PN_ARR = JSON.parse(PN);
    const encryptKey1 = findCharCode([75, 79, 83, 78, 89, 82, 68, 69, 73, 86]); // pn
    const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
    if (!encryptVal1) throw throwObj('sessionStorageLoss', "movePlayerCards.js - pn failed.");
    const PN_ARR = JSON.parse(encryptVal1);

    const PLAYER_BLOCK = document.querySelector(".player-block");
    if (!PLAYER_BLOCK) throw throwObj('elementLoss', "movePlayerCards.js - .player-block element failed.");
    const PLAYER_LIST = PLAYER_BLOCK.querySelector("ul");
    if (!PLAYER_LIST) throw throwObj('elementLoss', "movePlayerCards.js - .player-block ul element failed.");
    const PLAYER_CARDS = PLAYER_LIST.querySelectorAll("li");
    if (PLAYER_CARDS.length < 1) throw throwObj('elementLoss', "movePlayerCards.js - .player-block ul length element failed.");

    // 1. 새로 추가될 카드 이미지 생성
    const NEW_IMAGE = MAKE_USER_CARD[_card1Num];

    // 2. 새로 추가될 카드를 생성
    const NEW_CARD = document.createElement("li");
    const NEW_IMG = new Image();
    NEW_IMG.src = NEW_IMAGE;
    NEW_IMG.style.width = "100%";
    NEW_IMG.style.height = "100%";
    NEW_CARD.appendChild(NEW_IMG);

    // 3. 새로 추가된 카드의 위치 지정
    const IMG_X = PLAYER_CARDS[1].offsetLeft;
    const IMG_Y = PLAYER_CARDS[1].offsetTop;
    const IMG_W = PLAYER_CARDS[1].clientWidth;
    const IMG_H = PLAYER_CARDS[1].clientHeight;

    NEW_CARD.style.position = "absolute";
    NEW_CARD.style.opacity = 0;
    NEW_CARD.style.transition = "top 1s ease-in, opacity 1s ease-in";
    NEW_CARD.style.left = `${IMG_X}px`;
    NEW_CARD.style.top = `${IMG_Y - IMG_W}px`;
    NEW_CARD.style.width = `${IMG_W}px`;
    NEW_CARD.style.height = `${IMG_H}px`;
    PLAYER_LIST.appendChild(NEW_CARD);

    // 5. 마지막 카드 깨짐
    const LAST_CARD_POS = Math.floor(Math.random() * (0 - PLAYER_CARDS[0].clientWidth - 0 - PLAYER_CARDS[0].clientWidth * 2 + 1)) - 0 - PLAYER_CARDS[0].clientWidth * 2;
    PLAYER_CARDS[PLAYER_CARDS.length - 1].style.transition = `transform 1s ease-in, opacity 1s ease-in`;
    PLAYER_CARDS[PLAYER_CARDS.length - 1].style.opacity = 0;
    PLAYER_CARDS[PLAYER_CARDS.length - 1].style.transform = `translate(${LAST_CARD_POS}px, ${LAST_CARD_POS}px) scale(${(Math.random() * 3 + 1).toFixed(2)}) rotate(${(Math.random() * (541 - 180) + 180).toFixed(2)}deg)`;

    // .player-icon이 마지막 칸에 있을 경우
    if (endState) {
      const PLAYER_ICON = document.querySelector(".player-icon");
      if (!PLAYER_ICON) throw throwObj('elementLoss', "movePlayerCards.js - .player-icon element failed.");
      PLAYER_ICON.style.transition = `transform 1s ease-in, opacity 1s ease-in`;
      PLAYER_ICON.style.transform = `translate(${LAST_CARD_POS}px, ${LAST_CARD_POS}px) scale(${(Math.random() * 3 + 1).toFixed(2)}) rotate(${(Math.random() * (541 - 180) + 180).toFixed(2)}deg)`;
      PLAYER_ICON.style.opacity = 0;
    }

    // 4. 전체 카드 이동, 새로 추가된 카드 이동
    // PLAYER_LIST, NINE_IMG_X, NINE_IMG_Y, PLAYER_CARDS, _orderNum
    const DATA = {
      playerList: PLAYER_LIST,
      playerCards: PLAYER_CARDS,
      newCard: NEW_CARD,
      endState: endState,
      clickNum: _orderNum,
      clickBoardNum: _clickBoardNum,
    };
    promiseMoveCards(DATA)
      .then((_data) => {
        promiseMoveCardsEnd(_data)
          .then((_gameEndData) => {
            const RE_BLOCK = document.querySelector(".player-block");
            if (!RE_BLOCK) throw throwObj('elementLoss', "movePlayerCards.js - .player-block element failed.");
            const RE_LIST = RE_BLOCK.querySelector("ul");
            if (!RE_LIST) throw throwObj('elementLoss', "movePlayerCards.js - .player-block ul element failed.");
            const RE_CARDS = RE_LIST.querySelectorAll("li");
            if (RE_CARDS.length < 1) throw throwObj('elementLoss', "movePlayerCards.js - .player-block ul length element failed.");

            // 6. .play-card > ul 다시 그리기
            let newCards = new Object();
            let newImage = new Object();

            for (let i = 0; i < RE_CARDS.length; i++) {
              newCards = document.createElement("li");
              newImage = document.createElement("img");
              newImage.src = MAKE_USER_CARD[PN_ARR[i]];
              newCards.appendChild(newImage);
              RE_CARDS[i].remove();
              RE_LIST.appendChild(newCards);
            }

            // 모든 animation 이 끝난 후, 이벤트는 이 줄에서 ------------------
            if (_gameEndData.endState) {
              // .player-icon이 마지막 칸에 있다가 사라졌을 경우
              // StateGameEnd로 이동
              // alert("졌다!!!!");
              findTheSamePictureGameState.gameOver(false);
            }
            /**
             * 내 상태를 보내기 -------------------------
             * rns[5] 스토리지명에 있는 EN_ARR[1]
             * 스토리지의 pn
             * 내가 뭘 눌렀는지(ORDER_NUM)
             * 안내 팝업 체크----------------------------
             * 라운드가 1이나 2면 나옴
             */
            sendPlayerClickData(_gameEndData.clickNum, _gameEndData.clickBoardNum, false);
            infoPlayPop();
          })
          .catch((error) => {
            errorManager(error, true);
          });
      })
      .catch((error) => {
        errorManager(error, true);
      });
  } catch (error) {
    errorManager(error, true);
  }
};
