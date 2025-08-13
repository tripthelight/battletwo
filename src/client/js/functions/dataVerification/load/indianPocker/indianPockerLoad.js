import reload from '@/client/js/module/reload';
import findCharCode from '@/client/js/functions/findCharCode';
import { CHOICE_CARD_DATA_HANDLER } from '@/client/js/functions/dataVerification/load/indianPocker/choiceCard';

/**
 * indianPocker
 * @param {string} gameState gameState에 맞는 reload일경우, reload 아닐경우 함수 실행
 * @param {Array<string>} storageKeys gameState에 필요한 sessionStorage key list
 */
export default (gameState, storageKeys) => {
  // gameState: choiceCard
  if (gameState === findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82])) {
    if (reload) {
      CHOICE_CARD_DATA_HANDLER.handleReload(storageKeys);
    } else {
      CHOICE_CARD_DATA_HANDLER.handleInitialLoad(storageKeys);
    }
  }
};
