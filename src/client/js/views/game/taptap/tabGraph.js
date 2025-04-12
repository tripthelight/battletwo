import taptapGameState from '@/client/js/gameState/taptap';
import { request } from '@/client/js/communication/taptap/request';
import gameResult from '@/client/js/views/game/taptap/gameResult';

export default {
  tap: () => {
    const TOP_BLOCK = document.querySelector('.tap-top');
    const BOTTOM_BLOCK = document.querySelector('.tap-bottom');
    if (TOP_BLOCK && BOTTOM_BLOCK) {
      const TOP_COUNT = TOP_BLOCK.querySelector('.tap-top .tap-count');
      const BOTTOM_COUNT = BOTTOM_BLOCK.querySelector('.tap-bottom .tap-count');
      if (TOP_COUNT && BOTTOM_COUNT) {
        let topValue = parseInt(TOP_COUNT.value);
        let bottomValue = parseInt(BOTTOM_COUNT.value);
        TOP_BLOCK.style.height = 50 + Math.ceil(topValue - bottomValue) + '%';
        BOTTOM_BLOCK.style.height = 50 + Math.ceil(bottomValue - topValue) + '%';

        let tHeight = parseInt(TOP_BLOCK.style.height);
        let bHeight = parseInt(BOTTOM_BLOCK.style.height);

        // game result
        if (tHeight <= 0 || bHeight <= 0) {
          taptapGameState.gameOver();
          if (tHeight <= 0) {
            gameResult(true);
            request('gameOver', false); // 내가 이김 - 내 결과: true | 상대방 결과: false
          }
          if (bHeight <= 0) {
            gameResult(false);
            request('gameOver', true);
          }
        }
      }
    }
  },
};
