import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from "@/client/js/functions/variable";
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import drawBoard from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/drawBoard";
import resizeEvent from "@/client/js/views/game/findTheSamePicture/fns/common/resize/resizeEvent";

export default () => {
  resizeEvent();

  // TODO: 처음 시작하는 단계에서는 gameStateGetAll : true 시켜줄 것
  storageMethod('s', 'SET_ITEM',
    findCharCode([79, 85, 89, 77, 72, 87, 81, 78, 65, 66]), // gameStateGetAll
    true
  );
  storageMethod('s', 'SET_ITEM',
    findCharCode([67, 69, 85, 83, 66, 82, 88, 86, 70, 75]), // refresh
    false
  );
  storageMethod('s', 'SET_ITEM',
    findCharCode([81, 69, 68, 84, 89, 87, 76, 67, 72, 73]), // round
    1
  );

  console.log("둘다 들어옴");
  storageMethod('s', 'REMOVE_ITEM',
    findCharCode([81, 77, 68, 70, 74, 82, 69, 67, 75, 80]) // picTxt
  );

  // 새로고침 체크를 위한 storage
  storageMethod('s', 'SET_ITEM',
    findCharCode([90, 65, 88, 69, 78, 89, 67, 74, 76, 73]), // playingRe
    true
  );

  setTimeout(() => {
    // 여기서 state playing draw 시작
    const PICTURE_BOARD = document.querySelector(".picture-board");
    if (PICTURE_BOARD) return;
    const PICTURE_BOARD_EL = document.createElement("div");
    PICTURE_BOARD_EL.classList.add("picture-board");

    const GAME_SCENE = document.getElementById("gameScene");
    if (!GAME_SCENE) throw throwObj('elementLoss', "drawPictureBoard.js - #gameScene element failed.");
    GAME_SCENE.appendChild(PICTURE_BOARD_EL);

    PICTURE_BOARD_EL.style.height = `${PICTURE_BOARD_EL.clientWidth}px`;

    setTimeout(drawBoard, timeInterval_1, PICTURE_BOARD_EL);

    // stateFirstUserAni -> gameBorderAnimation.js 에서 setTimeout 871ms를 먹고 있음
  }, timeInterval_1);
};
