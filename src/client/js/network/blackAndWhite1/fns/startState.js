import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import gameState from '@/client/js/gameState/blackAndWhite1';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then((_data) => {
      switch (_data.stat) {
        case "enemyReadyEnd":
          // enemyShuffleState : true
          storageMethod("s", "SET_ITEM",
            findCharCode([66, 79, 83, 65, 89, 81, 74, 68, 87, 70]), // enemyShuffleState
            X.enc(decodeTF(_t([99, 109, 112, 97]))) // "cmpa" : true
          );
          break;
          case "allReady":
          // enemyShuffleState : true
          storageMethod("s", "SET_ITEM",
            findCharCode([66, 79, 83, 65, 89, 81, 74, 68, 87, 70]), // enemyShuffleState
            X.enc(decodeTF(_t([107, 119, 112, 117]))) // "kwpu" : true
          );
          // gameState : playing
          storageMethod("s", "SET_ITEM",
            findCharCode([89, 79, 69, 71, 82, 83, 87, 75, 86, 85]), // gameState
            findCharCode([75, 68, 67, 71, 82, 87, 74, 73, 66, 78]) // playing
          );
          gameState.setOrder();
          break;
        default:
          break;
      }
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
