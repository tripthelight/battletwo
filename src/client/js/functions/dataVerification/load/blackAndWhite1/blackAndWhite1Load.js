import findCharCode from '@/client/js/functions/findCharCode';
import { getRL } from '@/client/js/module/webRTC/connectSignaling';
import { READY_HANDLER } from '@/client/js/functions/dataVerification/load/blackAndWhite1/ready';
import { WAIT_ENEMY_SHUFFLE_HANDLER } from '@/client/js/functions/dataVerification/load/blackAndWhite1/waitEnemyShuffle';
import { SET_ORDER_HANDLER } from '@/client/js/functions/dataVerification/load/blackAndWhite1/setOrder';
import { PLAYING_HANDLER } from '@/client/js/functions/dataVerification/load/blackAndWhite1/playing';
import { GAMEOVER_HANDLER } from '@/client/js/functions/dataVerification/load/blackAndWhite1/gameOver';

/**
 * blackAndWhite1
 * @param {string} gameState gameState에 맞는 reload일경우, reload 아닐경우 함수 실행
 * @param {Array<string>} storageKeys gameState에 필요한 sessionStorage key list
 */
export default (gameState, storageKeys) => {
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: ready
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (gameState === findCharCode([72, 76, 74, 83, 79, 77, 84, 73, 69, 65])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      READY_HANDLER.handleReload(storageKeys);
    } else {
      READY_HANDLER.handleInitialLoad(storageKeys);
    };
  };

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: waitEnemyShuffle
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (gameState === findCharCode([67, 86, 80, 69, 76, 66, 77, 73, 72, 71])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      WAIT_ENEMY_SHUFFLE_HANDLER.handleReload(storageKeys);
    } else {
      WAIT_ENEMY_SHUFFLE_HANDLER.handleInitialLoad(storageKeys);
    };
  };

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: setOrder
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (gameState === findCharCode([65, 71, 81, 72, 85, 75, 78, 74, 86, 73])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      SET_ORDER_HANDLER.handleReload(storageKeys);
    } else {
      SET_ORDER_HANDLER.handleInitialLoad(storageKeys);
    };
  };

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: playing
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (gameState === findCharCode([75, 68, 67, 71, 82, 87, 74, 73, 66, 78])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      PLAYING_HANDLER.handleReload(storageKeys);
    } else {
      PLAYING_HANDLER.handleInitialLoad(storageKeys);
    };
  };

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: gameOver
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (gameState === findCharCode([67, 68, 72, 69, 90, 77, 80, 81, 75, 85])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      GAMEOVER_HANDLER.handleReload(storageKeys);
    } else {
      GAMEOVER_HANDLER.handleInitialLoad(storageKeys);
    };
  };
};
