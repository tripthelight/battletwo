import { timeInterval_1 } from '@/client/js/functions/variable';
import storageMethod from '@/client/js/module/storage/storageMethod';
import randomNumberMinMax from '@/client/js/views/game/indianPocker/fns/common/randomNumberMinMax';
import showChoiceCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/showChoiceCard';

export default (_event) => {
  storageMethod('s', 'SET_ITEM', 'enemyCardChoiceReady', false);
  const playerNum = randomNumberMinMax(1, 10);
  if (window.sessionStorage.playerFirstNumber) {
    // local player가 선택한 카드가 있을 때
  } else {
    // local player가 선택한 카드가 없을 때
    setTimeout(showChoiceCard, timeInterval_1, _event, playerNum);
  }
};
