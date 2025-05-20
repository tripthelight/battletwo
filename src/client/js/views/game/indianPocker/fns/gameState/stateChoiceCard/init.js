import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { request } from '@/client/js/communication/indianPocker/request';
import drawPickCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawPickCard';
import storageMethod from '@/client/js/module/storage/storageMethod';
import indianPockerGameState from '@/client/js/gameState/indianPocker';

export default {
  main: () => {
    console.log('Choice Card main 진입 >>>>>>>>>> ');

    // request('enterChoiceCard', 'choiceCard');
    drawPickCard();
    LOADING_EVENT.hide();
  },
  nextStep: () => {
    storageMethod('s', 'REMOVE_ARR', '', '', ['enemyFirstNumber', 'playerFirstNumber', 'liIndex', 'ulIndex', 'liIndexEnemy', 'ulIndexEnemy', 'enemyCardChoiceReady', 'myNextStepState', 'nextStepChoiceCard']);

    const CHOICE_CARD = document.querySelector('.choice-card');
    if (CHOICE_CARD) CHOICE_CARD.remove();
    const CHOICE_CARD_INFO = document.querySelector('.choice-card-info');
    if (CHOICE_CARD_INFO) CHOICE_CARD_INFO.remove();
    LOADING_EVENT.hide();

    indianPockerGameState.basicBet();
  },
};
