import storageMethod from '@/client/js/module/storage/storageMethod';
import STATE_BASIC_BET from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/init';

export default (reloadState) => {
  if (reloadState) {
    /**
     * 이전 판에서 FOLD 후 새로고침 해서 기본배팅 화면으로 진입한 경우
     * betState 는 basicBetting이 되어야 함
     * basicBetReady 는 false 되어야 함
     */
    if (reloadState === 'foldLocal' || reloadState === 'foldRemote') {
      // storageMethod('s', 'SET_ITEM', 'betState', 'basicBetting');
      // storageMethod('s', 'SET_ITEM', 'basicBetReady', false);
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

      const D_ARR = ['coinsEnemyBet', 'coinsPlayerBet', 'coinsEnemyExtBet', 'coinsPlayerExtBet', 'betCoin', 'betCoinPos', 'extFirstBet', 'drewReady', 'drewState', 'dropState', 'coinsEnemyLocalFold', 'coinsPlayerLocalFold', 'coinsEnemyRemoteFold', 'coinsPlayerRemoteFold', 'foldUser', 'foldState'];
      storageMethod('s', 'REMOVE_ARR', '', '', D_ARR);

      storageMethod('s', 'SET_ITEM', 'betCoin', []);
      storageMethod('s', 'SET_ITEM', 'betCoinPos', []);
      storageMethod('s', 'SET_ITEM', 'basicBettingState', false);
      storageMethod('s', 'SET_ITEM', 'battleCardNum', []);
    }
  } else {
    // 이전에 FOLD한 PLAYER 가 있는데, 둘 다 새로고침 안하고 진입한 경우
    const D_FOLD_ARR = ['coinsEnemyLocalFold', 'coinsPlayerLocalFold', 'coinsEnemyRemoteFold', 'coinsPlayerRemoteFold', 'foldUser', 'foldState'];
    storageMethod('s', 'REMOVE_ARR', '', '', D_FOLD_ARR);
  };

  STATE_BASIC_BET.main();
};
