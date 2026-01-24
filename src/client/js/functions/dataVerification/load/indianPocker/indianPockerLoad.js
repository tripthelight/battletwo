// import { consRefresh } from '@/client/js/webRTC/rtcConn'
import findCharCode from '@/client/js/functions/findCharCode';
import { CHOICE_CARD_DATA_HANDLER } from '@/client/js/functions/dataVerification/load/indianPocker/choiceCard';
import { BASIC_BET_DATA_HANDLER } from '@/client/js/functions/dataVerification/load/indianPocker/basicBet';

/**
 * indianPocker
 * @param {string} gameState gameState에 맞는 reload일경우, reload 아닐경우 함수 실행
 * @param {Array<string>} storageKeys gameState에 필요한 sessionStorage key list
 */
export default (gameState, storageKeys) => {
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: choiceCard
  /* if (gameState === findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82])) {
    if (consRefresh()) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      CHOICE_CARD_DATA_HANDLER.handleReload(storageKeys);
    } else {
      CHOICE_CARD_DATA_HANDLER.handleInitialLoad(storageKeys);
    };
  }; */

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: basicBet
  /* if (gameState === findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68])) {
    if (consRefresh()) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      BASIC_BET_DATA_HANDLER.handleReload(storageKeys);
    } else {
      BASIC_BET_DATA_HANDLER.handleInitialLoad(storageKeys);
    };
  }; */
};
