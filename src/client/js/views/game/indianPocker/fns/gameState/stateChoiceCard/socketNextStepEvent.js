import storageMethod from '@/client/js/module/storage/storageMethod';
import { request } from '@/client/js/communication/indianPocker/request';
import STATE_CHOICE_CARD from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/init';

export default () => {
  storageMethod('s', 'SET_ITEM', 'myNextStepState', true);
  request('nextStep', true);
  const ENEMY_CARD_CHOICE_READY = window.sessionStorage.nextStepChoiceCard;
  if (ENEMY_CARD_CHOICE_READY && ENEMY_CARD_CHOICE_READY === 'true') return STATE_CHOICE_CARD.nextStep();
};
