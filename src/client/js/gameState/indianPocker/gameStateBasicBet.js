import { timeInterval_1, timeInterval_2 } from '@/client/js/functions/variable';
import storageMethod from '@/client/js/module/storage/storageMethod';
import STATE_BASIC_BET from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/init';

export default (reloadState) => {
  if (reloadState) {
    if (reloadState === 'foldLocal' || reloadState === 'foldRemote') {
      if (reloadState === 'foldLocal') {
        // FOLD를 실행한 PLAY가 새고로침
        storageMethod('s', 'SET_ITEM', 'betUser', false);
        storageMethod('s', 'SET_ITEM', 'coinsEnemy', window.sessionStorage.coinsEnemyLocalFold);
        storageMethod('s', 'SET_ITEM', 'coinsPlayer', window.sessionStorage.coinsPlayerLocalFold);
      } else if (reloadState === 'foldRemote') {
        // FOLD를 받은 PLAY가 새고로침
        storageMethod('s', 'SET_ITEM', 'betUser', true);
        storageMethod('s', 'SET_ITEM', 'coinsEnemy', window.sessionStorage.coinsEnemyRemoteFold);
        storageMethod('s', 'SET_ITEM', 'coinsPlayer', window.sessionStorage.coinsPlayerRemoteFold);
      }

      const D_ARR = ['coinsEnemyBet', 'coinsPlayerBet', 'coinsEnemyExtBet', 'coinsPlayerExtBet', 'betCoin', 'betCoinPos', 'extFirstBet', 'drewReady', 'drewState', 'coinsEnemyLocalFold', 'coinsPlayerLocalFold', 'coinsEnemyRemoteFold', 'coinsPlayerRemoteFold', 'foldUser', 'foldState'];
      storageMethod('s', 'REMOVE_ARR', '', '', D_ARR);

      storageMethod('s', 'SET_ITEM', 'betCoin', []);
      storageMethod('s', 'SET_ITEM', 'betCoinPos', []);
      storageMethod('s', 'SET_ITEM', 'basicBettingState', false);
      storageMethod('s', 'SET_ITEM', 'battleCardNum', []);
    }
  }

  setTimeout(() => {
    STATE_BASIC_BET.main();
  }, timeInterval_1);
};
