import { errorManagement } from '@/client/js/module/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import STATE_CHOICE_CARD from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/init';

export default (_data) => {
  const promise = new Promise((resolve, reject) => {
    resolve(_data);
  });
  promise
    .then((_state) => {
      storageMethod('s', 'SET_ITEM', 'nextStepChoiceCard', _state);
      const P_STATE = window.sessionStorage.myNextStepState;
      const E_STATE = window.sessionStorage.nextStepChoiceCard;
      if (P_STATE === 'true' && E_STATE === 'true') {
        STATE_CHOICE_CARD.nextStep();
      }
    })
    .catch((err) => {
      return errorManagement({ errCase: 'errorComn', message: 'enemyChoiceCardReady()의 _data를 받지 못했습니다.' });
    });
};
