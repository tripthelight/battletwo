import findCharCode from '@/client/js/functions/findCharCode';
import { getRL } from '@/client/js/module/webRTC/connectSignaling';
import { READY_HANDLER } from '@/client/js/functions/dataVerification/load/memoryMaze/ready';
import { PLAYING_HANDLER } from '@/client/js/functions/dataVerification/load/memoryMaze/playing';
import { GAMEOVER_HANDLER } from '@/client/js/functions/dataVerification/load/memoryMaze/gameOver';

/**
 * memoryMaze
 * @param {string} gameState gameState에 맞는 reload일경우, reload 아닐경우 함수 실행
 * @param {Array<string>} storageKeys gameState에 필요한 sessionStorage key list
 */
export default (gameState, storageKeys) => {
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: ready
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (gameState === findCharCode([72, 80, 76, 68, 90, 82, 81, 89, 75, 69])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      READY_HANDLER.handleReload(storageKeys);
    } else {
      READY_HANDLER.handleInitialLoad(storageKeys);
    };
  };

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: playing
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (gameState === findCharCode([82, 81, 79, 73, 85, 90, 66, 78, 77, 75])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      PLAYING_HANDLER.handleReload(storageKeys);
    } else {
      PLAYING_HANDLER.handleInitialLoad(storageKeys);
    };
  };

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: gameOver
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (gameState === findCharCode([82, 77, 74, 79, 73, 81, 86, 78, 80, 65])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      GAMEOVER_HANDLER.handleReload(storageKeys);
    } else {
      GAMEOVER_HANDLER.handleInitialLoad(storageKeys);
    };
  };
};
