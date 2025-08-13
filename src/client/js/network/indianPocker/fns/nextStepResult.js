import findCharCode from '@/client/js/functions/findCharCode';
import { errorManagement } from '@/client/js/module/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import STATE_CHOICE_CARD from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/init';

export default (_data) => {
  const promise = new Promise((resolve, reject) => {
    resolve(_data);
  });
  promise
    .then((_state) => {
      const keyMyNextStepState = findCharCode([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]); // myNextStepState
      const keyNextStepChoiceCard = findCharCode([68, 79, 74, 85, 82, 83, 81, 86, 72, 77]); // nextStepChoiceCard
      storageMethod(
        's',
        'SET_ITEM',
        keyNextStepChoiceCard,
        _state ?
          // true
          findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]) :
          // false
          findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78])
      );

      const P_STATE = window.sessionStorage.getItem(keyMyNextStepState);
      const E_STATE = window.sessionStorage.getItem(keyNextStepChoiceCard);

      if (P_STATE === findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]) && E_STATE === findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75])) {
        STATE_CHOICE_CARD.nextStep();
      }
    })
    .catch((err) => {
      return errorManagement({ errCase: 'errorComn', message: 'nextStepResult()의 _data를 받지 못했습니다.', errorDetails: err });
    });
};
