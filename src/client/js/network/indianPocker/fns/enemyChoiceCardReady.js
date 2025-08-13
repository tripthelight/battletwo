import { timeInterval_1 } from '@/client/js/functions/variable';
import findCharCode from '@/client/js/functions/findCharCode';
import { errorManagement } from '@/client/js/module/errorManagement';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import storageMethod from '@/client/js/module/storage/storageMethod';
import choiceCardsClick from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/choiceCardsClick';

export default (_data) => {
  const promise = new Promise((resolve, reject) => {
    resolve(_data);
  });
  promise
    .then((_state) => {
      if (_state) {
        const encryptKey = findCharCode([68, 71, 87, 77, 85, 66, 65, 84, 88, 69]); // enemyCardChoiceReady

        storageMethod(
          's',
          'SET_ITEM',
          encryptKey,
          _state ?
            // true
            findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]) :
            // false
            findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78])
        );
      } else {
        console.log('비기고 여기 타냐 2');
        LOADING_EVENT.hide();
        const encryptKey = findCharCode([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]); // tieWait
        storageMethod('s', 'SET_ITEM', encryptKey, '');
        choiceCardsClick();
      };
    })
    .catch((err) => {
      return errorManagement({ errCase: 'errorComn', message: 'enemyChoiceCardReady()의 _data를 받지 못했습니다.', errorDetails: err });
    });
};
