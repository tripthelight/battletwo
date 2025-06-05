import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { request } from '@/client/js/network/indianPocker/request';
import STATE_CHOICE_CARD from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/init';

export default () => {
  const keyMyNextStepState = findCharCode([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]); // myNextStepState
  storageMethod('s', 'SET_ITEM', keyMyNextStepState, true);
  request('nextStep', true);

  /*
  const ENEMY_CARD_CHOICE_READY = window.sessionStorage.nextStepChoiceCard;
  if (ENEMY_CARD_CHOICE_READY && ENEMY_CARD_CHOICE_READY === 'true') {
    return STATE_CHOICE_CARD.nextStep();
  }
  */
  const keyNextStepChoiceCard = findCharCode([68, 79, 74, 85, 82, 83, 81, 86, 72, 77]); // nextStepChoiceCard
  const ENEMY_CARD_CHOICE_READY = window.sessionStorage.getItem(keyNextStepChoiceCard);
  if (ENEMY_CARD_CHOICE_READY !== null && ENEMY_CARD_CHOICE_READY === 'true') {
    return STATE_CHOICE_CARD.nextStep();
  }
};
