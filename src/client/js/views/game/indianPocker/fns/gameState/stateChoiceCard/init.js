import { errorManagement } from '@/client/js/module/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import drawPickCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawPickCard';
import storageMethod from '@/client/js/module/storage/storageMethod';
import indianPockerGameState from '@/client/js/gameState/indianPocker';
import dataHandler from '@/client/js/functions/dataVerification/load/dataHandler';
import storageKeys from '@/client/js/functions/dataVerification/load/storageKeys';
import { request } from '@/client/js/communication/indianPocker/request';

/**
 * ChoiceCar에서 사용하는 sessionStorage Data
  - playerFirstNumber
  - ulIndex
  - liIndex
  - enemyFirstNumber
  - ulIndexEnemy
  - liIndexEnemy
  - enemyCardChoiceReady
  - betUser
  - betUserFirst
  - myNextStepState
  - nextStepChoiceCard
 */
export default {
  main: () => {
    // request('requestEnterChoiceCard');

    dataHandler({
      p1: findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]), // indianPocker
      p2: findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]), // choiceCard
    });

    // drawPickCard();
    // LOADING_EVENT.hide();
  },
  nextStep: () => {
    // storageMethod('s', 'REMOVE_ARR', '', '', ['enemyFirstNumber', 'playerFirstNumber', 'liIndex', 'ulIndex', 'liIndexEnemy', 'ulIndexEnemy', 'enemyCardChoiceReady', 'myNextStepState', 'nextStepChoiceCard']);

    // 다음 STEP(basicBet) 에서 사용할 betUser, betUserFirst 뺀 key 리스트
    const choiceDeleteData = storageKeys({
      p1: findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]), // indianPocker
      p2: findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]), // choiceCard
    }).filter((item) => item !== findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]) && item !== findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]));

    storageMethod('s', 'REMOVE_ARR', '', '', choiceDeleteData);

    const CHOICE_CARD = document.querySelector('.choice-card');
    if (CHOICE_CARD) CHOICE_CARD.remove();
    const CHOICE_CARD_INFO = document.querySelector('.choice-card-info');
    if (CHOICE_CARD_INFO) CHOICE_CARD_INFO.remove();
    LOADING_EVENT.hide();

    indianPockerGameState.basicBet();
  },
};
