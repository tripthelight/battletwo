import { errorManagement } from '@/client/js/module/errorManagement';
import { timeInterval_1000 } from '@/client/js/functions/variable';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { request } from '@/client/js/communication/indianPocker/request';
import drawPickCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawPickCard';

export default (_data) => {
  let promise = new Promise((resolve, reject) => {
    resolve(_data);
  });
  promise
    .then((_data) => {
      if (_data === 'choiceCard') {
        if (window.sessionStorage.gameState !== 'choiceCard') {
          request('enterChoiceCard', 'no');
        }
        if (window.sessionStorage.gameState === 'choiceCard') {
          drawPickCard();
          LOADING_EVENT.hide();
        }
      } else if (_data === 'no') {
        setTimeout(() => {
          request('enterChoiceCard', 'choiceCard');
        }, timeInterval_1000);
      }
    })
    .catch((error) => {
      errorManagement({ errCase: 'errorComn', message: 'enterChoiceCardResult() 함수를 못탐 11 ::: ' });
    });
};
