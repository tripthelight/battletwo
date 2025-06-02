import findCharCode from '@/client/js/functions/findCharCode';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { request } from '@/client/js/communication/indianPocker/request';
import drawPickCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawPickCard';
import storageMethod from '@/client/js/module/storage/storageMethod';
import indianPockerGameState from '@/client/js/gameState/indianPocker';

export default {
  main: () => {
    drawPickCard();
    LOADING_EVENT.hide();
  },
  nextStep: () => {
    // storageMethod('s', 'REMOVE_ARR', '', '', ['enemyFirstNumber', 'playerFirstNumber', 'liIndex', 'ulIndex', 'liIndexEnemy', 'ulIndexEnemy', 'enemyCardChoiceReady', 'myNextStepState', 'nextStepChoiceCard']);

    const encryptKey1 = findCharCode([78, 73, 68, 76, 67, 82, 87, 83, 89, 70]); // ulIndex
    const encryptKey2 = findCharCode([83, 70, 79, 67, 65, 71, 66, 87, 77, 86]); // liIndex
    const encryptKey3 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
    const encryptKey4 = findCharCode([78, 72, 89, 73, 67, 85, 71, 79, 77, 76]); // ulIndexEnemy
    const encryptKey5 = findCharCode([77, 67, 69, 73, 72, 75, 68, 82, 71, 80]); // liIndexEnemy
    const encryptKey6 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
    const encryptKey7 = findCharCode([68, 71, 87, 77, 85, 66, 65, 84, 88, 69]); // enemyCardChoiceReady

    storageMethod('s', 'REMOVE_ARR', '', '', [encryptKey6, encryptKey3, encryptKey2, encryptKey1, encryptKey5, encryptKey4, encryptKey7, 'myNextStepState', 'nextStepChoiceCard']);

    const CHOICE_CARD = document.querySelector('.choice-card');
    if (CHOICE_CARD) CHOICE_CARD.remove();
    const CHOICE_CARD_INFO = document.querySelector('.choice-card-info');
    if (CHOICE_CARD_INFO) CHOICE_CARD_INFO.remove();
    LOADING_EVENT.hide();

    indianPockerGameState.basicBet();
  },
};
