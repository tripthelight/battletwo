import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';

export default function () {
  storageMethod('s', 'REMOVE_VALUE', '', '', [
    findCharCode([75, 81, 83, 80, 89, 88, 86, 72, 82, 77]), // playingReloadUser
    findCharCode([65, 82, 73, 84, 83, 87, 74, 67, 89, 90]), // betResulting
    findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]), // battleCardNum
  ]);

  const encryptKey2 = findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]); // drewState
  const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);
  if (encryptVal2 !== null && encryptVal2 !== '' && X.dec(encryptVal2)) {
    // ** 새로고침 전 같은카드 였음
  } else {
    // ** 새로고침 전 이기거나 졌음
    storageMethod('s', 'REMOVE_VALUE', '', '', [
      findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]), // betCoin
      findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]), // betCoinPos
    ]);

    storageMethod('s', 'SET_ITEM',
      findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]), // gameState
      findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]) // basicBet
    );

    storageMethod('s', 'SET_ITEM',
      findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]), // betState
      findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]) // basicBetting
    );

    storageMethod('s', 'SET_ITEM',
      findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]), // basicBettingState
      X.enc(decodeTF(_t([120, 103, 118, 105, 117]))), // "xgviu" : false
    );

    storageMethod('s', 'SET_ITEM', findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]), ''); // drewState
    storageMethod('s', 'SET_ITEM', findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]), ''); // drewReady
    storageMethod('s', 'SET_ITEM', findCharCode([81, 69, 71, 84, 85, 90, 82, 67, 77, 89]), ''); // dropState
    storageMethod('s', 'SET_ITEM', findCharCode([86, 90, 81, 77, 74, 72, 88, 83, 65, 80]), ''); // coinsEnemyLocalFold
    storageMethod('s', 'SET_ITEM', findCharCode([80, 78, 65, 74, 82, 70, 66, 67, 81, 69]), ''); // coinsPlayerLocalFold
    storageMethod('s', 'SET_ITEM', findCharCode([79, 90, 74, 71, 78, 89, 69, 82, 88, 84]), ''); // coinsEnemyRemoteFold
    storageMethod('s', 'SET_ITEM', findCharCode([87, 68, 77, 88, 86, 90, 75, 79, 74, 82]), ''); // coinsPlayerRemoteFold
    storageMethod('s', 'SET_ITEM', findCharCode([66, 65, 81, 76, 84, 71, 67, 86, 82, 83]), ''); // foldUser
    storageMethod('s', 'SET_ITEM', findCharCode([65, 72, 66, 75, 85, 69, 87, 79, 88, 86]), ''); // foldState
  };

};
