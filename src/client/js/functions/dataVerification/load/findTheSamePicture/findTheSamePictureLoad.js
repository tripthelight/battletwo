import findCharCode from '@/client/js/functions/findCharCode';
import { getRL } from '@/client/js/module/webRTC/connectSignaling';
import { CHOICE_FIRST_PLAYER_HANDLER } from '@/client/js/functions/dataVerification/load/findTheSamePicture/choiceFirstPlayer';
import { FIRST_USER_ANI_HANDLER } from '@/client/js/functions/dataVerification/load/findTheSamePicture/firstUserAni';
import { PLAYING_HANDLER } from '@/client/js/functions/dataVerification/load/findTheSamePicture/playing';
import { GAME_OVER_HANDLER } from '@/client/js/functions/dataVerification/load/findTheSamePicture/gameOver';

/**
 * blackAndWhite1
 * @param {string} gameState gameState에 맞는 reload일경우, reload 아닐경우 함수 실행
 * @param {Array<string>} storageKeys gameState에 필요한 sessionStorage key list
 */
export default (gameState, storageKeys) => {
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: choiceFirstPlayer
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (gameState === findCharCode([86, 79, 82, 66, 65, 73, 88, 68, 77, 75])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      CHOICE_FIRST_PLAYER_HANDLER.handleReload(storageKeys);
    } else {
      CHOICE_FIRST_PLAYER_HANDLER.handleInitialLoad(storageKeys);
    };
  };

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: firstUserAni
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (gameState === findCharCode([79, 71, 77, 85, 65, 74, 90, 83, 80, 89])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      FIRST_USER_ANI_HANDLER.handleReload(storageKeys);
    } else {
      FIRST_USER_ANI_HANDLER.handleInitialLoad(storageKeys);
    };
  };

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: playing
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (gameState === findCharCode([77, 90, 68, 76, 69, 83, 85, 74, 70, 79])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      PLAYING_HANDLER.handleReload(storageKeys);
    } else {
      PLAYING_HANDLER.handleInitialLoad(storageKeys);
    };
  };

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: gameOver
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  if (gameState === findCharCode([66, 85, 77, 82, 70, 74, 67, 81, 76, 87])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      GAME_OVER_HANDLER.handleReload(storageKeys);
    } else {
      GAME_OVER_HANDLER.handleInitialLoad(storageKeys);
    };
  };
};
