import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import sessionInit from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/sessionInit';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE.then((_data) => {
    if (_data === 'basicBet') {
      // if (window.sessionStorage.betState !== 'basicBet' && !window.sessionStorage.basicBetReady) {
      const reloadUser = window.sessionStorage.playingReloadUser;
      if (reloadUser && reloadUser === 'true') {
        storageMethod('s', 'REMOVE_ITEM', 'playingReloadUser');
        storageMethod('s', 'SET_ITEM', 'betState', 'basicBet');
        storageMethod('s', 'SET_ITEM', 'roundEnd', false);
        setTimeout(sessionInit, timeInterval_1);
      }
    }
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'remoteReloadBasicBetResult() 함수를 못탐' });
  });
};
