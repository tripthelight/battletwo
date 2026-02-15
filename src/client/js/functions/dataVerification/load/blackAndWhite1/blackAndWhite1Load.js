import findCharCode from '@/client/js/functions/findCharCode';
import { READY_HANDLER } from '@/client/js/functions/dataVerification/load/blackAndWhite1/ready';
import { getRL } from '@/client/js/module/webRTC/connectSignaling';

/**
 * blackAndWhite1
 * @param {string} gameState gameState에 맞는 reload일경우, reload 아닐경우 함수 실행
 * @param {Array<string>} storageKeys gameState에 필요한 sessionStorage key list
 */
export default (gameState, storageKeys) => {
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: ready
  if (gameState === findCharCode([72, 76, 74, 83, 79, 77, 84, 73, 69, 65])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      READY_HANDLER.handleReload(storageKeys);
    } else {
      READY_HANDLER.handleInitialLoad(storageKeys);
    };
  };
};
