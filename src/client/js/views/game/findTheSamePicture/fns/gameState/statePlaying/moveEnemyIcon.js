import throwObj from '@/client/js/module/errorHandler/throwObj';
import { timeInterval_1000 } from "@/client/js/functions/variable";
import findTheSamePictureGameState from '@/client/js/gameState/findTheSamePicture';

export default (_data, _state) => {
  if (_data.enemyActive === 20) {
    // 상대방이 마지막 칸임
    // 이겼음 - 승 처리
    // console.log("이김 >>>> ");
    findTheSamePictureGameState.gameOver(true);
    return;
  }
  const ENEMY_BLOCK = document.querySelector(".enemy-block");
  if (!ENEMY_BLOCK) throw throwObj('elementLoss', "moveEnemyIcon.js - .enemy-block element failed.");
  const ENEMY_LIST = ENEMY_BLOCK.querySelector("ul");
  if (!ENEMY_LIST) throw throwObj('elementLoss', "moveEnemyIcon.js - .enemy-block ul element failed.");
  const ENEMY_CARDS = ENEMY_LIST.querySelectorAll("li");
  if (!ENEMY_CARDS || ENEMY_CARDS.length < 20) throw throwObj('elementLoss', "moveEnemyIcon.js - enemy card element failed.");

  const ENEMY_ICON = ENEMY_BLOCK.querySelector(".enemy-icon");
  if (!ENEMY_ICON) throw throwObj('elementLoss', "moveEnemyIcon.js - .enemy-icon element failed.");

  /**
   * 1. .enemy-icon 이동
   */
  if (_state) {
    // 상대방이 맞았을 때
    ENEMY_ICON.classList.add("move");
    setTimeout(() => {
      ENEMY_ICON.classList.remove("move");

      // _data.enemyActive === 0 이면 상대방이 끝까지 온거라서 진거임
      // 패 처리는 여기서 -------------------------------------------
      if (_data.enemyActive === 0) {
        findTheSamePictureGameState.gameOver(false);
      }
    }, timeInterval_1000);
  }
  // 뒤에서 부터 시작이므로 카드배열의 총 length인 19에서 enemy 의 아이콘이 위치한 index를 마이너스 시킴
  let cardObj = ENEMY_CARDS[Number(19 - _data.enemyActive)];
  let x = cardObj.offsetLeft;
  let y = cardObj.offsetTop;
  let w = cardObj.clientWidth;
  let h = cardObj.clientHeight;

  ENEMY_ICON.style.left = `${x + 1}px`;
  ENEMY_ICON.style.top = `${y + 1}px`;
  ENEMY_ICON.style.width = `${w - 2}px`;
  ENEMY_ICON.style.height = `${h - 2}px`;
};
