import findCharCode from '@/client/js/functions/findCharCode';
import { CHOICE_CARD_DATA_HANDLER } from '@/client/js/functions/dataVerification/load/indianPocker/choiceCard';
import { BASIC_BET_DATA_HANDLER } from '@/client/js/functions/dataVerification/load/indianPocker/basicBet';
import { PLAYING_DATA_HANDLER } from '@/client/js/functions/dataVerification/load/indianPocker/playing';
import { getRL } from '@/client/js/module/webRTC/connectSignaling';

/**
 * indianPocker
 * @param {string} gameState gameState에 맞는 reload일경우, reload 아닐경우 함수 실행
 * @param {Array<string>} storageKeys gameState에 필요한 sessionStorage key list
 */
export default (gameState, storageKeys) => {
  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: choiceCard
  if (gameState === findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      CHOICE_CARD_DATA_HANDLER.handleReload(storageKeys);
    } else {
      CHOICE_CARD_DATA_HANDLER.handleInitialLoad(storageKeys);
    };
  };

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: basicBet
  if (gameState === findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      BASIC_BET_DATA_HANDLER.handleReload(storageKeys);
    } else {
      BASIC_BET_DATA_HANDLER.handleInitialLoad(storageKeys);
    };
  };

  // ────────────────────────────────────────────────────────────────────────────────────────────────────────────
  // gameState: playing
  if (gameState === findCharCode([84, 88, 86, 66, 78, 73, 82, 81, 87, 71])) {
    if (getRL(true)) { // 조건 검사 시 true일 경우, 즉시 false로 변경됨
      PLAYING_DATA_HANDLER.handleReload(storageKeys);
    } else {
      PLAYING_DATA_HANDLER.handleInitialLoad(storageKeys);
    };
  };
};

/* // 리펙토링 코드
export default (gameState, storageKeys) => {
  // 공통 실행: getRL() 결과에 따라 handler 메서드 선택
  const runByReloadFlag = (handler, storageKeys) => {
    const method = getRL() ? "handleReload" : "handleInitialLoad";
    handler[method](storageKeys);
  };

  // gameState 문자열을 매번 findCharCode로 만들지 않게(1회만) 상수화
  const GAME_STATE = {
    choiceCard: findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]),
    basicBet: findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]),
  };

  // gameState -> handler 매핑
  const HANDLERS = {
    [GAME_STATE.choiceCard]: CHOICE_CARD_DATA_HANDLER,
    [GAME_STATE.basicBet]: BASIC_BET_DATA_HANDLER,
  };

  const handler = HANDLERS[gameState];
  if (!handler) return; // 해당 없으면 아무것도 안 함
  runByReloadFlag(handler, storageKeys);
};
*/
