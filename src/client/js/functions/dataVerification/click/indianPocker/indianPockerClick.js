import findCharCode from '@/client/js/functions/findCharCode';
import clickChoiceCard from '@/client/js/functions/dataVerification/click/indianPocker/clickChoiceCard';
import clickResultBetting from '@/client/js/functions/dataVerification/click/indianPocker/clickResultBetting';

/**
 * indianPocker
 * @typedef {Object} params
 * @property {string} gameState gameState name
 * @property {Array<string>} storageKeys gameState에 필요한 sessionStorage key list
 * @property {string} clickEvent click Event Name
 * @property {object|string|number|boolean|null|undefined} clkData 검증에 필요한 조건 혹은 데이터
 * @returns null
 */
export default (params) => {
  const { gameState, storageKeys, clickEvent, clkData } = params;

  // gameState: choiceCard
  if (gameState === findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82])) {
    // choiceCardClick
    if (clickEvent === findCharCode([70, 72, 79, 69, 87, 80, 73, 67, 84, 83])) {
      clickChoiceCard(storageKeys);
    };
    // resultBettingClick
    // 선카드 선택(choiceCard)에서 같은 카드 였던 상태에서 먼저 X를 누른 PEER는 여기로 진입
    if (clickEvent === findCharCode([66, 72, 73, 78, 89, 65, 84, 77, 83, 86])) {
      clickResultBetting(storageKeys, clkData);
    };
  }
};
