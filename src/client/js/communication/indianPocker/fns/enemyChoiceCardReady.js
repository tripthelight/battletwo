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
      /*
      storageMethod('s', 'SET_ITEM', 'enemyCardChoiceReady', _state);
      if (window.sessionStorage.enemyCardChoiceReady === 'true') LOADING_EVENT.hide();
      */

      if (_state) {
        const encryptKey = findCharCode([68, 71, 87, 77, 85, 66, 65, 84, 88, 69]); // enemyCardChoiceReady
        storageMethod('s', 'SET_ITEM', encryptKey, _state);
      } else {
        LOADING_EVENT.hide();
        const encryptKey = findCharCode([[79, 88, 77, 84, 87, 86, 83, 69, 89, 73]]); // tieWait
        storageMethod('s', 'SET_ITEM', encryptKey, '');
        setTimeout(choiceCardsClick, timeInterval_1);
      }

      // if (window.sessionStorage.getItem(encryptKey) === 'true') {
      //   LOADING_EVENT.hide();
      //   setTimeout(choiceCardsClick, timeInterval_1);
      // }
    })
    .catch((err) => {
      return errorManagement({ errCase: 'errorComn', message: 'enemyChoiceCardReady()의 _data를 받지 못했습니다.' });
    });
};
