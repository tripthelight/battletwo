import findCharCode from '@/client/js/functions/findCharCode';
import { getRL } from '@/client/js/module/webRTC/connectSignaling';
import { READY_HANDLER } from '@/client/js/functions/dataVerification/load/blackAndWhite2/ready';
import { PLAYING_HANDLER } from '@/client/js/functions/dataVerification/load/blackAndWhite2/playing';
import { GAMEOVER_HANDLER } from '@/client/js/functions/dataVerification/load/blackAndWhite2/gameOver';

/**
 * blackAndWhite1
 * @param {string} gameState gameState에 맞는 reload일경우, reload 아닐경우 함수 실행
 * @param {Array<string>} storageKeys gameState에 필요한 sessionStorage key list
 */
export default (gameState, storageKeys) => {
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: ready
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (gameState === findCharCode([90, 73, 85, 83, 81, 74, 66, 65, 80, 88])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      READY_HANDLER.handleReload(storageKeys);
    } else {
      READY_HANDLER.handleInitialLoad(storageKeys);
    };
  };

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: playing
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (gameState === findCharCode([81, 86, 90, 89, 70, 66, 83, 75, 84, 77])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      PLAYING_HANDLER.handleReload(storageKeys);
    } else {
      PLAYING_HANDLER.handleInitialLoad(storageKeys);
    };
  };

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: gameOver
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (gameState === findCharCode([80, 83, 88, 65, 79, 75, 86, 76, 87, 73])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      GAMEOVER_HANDLER.handleReload(storageKeys);
    } else {
      GAMEOVER_HANDLER.handleInitialLoad(storageKeys);
    };
  };
};
