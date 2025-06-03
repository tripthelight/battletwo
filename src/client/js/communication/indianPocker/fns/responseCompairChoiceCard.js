import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';
import sessionInit from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/sessionInit';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE.then((_data) => {
    //
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'enterBasicBetResult() 함수를 못탐' });
  });
};
