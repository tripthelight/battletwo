import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import STATE_BASIC_BET from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/init';

export default (reloadState) => {
  const deleteParams = [
    findCharCode([86, 90, 81, 77, 74, 72, 88, 83, 65, 80]), // coinsEnemyLocalFold
    findCharCode([80, 78, 65, 74, 82, 70, 66, 67, 81, 69]), // coinsPlayerLocalFold
    findCharCode([79, 90, 74, 71, 78, 89, 69, 82, 88, 84]), // coinsEnemyRemoteFold
    findCharCode([87, 68, 77, 88, 86, 90, 75, 79, 74, 82]), // coinsPlayerRemoteFold
    findCharCode([66, 65, 81, 76, 84, 71, 67, 86, 82, 83]), // foldUser
    findCharCode([65, 72, 66, 75, 85, 69, 87, 79, 88, 86]), // foldState
  ];
  if (reloadState) {
    console.log("폴드 후 새로고침 -------> ", reloadState);

    /**
     * 이전 판에서 FOLD 후 새로고침 해서 기본배팅 화면으로 진입한 경우
     * betState 는 basicBetting이 되어야 함
     * basicBetReady 는 false 되어야 함
     */
    if (reloadState === 'foldLocal' || reloadState === 'foldRemote') {
      const encryptKey1 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser
      const encryptKey1_2 = findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]);  // betUserFirst
      const encryptKey2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]);  // coinsEnemy
      const encryptKey3 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]);  // coinsPlayer
      const encryptKey4 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]);  // betState
      const encryptKey5 = findCharCode([72, 81, 73, 79, 83, 70, 78, 80, 75, 88]);  // basicBetReady

      storageMethod('s', 'SET_ITEM',
        encryptKey4, // betState
        findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]) // basicBetting
      );
      storageMethod('s', 'SET_ITEM',
        encryptKey5, // basicBetReady
        X.enc(decodeTF(_t([106, 103, 108, 116, 110]))) // "jgltn" : false
      );

      if (reloadState === 'foldLocal') {
        const encryptVal4 = window.sessionStorage.getItem(deleteParams[0]); // coinsEnemyLocalFold value
        const encryptVal5 = window.sessionStorage.getItem(deleteParams[1]); // coinsPlayerLocalFold value
        // FOLD를 실행한 PLAY가 새고로침 - betUser : false
        storageMethod('s', 'SET_ITEM',
          encryptKey1, // betUser
          X.enc(decodeTF(_t([100, 103, 118, 116, 110]))) // "dgvtn" : false
        );
        storageMethod('s', 'SET_ITEM',
          encryptKey1_2, // betUserFirst
          X.enc(decodeTF(_t([100, 103, 118, 116, 110]))) // "dgvtn" : false
        );
        storageMethod('s', 'SET_ITEM', encryptKey2, encryptVal4); // coinsEnemy, coinsEnemyLocalFold
        storageMethod('s', 'SET_ITEM', encryptKey3, encryptVal5); // coinsPlayer, coinsPlayerLocalFold
      } else if (reloadState === 'foldRemote') {
        const encryptVal6 = window.sessionStorage.getItem(deleteParams[2]); // coinsEnemyRemoteFold value
        const encryptVal7 = window.sessionStorage.getItem(deleteParams[3]); // coinsPlayerRemoteFold value
        // FOLD를 받은 PLAY가 새고로침 - betUser : true
        storageMethod('s', 'SET_ITEM',
          encryptKey1, // betUser
          X.enc(decodeTF(_t([115, 119, 112, 117]))) // "swpu" : true
        );
        storageMethod('s', 'SET_ITEM',
          encryptKey1_2, // betUserFirst
          X.enc(decodeTF(_t([115, 119, 112, 117]))) // "swpu" : true
        );
        storageMethod('s', 'SET_ITEM', encryptKey2, encryptVal6); // coinsEnemy, coinsEnemyRemoteFold
        storageMethod('s', 'SET_ITEM', encryptKey3, encryptVal7); // coinsPlayer, coinsPlayerRemoteFold
      };

      const encryptKey8 = findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]);  // betCoin
      const encryptKey9 = findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]);  // betCoinPos

      // const D_ARR = ['coinsEnemyBet', 'coinsPlayerBet', 'coinsEnemyExtBet', 'coinsPlayerExtBet', 'betCoin', 'betCoinPos', 'extFirstBet', 'drewReady', 'drewState', 'dropState', 'coinsEnemyLocalFold', 'coinsPlayerLocalFold', 'coinsEnemyRemoteFold', 'coinsPlayerRemoteFold', 'foldUser', 'foldState'];
      // storageMethod('s', 'REMOVE_ARR', '', '', D_ARR);
      storageMethod('s', 'REMOVE_VALUE', '', '', [
        findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]), // coinsEnemyBet
        findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]), // coinsPlayerBet
        findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]), // coinsEnemyExtBet
        findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]), // coinsPlayerExtBet
        encryptKey8, // betCoin,
        encryptKey9, // betCoinPos
        findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), // extFirstBet
        findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]), // drewReady
        findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]), // drewState
        findCharCode([81, 69, 71, 84, 85, 90, 82, 67, 77, 89]), // dropState
        ...deleteParams
      ]);

      storageMethod('s', 'SET_ITEM', encryptKey8, ''); // betCoin
      storageMethod('s', 'SET_ITEM', encryptKey9, ''); // betCoinPos
      // storageMethod('s', 'SET_ITEM', 'basicBettingState', false);
      storageMethod('s', 'SET_ITEM',
        findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]), // basicBettingState
        X.enc(decodeTF(_t([106, 103, 108, 116, 110]))) // "jgltn" : false
      );
      // storageMethod('s', 'SET_ITEM', 'battleCardNum', []);
      storageMethod('s', 'SET_ITEM',
        findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]), // battleCardNum
        ''
      );
    }
  } else {
    // 이전에 FOLD한 PLAYER 가 있는데, 둘 다 새로고침 안하고 진입한 경우
    // const D_FOLD_ARR = ['coinsEnemyLocalFold', 'coinsPlayerLocalFold', 'coinsEnemyRemoteFold', 'coinsPlayerRemoteFold', 'foldUser', 'foldState'];
    storageMethod('s', 'REMOVE_VALUE', '', '', deleteParams);
  };

  STATE_BASIC_BET.main();
};
