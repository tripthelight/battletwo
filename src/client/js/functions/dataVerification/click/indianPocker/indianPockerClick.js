import findCharCode from '@/client/js/functions/findCharCode';
import clickChoiceCard from '@/client/js/functions/dataVerification/click/indianPocker/clickChoiceCard';

/**
 * indianPocker
 * @typedef {Object} params
 * @property {string} gameState gameState name
 * @property {Array<string>} storageKeys gameState에 필요한 sessionStorage key list
 * @property {string} clickEvent click Event Name
 * @returns null
 */
export default (params) => {
  const { gameState, storageKeys, clickEvent } = params;

  // gameState: choiceCard
  if (gameState === findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82])) {
    // choiceCardClick
    if (clickEvent === findCharCode([70, 72, 79, 69, 87, 80, 73, 67, 84, 83])) {
      clickChoiceCard(storageKeys);
    }
  }
};
