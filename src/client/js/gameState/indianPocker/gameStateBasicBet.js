import findCharCode from '@/client/js/functions/findCharCode';
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
      const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
      const encryptVal_2 = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false
      const encryptKey1 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser
      const encryptKey2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]);  // coinsEnemy
      const encryptKey3 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]);  // coinsPlayer
      // storageMethod('s', 'SET_ITEM', 'betState', 'basicBetting');
      // storageMethod('s', 'SET_ITEM', 'basicBetReady', false);
      if (reloadState === 'foldLocal') {
        // FOLD를 실행한 PLAY가 새고로침
        storageMethod('s', 'SET_ITEM', encryptKey1, encryptVal_2); // betUser, false
        storageMethod('s', 'SET_ITEM', encryptKey2, window.sessionStorage.coinsEnemyLocalFold); // coinsEnemy,
        storageMethod('s', 'SET_ITEM', encryptKey3, window.sessionStorage.coinsPlayerLocalFold); // coinsPlayer
      } else if (reloadState === 'foldRemote') {
        // FOLD를 받은 PLAY가 새고로침
        storageMethod('s', 'SET_ITEM', encryptKey1, encryptVal_1); // betUser
        storageMethod('s', 'SET_ITEM', encryptKey2, window.sessionStorage.coinsEnemyRemoteFold); // coinsEnemy,
        storageMethod('s', 'SET_ITEM', encryptKey3, window.sessionStorage.coinsPlayerRemoteFold); // coinsPlayer
      }

      // const D_ARR = ['coinsEnemyBet', 'coinsPlayerBet', 'coinsEnemyExtBet', 'coinsPlayerExtBet', 'betCoin', 'betCoinPos', 'extFirstBet', 'drewReady', 'drewState', 'dropState', 'coinsEnemyLocalFold', 'coinsPlayerLocalFold', 'coinsEnemyRemoteFold', 'coinsPlayerRemoteFold', 'foldUser', 'foldState'];
      const D_ARR = [
        'coinsEnemyBet',
        'coinsPlayerBet',
        'coinsEnemyExtBet',
        'coinsPlayerExtBet',
        'betCoin',
        'betCoinPos',
        findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), // extFirstBet
        'drewReady',
        'drewState',
        'dropState',
        'coinsEnemyLocalFold',
        'coinsPlayerLocalFold',
        'coinsEnemyRemoteFold',
        'coinsPlayerRemoteFold',
        'foldUser',
        'foldState'
      ];
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
