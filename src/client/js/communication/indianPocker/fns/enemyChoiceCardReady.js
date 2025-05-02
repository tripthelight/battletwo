import { errorManagement } from '@/client/js/module/errorManagement';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import storageMethod from '@/client/js/module/storage/storageMethod';

export default (_data) => {
  let promise = new Promise((resolve, reject) => {
    resolve(_data);
  });
  promise
    .then((_state) => {
      storageMethod('s', 'SET_ITEM', 'enemyCardChoiceReady', _state);
      if (window.sessionStorage.enemyCardChoiceReady === 'true') LOADING_EVENT.hide();
    })
    .catch((err) => {
      return errorManagement({ errCase: 'errorComn', message: 'enemyChoiceCardReady()의 _data를 받지 못했습니다.' });
    });
};
